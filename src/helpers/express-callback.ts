import { Request, Response } from "express";
import adaptRequest from "./adapt-request";

export default function makeExpressCallback(controller: any) {
  return async (req: Request, res: Response) => {
    const httpRequest = adaptRequest(req);
    try {
      const httpResult = await controller(httpRequest);
      res
        .set(httpResult?.headers)
        .status(httpResult?.statusCode)
        .send({
          statusCode: httpResult?.statusCode,
          message: httpResult?.message,
          success: httpResult?.success,
          data: httpResult?.data,
        });
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  };
}
