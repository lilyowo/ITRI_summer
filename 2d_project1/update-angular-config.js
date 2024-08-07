const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, './src/config/config.json');
const angularJsonPath = path.resolve(__dirname, './angular.json');

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));

const projectName = Object.keys(angularJson.projects)[0]; // 假設只有一個專案

angularJson.projects[projectName].architect.serve.options.host =
  config.frontendHost;
angularJson.projects[projectName].architect.serve.options.port =
  config.frontendPort;

fs.writeFileSync(
  angularJsonPath,
  JSON.stringify(angularJson, null, 2),
  'utf-8',
);
