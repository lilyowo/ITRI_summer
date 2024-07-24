## User

- User Login

  - method: POST
  - URL: `/auth/login`
  - Description: User login and get token
  - request:
    ```json
    {
      "email": "k200@itri.org.tw",
      "password": "k200"
    }
    ```
  - response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- Forget Password

  - method: POST
  - URL: `/auth/forget-password`
  - Description: User login and get token
  - request:
    ```json
    {
      "email": "k200@itri.org.tw"
    }
    ```
  - response:
    ```json
    {
      "message": "Please contact email: k200support@itri.org.tw"
    }
    ```

- Loing History

  - method: Post
  - URL: `/auth/loginHistory`
  - Description: Record User login timestamp
  - request:
    ```json
    {
        "userId":
    }
    ```
  - response:
    ```json
    {
       "historyId": 1, "userId": 1, "timestamp": "2024-07-22 15:28:29.951457"
    }
    ```

## Project

- Get all projects

  - method: GET
  - URL: `/project/user/:userId`
  - Description: use userId get all projects of this user.
  - request:
    ```json
    {
      "userId": 1
    }
    ```
  - response:
    ```json
    {
      "projectId" : 1,
      "projectName": "project 1 ",
      "lastEditTime": "2024-07-22 15:28:29.951457"
      
    }
    ```

- Create project

  - method: PSOT
  - URL: `/project`
  - Description: create new project for this user.
  - request:
    ```json
    {
      "userId": 1,
      "projectName": "Project number one"
    }
    ```
  - response:
    ```json
    {
      "message": "Project added successfully"
    }
    ```

- Delete project

  - method: DELETE
  - URL: `/project/delete/:projectId`
  - Description: delete the project by projectId
  - request:
    ```json
    {
      "projectId": 1
    }
    ```
  - response:
    ```json
    {
      "message": "Project deleted successfully"
    }
    ```

## Project - Report

- Get all reports

  - method: GET
  - URL: `/project/report/:projectId`
  - Description: Get all reports by projectId.
  - request:
    ```json
    {
      "projectId": 3
    }
    ```
  - response:
    ```json
    {
      "reportId" : 1,
      "reportName": "[simulation] Project 1",
      "simuTime" : "2024-07-22 15:28:29.951457"
    }
    ```

## Project - Simulation Configuration

## Project - Constellation
