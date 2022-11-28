# AggieSwap

## Frontend
- To run Frontend (run by terminal)
    1. Go to the frontend folder
    2. npm install
    3. npm start
    4. For successfully testing, if the backend is not running, use Mockoon to mock the API
        - Mockoon
            1. Import apiEnv.json
            2. Put the response of the "api.json" file into the corresponing api

- Demo Video: https://youtu.be/r2URW6lRSxg


## Radix Engine
### Installation
- Follow the tutorial:
    -  https://www.scrypto-tutorial.com/getting-started/installation
    > If there's error about "Unable to find clang.dll" something like this, try to install LLVM and set the environment variable path (LIBCLANG_PATH) to "LLVM/bin"


    > Remember to delete the old one -> re-clone the repo -> install again

### Pre-step
1. Create a new project by the following command
    - ```scrypto new-package davis```
2. Replace "src" folder with this project's src	

### Run
- For Windows
    - https://youtu.be/XqQUt_DfI8M


- For Linux & MacOS
    - Same as Windows, only the syntax of setting environment variable would be different
        - Change ```$env:NAME='VALUE'``` to ```export NAME=VALUE```


- Full Tutorial:
    - https://www.youtube.com/watch?v=Mu8L-BJFfQM


## Middleware
### Installation
- Install Flask package
    - ```pip install flask```

### Pre-step
- Install Radix Engine before running Flask Web application. See Radix Engine Pre-setp part

### Run
- Run Flask web app 

    ```
     cd middleWare/src
     flask run -p 3008
     ```
