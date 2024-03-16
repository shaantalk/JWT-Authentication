# JWT-Authentication


```mermaid
sequenceDiagram
    participant User
    participant Server
    User->>Server: Send credentials (username/password)
    Server->>Server: Verify credentials
    alt credentials are valid
        Server->>User: Generate JWT
        note right of User: Store JWT locally
    else credentials are invalid
        Server->>User: Deny access
    end
    User->>Server: Request resource with JWT in Authorization header
    Server->>Server: Validate JWT signature
    alt JWT is valid
        Server->>User: Grant access to resource
    else JWT is invalid
        Server->>User: Deny access
    end
```



Folder structure

my-app/
|-- backend/
|   |-- node_modules/
|   |-- .env
|   |-- package.json
|   |-- package-lock.json
|   |-- server.js
|
|-- frontend/
|   |-- node_modules/
|   |-- public/
|   |   |-- index.html
|   |   |-- favicon.ico
|   |-- src/
|   |   |-- components/
|   |   |   |-- App.js
|   |   |   |-- Login.js
|   |   |   |-- Register.js
|   |   |   |-- Protected.js
|   |   |-- index.js
|   |   |-- index.css
|   |-- package.json
|   |-- package-lock.json
|
|-- .gitignore


```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#1f1f1f', 'primaryBorderColor': 'white', 'lineColor': 'white', 'textColor': '#eeeeee', 'mainBkg': '#1f1f1f', 'nodeBorder': '2px solid white', 'clusterBkg': '#333333', 'clusterBorder': '2px dashed white', 'nodeBkg': '#444444', 'nodeTextColor': 'white', 'nodeBorderColor': 'white', 'clusterTextColor': 'white'}}}%%
flowchart LR
    %% Define styles
    classDef frontend fill:#333333,stroke:#ffffff,stroke-width:2px,color:#ffffff,stroke-linejoin:round;
    classDef backend fill:#555555,stroke:#ffffff,stroke-width:2px,color:#ffffff,stroke-linejoin:round;
    classDef page fill:#444444,stroke:#ff6666,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff,stroke-linejoin:round;
    classDef api fill:#b5e48c,stroke:#ffffff,stroke-width:2px,color:#ffffff,stroke-linejoin:round;
    classDef process fill:#ffcb69,stroke:#ffffff,stroke-width:2px,color:#ffffff,stroke-linejoin:round;
    classDef response fill:#f28482,stroke:#ffffff,stroke-width:2px,color:#ffffff,stroke-linejoin:round;

    %% Define nodes
    subgraph Frontend
    RegisterPage[Register Page]
    LoginPage[Login Page]
    ProtectedPage[Protected Page]
    end

    subgraph Backend
    CreateUser[Create User]
    CheckCredentials[Verify Credentials]
    CreateJWT[Create JWT]
    VerifyJWT[Verify JWT]
    end

    %% Connect nodes with edges
    RegisterPage -->|Submit credentials| RegisterRequest[Register API Request]
    LoginPage -->|Submit credentials| LoginRequest[Login API Request]
    ProtectedPage -->|Send JWT in header| ProtectedRequest[Protected API Request]

    RegisterRequest -->|Check for user uniqueness and hash password| CreateUser
    CreateUser -->|User registered| ReturnRegisterResponse[Return Register Response]

    LoginRequest -->|Verify credentials| CheckCredentials
    CheckCredentials -->|Credentials valid, create JWT| CreateJWT
    CreateJWT -->|JWT created| ReturnLoginResponse[Return Login Response]

    ProtectedRequest -->|Verify JWT| VerifyJWT
    VerifyJWT -->|JWT valid| ReturnProtectedResponse[Return Protected Response]

    %% Apply styles
    class Frontend frontend;
    class Backend backend;
    class RegisterPage,LoginPage,ProtectedPage page;
    class RegisterRequest,LoginRequest,ProtectedRequest api;
    class CreateUser,CheckCredentials,CreateJWT,VerifyJWT process;
    class ReturnRegisterResponse,ReturnLoginResponse,ReturnProtectedResponse response;
```
