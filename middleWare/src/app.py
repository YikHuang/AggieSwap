import subprocess
from flask import Flask
from flask import request, Response
from flask import make_response

# For JSON request & response 
import json
# Logging
import logging
import sys
import os
from flask_cors import CORS

# Basic Flask settings
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Logging
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("flask_shell2http")
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# Global value
component_value = ""
# initilization


def splitting_command_results(input_str):
    splitted_result = str(input_str.communicate())
    splitted_result = splitted_result.split('\\n')

    return splitted_result


def conver_to_JSON(input_str):
    result_dict = json.dumps(input_str)
    response_json = json.loads(result_dict)

    return response_json


def get_component_value():
    print('get_component_value function')
    # Commmnad: $ resim reset
    subprocess.Popen( 
            ["resim", "reset"],
            stdout=subprocess.PIPE 
        )

    # Commmnad: $ resim new-account
    subprocess.Popen( 
            ["resim", "new-account"],
            stdout=subprocess.PIPE 
        )

    # Command: $ resim publish .
    publish_result = subprocess.Popen( 
            ["resim", "publish", "../../radixEngine/davis/"],
            stdout=subprocess.PIPE 
        )

    # get [package] value
    for result_output in splitting_command_results(publish_result):
        if "New Package" in result_output:
            package_value = result_output.split(': ')
            package_value = str(package_value[1])

    new_davis_result = subprocess.Popen( 
            ["resim", "call-function", package_value, "Davis", "new", "10", "0.5"],
            stdout=subprocess.PIPE 
        )

    for result_output in splitting_command_results(new_davis_result):
        if "Component:" in result_output:
            tmp_component_value = result_output.split(': ')
            tmp_component_value = str(tmp_component_value[1])

    return tmp_component_value


def get_component_value_swap():
    print('get_component_value function')
    # Commmnad: $ resim reset

    # Command: $ resim publish .
    publish_result = subprocess.Popen( 
            ["resim", "publish", "../../radixEngine/davis/"],
            stdout=subprocess.PIPE 
        )

    # get [package] value
    for result_output in splitting_command_results(publish_result):
        if "New Package" in result_output:
            package_value = result_output.split(': ')
            package_value = str(package_value[1])

    new_davis_result = subprocess.Popen( 
            ["resim", "call-function", package_value, "Davis", "new", "10", "0.5"],
            stdout=subprocess.PIPE 
        )

    for result_output in splitting_command_results(new_davis_result):
        if "Component:" in result_output:
            tmp_component_value = result_output.split(': ')
            tmp_component_value = str(tmp_component_value[1])

    print('New component value: ', tmp_component_value)
    return tmp_component_value

# Add Response header parameters and values
def make_JSON_response(raw_reponse):
    r = make_response(raw_reponse)
    r.headers['Access-Control-Allow-Origin'] = '*'

    print(r)

    return r

# Create Account 
@app.route('/createAccount', methods=['POST'])
def create_account():
    client_req = request.get_json()

    if client_req["apiName"] != "createAccount":
        return Response(
                "Wrong createAccount request",
                status=400,
            )

    # Dictionary for JSON reponse 
    result_dict = { 
        "accountAddr" : "",
        "privateKey" : "",
    }

    # Command: $ resim new-account
    create_new_acct_result = subprocess.Popen( 
            ["resim", "new-account"], 
            stdout=subprocess.PIPE 
        )

    # Command execute result parsing
    splited_new_acct_result = splitting_command_results(create_new_acct_result)

    accountAddr_value = splited_new_acct_result[1].split(': ')
    accountAddr_value = str(accountAddr_value[1])

    privateKey_value = splited_new_acct_result[3].split(': ')
    privateKey_value = str(privateKey_value[1])

    result_dict["accountAddr"] = accountAddr_value
    result_dict["privateKey"] = privateKey_value

    # Make reponse dictionary
    response_json = conver_to_JSON(result_dict)

    # JSON response
    return make_JSON_response(response_json)

# Get Currency 
@app.route('/getCurrency', methods=['POST'])
def get_currency():
    global component_value
    print('component_value : ', component_value)

    client_req = request.get_json()

    if( client_req["apiName"] != "getCurrency" or 
        client_req["baseCur"] != "XRD" ):
        return Response(
                "Wrong createAccount request",
                status=400,
            )

    req_baseCur = client_req["baseCur"]

    # Dictionary for JSON reponse 
    result_dict = { 
        "amt" : "",
        "currency":"AGS" #############################
    }

    if component_value == "":
        print('Make new component value')
        component_value = get_component_value()

    print("In the function : ", component_value)

    get_price_result = subprocess.Popen( 
            ["resim", "call-method", component_value, "get_price"],
            stdout=subprocess.PIPE 
        )

    currency_value = "1"
    for result_str in splitting_command_results(get_price_result):
        if "Decimal(" in result_str:
            tmp_component_value = result_str.split('("')
            currency_value = str(tmp_component_value[1])
            currency_value = currency_value.replace('")', '')
            currency_value.replace('\\"', '"')

    currency_value = 1/float(currency_value)#####

    result_dict['amt'] = str(currency_value)

    response_json = conver_to_JSON(result_dict)

    # JSON reponse
    return make_JSON_response(response_json)

# Get Transaction Fee
@app.route('/getTransacFee', methods=['POST'])
def get_transac_fee():
    global component_value
    client_req = request.get_json()

    if client_req["apiName"] != "getTransacFee":
        return Response(
                "Wrong getTransacFee request",
                status=400,
            )

    # Dictionary for JSON reponse 
    result_dict = { 
        "fee" : "",
        "currency" : "",
    }

    if component_value == "":
        component_value = get_component_value()

    get_tx_fee_result = subprocess.Popen( 
            ["resim", "call-method", component_value, "get_transaction_fee"],
            stdout=subprocess.PIPE 
        )

    tx_fee_value = "0"
    for result_str in splitting_command_results(get_tx_fee_result):
        if "Decimal(" in result_str:
            tmp_component_value = result_str.split('("')
            tx_fee_value = str(tmp_component_value[1])
            tx_fee_value = tx_fee_value.replace('")', '')
            tx_fee_value.replace('\\"', '"')

    result_dict['fee'] = tx_fee_value
    result_dict['currency'] = 'XRD'

    response_json = conver_to_JSON(result_dict)

    # JSON response
    return make_JSON_response(response_json)

# Swap
@app.route('/swap', methods=['POST'])
def swap():
    global component_value
    client_req = request.get_json()

    if(client_req["apiName"] != "swap" or
       client_req["accountAddr"] == "" or 
       client_req["privateKey"] == "" or 
       client_req["amt"] == "" or 
       client_req["fee"] == "" or 
       client_req["from"] == "" or 
       client_req["to"] == "") :
        return Response(
                "Wrong createAccount request",
                status=400,
            )

    # Dictionary for JSON reponse 
    result_dict = { 
        "amt" : "",
        "AggieSwpAmt" : "",
        "isSuccessful" : "",
    }

    account_info_value = client_req["accountAddr"]
    privateKey_value = client_req["privateKey"]
    buy_amt = client_req["amt"]
    tx_fee = client_req["fee"]
    #xrd_from = client_req["swap request"]["from"]
    #xrd_to = client_req["swap request"]["to"]

    set_def_account_result = subprocess.Popen( 
            ["resim", "set-default-account", account_info_value, privateKey_value], 
            stdout=subprocess.PIPE 
        )

    set_def_account_result = splitting_command_results(set_def_account_result)
    set_def_account_result = set_def_account_result[0]

    print('in Swap component_value :', component_value)

    # Command: $resim show $account_value$
    show_account_result = subprocess.Popen( 
            #["resim", "show", account_info_value], 
            ["resim", "show", component_value], 
            stdout=subprocess.PIPE 
        )

    splitted_show_result = splitting_command_results(show_account_result)

    if component_value == "":
        component_value = get_component_value()

    print(splitted_show_result)
    # Get Xrd and aggieswap amt value
    for result_str in reversed(splitted_show_result):
        if ("resource address" in result_str) and ("Radix" in result_str):
            xrd_val_list = result_str.split(', ')
            xrd_val_tmp = xrd_val_list[1].split(': ')    
            xrd_val = xrd_val_tmp[1]
            print('xrd val: ', xrd_val)

    buy_param = buy_amt+','+xrd_val
    print('buy_parameter : ', buy_param)
    fee_param = tx_fee+','+xrd_val
    print('receiver_parameter : ', fee_param)

    swap_result = subprocess.Popen(
            ["resim" , "call-method", component_value, "buy_token", buy_param, fee_param],
            stdout=subprocess.PIPE
        )

    print(swap_result)
    swap_result = splitting_command_results(swap_result)
    print(swap_result)

    for result_str in swap_result:
        print(result_str)
        if( "Transaction Status:" in result_str):
            if("REJECTED" in result_str):
                result_dict['isSuccessful'] = False     
            if("SUCCESS" in result_str):
                result_dict['isSuccessful'] = True

    response_json = conver_to_JSON(result_dict)

    # JSON response
    return make_JSON_response(response_json)

# Get Account Information
@app.route('/getAccountInfo', methods=['POST'])
def get_account_info():
    client_req = request.get_json()

    if ( client_req["apiName"] != "getAccountInfo" or client_req["accountAddr"] == "" ):
        
        return Response(
                "Wrong getAccountInfo request",
                status=400,
            )

    account_info = client_req["accountAddr"]

    print('account info : ', account_info)

    if len(account_info) != 62:
        return Response(
                "Wrong AccountInput in JSON request",
                status=400,
            )

    # Dictionary for JSON reponse 
    result_dict = { 
        "xrdAmt" : "",
        "aggieSwapAmt" : "",
    }

    # Command: $resim show $account_value$
    get_account_info_result = subprocess.Popen( 
            ["resim", "show", account_info], 
            stdout=subprocess.PIPE 
        )

    splitted_account_result = splitting_command_results(get_account_info_result)

    # Get Xrd and aggieswap amt value
    for result in reversed(splitted_account_result):
        if result == "Resources:":
            break

        if (len(result) > 11) and ("resource" in result):
            # get amt value
            amt_val_list = result.split(', ')
            amt_val_tmp = amt_val_list[0].split(': ')
            symbol_tmp = amt_val_list[3].split(': ')

            amt_val = amt_val_tmp[1]
            symbol_val = symbol_tmp[1]

            # for symbol parsing
            symbol_val = symbol_val.split(' ')
            symbol_val = symbol_val[0]
            symbol_val = symbol_val.replace('"', '')

            # using parsing data 
            if symbol_val == 'XRD':
                result_dict['xrdAmt'] = amt_val
            else : #AS
                result_dict['aggieSwapAmt'] = amt_val

        else:
            result_dict['xrdAmt'] = 0
            result_dict['aggieSwapAmt'] = 0

    response_json = conver_to_JSON(result_dict)

    # JSON response
    return make_JSON_response(response_json)

# For initialization Radix engine
component_value = get_component_value()

@app.route('/')
def aggieSwap_midware():
    return "AggieSwap middleware server"




