import numpy as np

def computeCost(X, y, theta):
    """
    Compute cost for linear regression. Computes the cost of using theta as the
    parameter for linear regression to fit the data points in X and y.
    
    Parameters
    ----------
    X : array_like
        The input dataset of shape (m x n+1), where m is the number of examples,
        and n is the number of features. We assume a vector of one's already 
        appended to the features so we have n+1 columns.
    
    y : array_like
        The values of the function at each data point. This is a vector of
        shape (m, ).
    
    theta : array_like
        The parameters for the regression function. This is a vector of 
        shape (n+1, ).
    
    Returns
    -------
    J : float
        The value of the regression cost function.
    
    Instructions
    ------------
    Compute the cost of a particular choice of theta. 
    You should set J to the cost.
    """
    
    # initialize some useful values
    m = y.size  # number of training examples
    
    # You need to return the following variables correctly
    J = 0
    
    # ====================== YOUR CODE HERE =====================
    # theta's shape is 2 * 1 while X shape is m*2
    # so it would be X * theta, which results in X*1

    hypo = np.dot(X, theta)

    diff = np.subtract(hypo, y)
    sum = np.sum(diff**2)
    J = sum/(2*m)
    
    # ===========================================================
    return J

def gradientDescent(X, y, theta, alpha, num_iters):
    """
    Performs gradient descent to learn `theta`. Updates theta by taking `num_iters`
    gradient steps with learning rate `alpha`.
    
    Parameters
    ----------
    X : array_like
        The input dataset of shape (m x n+1).
    
    y : array_like
        Value at given features. A vector of shape (m, ).
    
    theta : array_like
        Initial values for the linear regression parameters. 
        A vector of shape (n+1, ).
    
    alpha : float
        The learning rate.
    
    num_iters : int
        The number of iterations for gradient descent. 
    
    Returns
    -------
    theta : array_like
        The learned linear regression parameters. A vector of shape (n+1, ).
    
    J_history : list
        A python list for the values of the cost function after each iteration.
    
    Instructions
    ------------
    Peform a single gradient step on the parameter vector theta.

    While debugging, it can be useful to print out the values of 
    the cost function (computeCost) and gradient here.
    """
    # Initialize some useful values
    m = y.shape[0]  # number of training examples
    
    # make a copy of theta, to avoid changing the original array, since numpy arrays
    # are passed by reference to functions
    theta = theta.copy()
    
    for i in range(num_iters):
        # ==================== YOUR CODE HERE =================================
        # slide 36 of Lecture2
        
        # theta's shape is 2 * 1 while X shape is m*2
        # so it would be X * theta, which results in X*1

        hypo = np.dot(X, theta)
        
        diff = np.subtract(hypo, y)
        diff = np.multiply(diff, X[:, 0])
        # calculate new theta zero 
    
        sigma = np.sum(diff)
        deri = sigma/m
        nZero = theta[0] - alpha * deri
       
        # calculate new theta one
        diff1 = np.multiply(diff, X[:,1])  # since X now has 2 columns, X[0] is filled with 1
        
        sigma1 = np.sum(diff1)
        deri1 = sigma1/m
        nOne = theta[1] - alpha * deri1
        
        theta[0] = nZero
        theta[1] = nOne
        
        # =====================================================================
        
    
    return theta