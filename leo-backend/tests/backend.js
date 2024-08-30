const zmq = require("zeromq");

async function run() {
  const socket = new zmq.Dealer();
  socket.linger = 0;

   try {
     await socket.connect("tcp://localhost:5559");
     console.log("已連接至 broker");

     async function sendTask(data) {
         const taskId = Date.now().toString();
         const task = { apiId: 'task', taskId, data };
         const message = JSON.stringify(task);

         try {
             await socket.send([Buffer.from(''), Buffer.from(message)]);
           console.log(`已發送任務 ${taskId}`);
         } catch (error) {
           console.error(`發送任務 ${taskId} 失敗：`, error);
         }

         return taskId;
     }

     // 發送初始任務
     await sendTask("task1");

  //   // 監聽結果
     for await (const parts of socket) {
         try {
         // 處理多部分消息
         const [empty, message] = parts;
         console.log(message.toString());
         const msg = JSON.parse(message.toString());
         console.log(`收到任務 ${msg.apiId} 的結果：`);
         if (msg.apiId === 'result') {
           console.log(`任務 ${msg.taskId} 完成`);
         } else if (msg.apiId === 'error') {
           console.error(`錯誤：${msg.message}`);
         } else {
           console.warn(`未知訊息類型：${msg.type}`);
         }
       } catch (error) {
         console.error("解析訊息時發生錯誤：", error);
       }
     }
   } catch (error) {
     console.error("連接失敗：", error);
   }
}

run();

// const zmq = require("zeromq");

// async function run() {
//   const socket = new zmq.Dealer();
//   await socket.connect("tcp://localhost:5559");

//   console.log("Backend connected to broker");

//   // 發送任務
//   async function sendTask(data) {
//     const taskId = Date.now().toString();
//     const task = { apiId: 'task', taskId: taskId, data: data };
//     const message = JSON.stringify(task);
//     try {
//         // await socket.send([Buffer.from(''), Buffer.from(message)]);
//         await socket.send(['', message]);
//         console.log(`Sent task ${taskId}`);
//       } catch (error) {
//         console.error(`Failed to send task ${taskId}:`, error);
//       }
//     return taskId;
//   }

//   // 監聽結果
//   for await (const [message] of socket) {
//     const msg = JSON.parse(message.toString());
//     if (msg.type === 'result') {
//       console.log(`Received results for task ${msg.taskId}:`);
//       console.log(msg.results);
//     } else if (msg.type === 'error') {
//       console.error(`Error: ${msg.message}`);
//     }
//   }

//   await new Promise(resolve => setTimeout(resolve, 1000));

//   // 示例：發送多個任務
//   await sendTask("Task data 1");
//   await sendTask("Task data 2");
//   // ... 可以發送更多任務
// }

// run();

// async function testSend() {
//     const socket = new zmq.Dealer();
//     await socket.connect("tcp://localhost:5559");

//     console.log("Test Worker connected to broker");

//     const taskId = Date.now().toString();
//     const task = { apiId: 'task', taskId: taskId, data: "Test data" };
//     const message = JSON.stringify(task);

//     try {
//       await socket.send([Buffer.from(''), Buffer.from(message)]);
//       console.log(`Test task ${taskId} sent`);
//     } catch (error) {
//       console.error(`Failed to send test task ${taskId}:`, error);
//     }
//   }

//   testSend();
