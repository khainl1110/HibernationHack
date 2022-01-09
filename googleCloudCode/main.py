from flask import jsonify
from helper import gradientDescent, computeCost
import numpy as np
import json

def prep(X, y):
    # Add a column of ones to X. The numpy function stack joins arrays along a given axis. 
        # The first axis (axis=0) refers to rows (training examples) 
        # and second axis (axis=1) refers to columns (features).
        m = y.size
        X = np.stack([np.ones(m), X], axis=1)

        # initialize fitting parameters
        theta = np.zeros(2)

        # some gradient descent settings
        iterations = 500
        alpha = 0.00005

        theta = gradientDescent(X ,y, theta, alpha, iterations)
        return theta

def hello_world(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <https://flask.palletsprojects.com/en/1.1.x/api/#flask.Flask.make_response>`.
    """

    X = np.array([1,3,7,14,15,11])
    y = np.array([2,7,11,23,25,21]) 

    request_json = request.get_json()
    
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    if request_json:
        # json_object = json.loads(request_json)

        XTest = request_json["X"]
        yTest = request_json["y"]

        dataR = {
            "XTest": XTest[0],
            "yTest": yTest
        }
        
        X1 = np.array(XTest)
        y1 = np.array(yTest)

        # return (dataR, 200, headers)
        # X = np.array(XTest)
        # y = np.array(yTest)
        theta = prep(X1, y1)
        data = {"x0": theta[0], "x1": theta[1]}
        return (data, 200, headers)
    else:

        
        theta = prep(X,y)
        data = {"x0": theta[0], "x1": theta[1]}
        return (data, 200, headers)
        # return json.dumps(data)

