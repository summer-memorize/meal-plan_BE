import { Request, Response, NextFunction } from "express";
import errorCodes from "./errorCodes";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(11111, err);

  const codeName = (err && err.codeName) || null;
  let error = errorCodes[codeName] || errorCodes["INTERNAL_SERVER_ERROR"];

  //* joi 라이브러리 사용한 validation 검사 에러
  if (err.name === "ValidationError") error = errorCodes["BAD_REQUEST"];

  return res.status(error.statusCode).json({ message: error.message });
};

export default errorHandler;
