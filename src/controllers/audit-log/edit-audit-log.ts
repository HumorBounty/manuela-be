import { editAuditLogQuery } from "../../database/audit-log";
import { adaptSuccessMessage } from "../../helpers/adapt-message";
import constants from "../../helpers/constants";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";

import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";
import { HttpRequest } from "../../utils/global-interfaces";

export const editAuditLogController = async (httpRequest: HttpRequest) => {
  try {
    if (!httpRequest.headers.authorization) {
      throw new Error(constants.ERROR_UNAUTHORIZED);
    }

    const tokenDetails = (await getTokenDetails(
      httpRequest.headers.authorization
    )) as TokenDetails;

    if (!tokenDetails) throw new Error("No Token Details");

    const res = editAuditLogQuery({
      userId: tokenDetails?.userId,
      payload: httpRequest.body,
    });

    return makeHttpSuccess({
      statusCode: 200,
      message: adaptSuccessMessage("Audit log"),
      data: res,
    });
  } catch (err: any) {
    return makeHttpError({
      statusCode: 400,
      message: err.message,
    });
  }
};
