import { getProfileQuery } from "../../database/profile";

interface Params {
  userId?: string;
  profileId?: string;
}

const getProfileService = async ({ userId, profileId }: Params) => {
  try {
    const res = await getProfileQuery({
      userId,
      profileId,
    });
    if (!res) throw new Error("No profile");
    return res;
  } catch (err) {
    return err;
  }
};

export default getProfileService;
