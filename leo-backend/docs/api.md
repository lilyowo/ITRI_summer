## User

- User Login
    - method: POST
    - URL: `/auth/login'
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
    - URL: `/auth/forget-password'
    - Description: User login and get token
    - request:
        ```json
        {
            "email": "k200@itri.org.tw",
        }
        ```
    - response:
        ```json
        {
            "message": "Please contact email: k200support@itri.org.tw"
        }
        ```

## Project - Simulation Configuration

## Project - Report

## Project - Constellation

