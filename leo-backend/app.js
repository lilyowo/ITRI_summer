const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const constellationRoutes = require("./app/routes/constellation");
const authRoutes = require("./app/routes/authRoutes");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
// 只允許特定來源
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// 讀取config.json
const config = JSON.parse(fs.readFileSync("./app/config/config.json", "utf8"));

// 使用路由
app.use("/constellation", constellationRoutes);
app.use("/auth", authRoutes);

// 啟動伺服器
app.listen(config.serverPort, config.serverIp, () => {
  console.log(
    `Server running at http://${config.serverIp}:${config.serverPort}/`
  );
});
// 允許所有來源的跨域請求（不建議在生產環境中使用）
// app.use(cors());
//如果想要更細緻的控制，可以這樣設置：
// const corsOptions = {
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// };
// app.use(cors(corsOptions));
