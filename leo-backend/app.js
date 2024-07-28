const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const os = require('os');
const constellationRoutes = require("./app/routes/constellation");
const authRoutes = require("./app/routes/authRoutes");
const projectRoutes = require("./app/routes/project.routes");
const chartRoutes = require("./app/routes/chart.routes");
const exportRoutes = require("./app/routes/export.routes");
const app = express();


app.use(bodyParser.json());
// 允許所有來源的跨域請求（不建議在生產環境中使用）
app.use(cors());


// 讀取config.json
const config = JSON.parse(fs.readFileSync("./app/config/config.json", "utf8"));
const serverPort = config.serverPort;

// 使用路由
app.use("/constellation", constellationRoutes);
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use('/chart', chartRoutes);
app.use('/export', exportRoutes);

// 獲取所有本地IP地址
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        addresses.push(alias.address);
      }
    }
  }
  return addresses;
}

// 啟動伺服器
// app.listen(config.serverPort, 0, () => {
//   console.log(
//     `Server running at http://${config.serverIp}:${config.serverPort}/`
//   );
// });
try {
  app.listen(serverPort, '0.0.0.0', () => {
    const localIPs = getLocalIPs();
    console.log(`Server running at:`);
    localIPs.forEach(ip => {
      console.log(`http://${ip}:${serverPort}/`);
    });
  });
} catch (error) {
  console.error('Error starting server:', error);
}



// 允許所有來源的跨域請求（不建議在生產環境中使用）
// app.use(cors());
// 只允許特定來源
// app.use(
//   cors({
//     origin: "http://localhost:4200",
//   })
// );
//如果想要更細緻的控制，可以這樣設置：
// const corsOptions = {
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));
