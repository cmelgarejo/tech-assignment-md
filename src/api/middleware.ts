import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { ZodError } from "zod";

type ErrorWithStatus = Error & { status?: number | string };

export const errHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // If you wanna clutter the stdout with stack traces, uncomment, either way, next(err) does just that
  // console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err instanceof QueryFailedError) {
    res.status(statusCode).json({
      name: err.name,
      status: parseInt((err as QueryFailedError).driverError.code),
      message: (err as QueryFailedError).driverError.detail,
    } as ErrorWithStatus);
    return;
  } else if (err instanceof ZodError) {
    res.status(400).json({
      name: err.name,
      status: 400,
      message: (err as ZodError).issues.map((issue) => ({ message: issue.message, path: issue.path })),
    });
    return;
  }

  // Set a default status code for the error response if it doesn't have one that makes sense
  res.status(statusCode).json(err);
  next(err);
};
