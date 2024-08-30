import { editProfileImage } from "../../database/profile";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";
import uploadFilesService from "../uploads/upload-files";

const editProfileImageService = async ({
  accessToken,
  files,
}: {
  accessToken: string;
  files: string[];
}) => {
  try {
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    if (!tokenDetails) throw new Error("Unauthorized");

    const fileUploaded = await uploadFilesService({ files });
    if (!fileUploaded.length) throw new Error("No file uploaded.");

    const res = await editProfileImage({
      userId: tokenDetails?.userId,
      profileImage: {
        thumbnailImage: fileUploaded[0],
        originalImage: fileUploaded[0],
      },
    });

    if (!res) throw new Error("Edit profile did not succeed.");

    return {
      res: {
        profileImage: {
          thumbnailImage: fileUploaded[0],
          originalImage: fileUploaded[0],
        },
      },
      err: null,
    };
  } catch (err) {
    return {
      res: null,
      err,
    };
  }
};

export default editProfileImageService;
