# 2dProject1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Development server

- Clone from github, run `npm install`first.
- Make sure that you already install angular CLI, if not run `npm install -g @angular/cli`
- update src/config/config.json

  ```json
  {
    "serverIp": "your backend server IP",
    "serverPort": "your backend port",
    "frontendHost": "your frontend server IP",
    "frontendPort": "your frontend port"
  }
  ```

- Then run `npm start`. for a dev server. Navigate to `http://{your frontend server IP}:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Solve some problems...

#### Solve high vulnerabilities

1. modify package.lock.json webpack-dev-middleware version to
   ` "webpack-dev-middleware": "5.3.4"`
2. Run npm install

#### Solve package number limit

當噴出一大坨文件數量限制的error，用以下command解決。
`$echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
