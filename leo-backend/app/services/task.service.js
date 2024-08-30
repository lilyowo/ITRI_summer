const zmq = require("zeromq");
const config = require("../config/config");

async function sendTaskToBroker(data, apiId = "task") {
  const socket = new zmq.Dealer();
  try {
    await socket.connect(config.zmqBrokerUrl);
    console.log("已連接至 broker");

    const taskId = Date.now().toString();
    const task = { apiId, taskId, data };
    const message = JSON.stringify(task);

    //發送任務
    try {
      await socket.send([Buffer.from(""), Buffer.from(message)]);
      console.log(`已發送任務 ${taskId}, apiId: ${apiId}`);
    } catch (error) {
      console.error(`發送任務 ${taskId}, apiId: ${apiId} 失敗：`, error);
    }

    //監聽結果
    for await (const parts of socket) {
      try {
        const [empty, resultBuffer] = parts;
        // console.log(resultBuffer.toString());
        const result = JSON.parse(resultBuffer.toString());
        console.log(`收到任務 ${result.taskId} 的結果`);
        if (result.apiId === "result" && result.taskId === taskId) {
          console.log(`任務 ${result.taskId} 完成`);
          await socket.close();
          return result.results;
        } else if (result.apiId === "error") {
          console.error(`錯誤：${result.message}`);
        } else {
          console.warn(
            `未知訊息類型：apiId = ${result.apiId}, taskId = ${result.taskId}, expected taskId = ${taskId}`
          );
        }
      } catch (error) {
        console.error("解析訊息時發生錯誤：", error);
      }
    }
  } catch (error) {
    console.error("連接失敗：", error);
  }
}

module.exports = { sendTaskToBroker };
