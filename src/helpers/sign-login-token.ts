import { storeTokenQuery } from "../database/user";
import getProfileService from "../services/profiles/get-profile";
import { signAccessToken } from "./jwt";

const signLoginToken = async (auth: any, getUser: any) => {
  const { _id } = getUser || {};

  // get profile if there"s an existing user
  let profile: any = null;
  if (_id) {
    profile = await getProfileService({
      userId: _id,
    });
  }

  // sign access token and return
  const requestData = {
    userId: auth?.userId || _id,
    name: `${auth?.firstName || profile?.firstName}`,
    profileId: auth?.profileId || profile?._id,
    role: auth?.role || profile?.role,
  };

  const accessToken = await signAccessToken(requestData);

  // store sign access token to DB
  await storeTokenQuery({
    userId: requestData.userId,
    profileId: requestData?.profileId,
    accessToken,
    role: requestData.role,
  });

  // returned data for login request
  const data = {
    userId: requestData.userId,
    accessToken,
  };

  return data;
};

export default signLoginToken;
