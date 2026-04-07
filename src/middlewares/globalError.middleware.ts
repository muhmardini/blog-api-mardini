import { NextFunction, Request, Response } from "express";

const globalErrorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({
        status: "fail",
        message: err.message || "Sorry, something went wrong"
    })
}

export default globalErrorMiddleware;