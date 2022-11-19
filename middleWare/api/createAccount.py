import json
import subprocess

# =============================================================================
# resim new-account commnad result 
#
# A new account has been created!
# Account component address: account_sim1___________some string___________
# Public key: ___________some string___________
# Private Key: ___________some string___________
# =============================================================================

def createAccount():
    # To make JSON reponse
    result_dict = { 
        "accountAddr" : "",
        "privateKey" : "",
    }

    create_new_acct_result = subprocess.Popen( 
            ["resim", "new-account"], 
            stdout=subprocess.PIPE 
        )

    splited_new_acct_result = str(create_new_acct_result.communicate())
    splited_new_acct_result = splited_new_acct_result.split('\\n')

    accountAddr_value = splited_new_acct_result[1].split(': ')
    accountAddr_value = str(accountAddr_value[1])

    privateKey_value = splited_new_acct_result[3].split(': ')
    privateKey_value = str(privateKey_value[1])

    result_dict["accountAddr"] = accountAddr_value
    result_dict["privateKey"] = privateKey_value

    # make reponse dictionary
    result_dict = json.dumps(result_dict)
    response_json = json.loads(result_dict)

    # JSON response
    return response_json


if __name__ == "__main__":
    createAccount()