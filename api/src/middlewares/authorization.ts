//axios.defaults.headers.common['Authorization'] = acc_token
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/user.model';
const jwt = require("jsonwebtoken");
const tokenkey = "tokensercret123456";

/*
 *parameter data is an object that hold any data  
 * you want to embed in your token
 */
export const getAccessToken = (data: any) => {
    var acc_token = jwt.sign({
        data
    }, tokenkey, {
        expiresIn: "12h"
    });
    return acc_token;
}

export const routeEnter = (req: Request, res: Response, next: NextFunction) => {
    console.log(req)
    next()
}

/*
 * to be authorized create an api ang get an access token
 * add the access token to the client header 
 * axios.defaults.headers.common['Authorization'] = acc_token => sample using axios
 * getAccessToken is the function to generate token.
 */
export const authorized = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, tokenkey, (err: any, user: IUser) => {
            if (err) {
                return res.json({
                    error: true,
                    message: "You are forbidden."
                });
            }
            res.locals.user = user;
            next();
        });
    } else {
        return res.json({
            error: true,
            message: "You are not authenticated."
        });
    }
}


