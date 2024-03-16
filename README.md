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



```mermaid

classDiagram
    %% Define Frontend Components
    class Frontend {
        -React App
        -Router
        -Components
        -API Services
    }
    class Components {
        -LoginPage
        -RegisterPage
        -ProtectedPage
    }
    class APIServices {
        +registerUser()
        +loginUser()
        +fetchProtectedData()
    }

    %% Define Backend Components
    class Backend {
        -Express Server
        -Middleware
        -Routes
        -Authentication Service
        -User Service
        -Database
    }
    class Middleware {
        +authenticateJWT()
        +errorHandling()
    }
    class Routes {
        +registerRoute
        +loginRoute
        +protectedRoute
    }
    class AuthenticationService {
        +createToken()
        +verifyToken()
    }
    class UserService {
        +createUser()
        +findUser()
    }
    class Database {
        +Users Collection
    }

    %% Define Relationships
    Frontend --|> Components
    Frontend --|> APIServices
    Components --|> LoginPage
    Components --|> RegisterPage
    Components --|> ProtectedPage
    APIServices --> Backend: Sends HTTP requests
    Backend --|> Middleware
    Backend --|> Routes
    Backend --|> AuthenticationService
    Backend --|> UserService
    Backend --|> Database
    Middleware --> AuthenticationService: Uses for token verification
    Routes --> UserService: Uses to interact with user data
    Routes --> AuthenticationService: Uses to handle authentication
    AuthenticationService --> Database: Queries user data
    UserService --> Database: Creates and finds users

```



```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#334455', 'primaryBorderColor': '#88aadd', 'lineColor': '#88aadd', 'textColor': '#ffffff', 'mainBkg': '#1a1a1a', 'nodeBkg': '#333344', 'nodeBorderColor': '#88aadd', 'clusterBkg': '#242424', 'clusterBorder': '#88aadd', 'nodeTextColor': 'white'}}}%%
flowchart LR
    jwt[JWT Authentication]
    theft[Token Theft]
    leak[Information Leakage]
    expiry[Token Expiry]
    signing[Weak Signing Algorithm]
    storage[Insecure Token Storage]
    trust[Trust of Token Claims]
    
    jwt --> theft
    jwt --> leak
    jwt --> expiry
    jwt --> signing
    jwt --> storage
    jwt --> trust
    
    theft -- "Use HTTPS" --> preventTheft[Prevent Token Theft]
    theft -- "Token rotation" --> preventTheft
    theft -- "Short-lived tokens" --> preventTheft
    
    leak -- "Avoid storing sensitive data" --> preventLeakage[Prevent Information Leakage]
    
    expiry -- "Implement token expiration" --> handleExpiry[Handle Token Expiry]
    
    signing -- "Use strong algorithms (e.g., RS256)" --> preventWeakSigning[Prevent Weak Signing]
    
    storage -- "Avoid storing in LocalStorage" --> secureStorage[Secure Token Storage]
    storage -- "Use secure cookies with HttpOnly" --> secureStorage
    
    trust -- "Validate token integrity" --> validateTrust[Validate Trust of Token Claims]
    trust -- "Always verify claims" --> validateTrust
    
    classDef risk fill:#ff6666,stroke:#ffffff,stroke-width:2px,color:#ffffff;
    classDef solution fill:#00ff00,stroke:#ffffff,stroke-width:2px,color:#ffffff;
    
    class theft,leak,expiry,signing,storage,trust risk;
    class preventTheft,preventLeakage,handleExpiry,preventWeakSigning,secureStorage,validateTrust solution;

```


```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#4d4d4d', 'primaryBorderColor': '#d3d3d3', 'lineColor': '#d3d3d3', 'textColor': '#d3d3d3', 'mainBkg': '#2c2c2c', 'nodeBkg': '#4d4d4d', 'nodeBorderColor': '#d3d3d3', 'clusterBkg': '#3a3a3a', 'clusterBorder': '#d3d3d3', 'nodeTextColor': 'white', 'clusterTextColor': '#d3d3d3', 'arrowheadColor': '#d3d3d3'}}}%%
flowchart LR
    jwt[JWT Authentication]
    theft[Token Theft]
    leak[Information Leakage]
    expiry[Token Expiry]
    signing[Weak Signing Algorithm]
    storage[Insecure Token Storage]
    trust[Trust of Token Claims]

    jwt --> theft
    jwt --> leak
    jwt --> expiry
    jwt --> signing
    jwt --> storage
    jwt --> trust

    theft -- "Use HTTPS, Token rotation, Short-lived tokens" --> preventTheft[Prevent Token Theft]
    leak -- "Avoid storing sensitive data" --> preventLeakage[Prevent Information Leakage]
    expiry -- "Implement token expiration" --> handleExpiry[Handle Token Expiry]
    signing -- "Use strong algorithms (e.g., RS256)" --> preventWeakSigning[Prevent Weak Signing]
    storage -- "Avoid storing in LocalStorage, Use secure cookies with HttpOnly" --> secureStorage[Secure Token Storage]
    trust -- "Validate token integrity, Always verify claims" --> validateTrust[Validate Trust of Token Claims]

    classDef default fill:#4d4d4d,stroke:#d3d3d3,stroke-width:1px,color:#d3d3d3;
```

