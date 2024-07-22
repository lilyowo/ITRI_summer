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
       "historyId": 1, "userId": 1, "timestamp": 2024-07-22T07:28:29.951Z
    }
    ```

## Project - Simulation Configuration

## Project - Report

## Project - Constellation
