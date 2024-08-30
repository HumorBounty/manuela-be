import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import uploadFilesService from "../../services/uploads/upload-files";
import { HttpRequest } from "../../utils/global-interfaces";

export const uploadFilesController = async (httpRequest: HttpRequest) => {
  try {
    // validate auth token
    if (!httpRequest.headers.authorization) {
      throw new Error("Unauthorized");
    }
    
    const res = await uploadFilesService({
      files: httpRequest.files
    });

    return makeHttpSuccess({
      statusCode: 200,
      message: "Files uploaded.",
      data: res
    });
  } catch(err: any) {
    return makeHttpError({
      statusCode: 400,
      message: err.message
    });
  }
}