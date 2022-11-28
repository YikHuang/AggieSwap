from flask import Flask
from flask_executor import Executor
from flask_shell2http import Shell2HTTP


# Flask application instance for AggieSwap
app = Flask('AggieSwap_midWare')

# Logging
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("flask_shell2http")
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(loggin.INFO)

# Applicatio factory
executor = Executor(app)
shell2http = Shell2HTTP(app, executor, base_url_prefix='/api/')

# Request: createAccount
shell2http.register_comand(
    endpoint='createAccount', command_name='createAccount')

# Application runner
# Run web server at http://localhost:3005
@app.route("/")
if __name__ == "__main__":
    app.testing = True
    aggieswap_clinet = app.test_clinet()

    uri = "/api/createAccount"
    response_createAccount = aggieswap.post(
            uri,
            json = {
                "args" : [
                    'apiName',
                    ]
            }.get_json()
        )

    print(response_createAccount)

    # Fetch result
    result_createAccount = response_createAccount.json()
    print(createAccount)

    privateKey = result_createAccount["privateKey"]
    accountAddr = result_createAccount["accountAddr"]

    if privateKey and accountAddr:
        return response_createAccount



