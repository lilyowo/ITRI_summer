const { exec } = require('child_process');
require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4200;

const command = `ng serve --host=${host} --port=${port}`;
console.log(`Running command: ${command}`);

const serverProcess = exec(command);

serverProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

serverProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

serverProcess.on('exit', (code) => {
  console.log(`Process exited with code ${code}`);
});
