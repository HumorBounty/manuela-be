import { addProfile } from "../../database/profile";
import { UserProfile } from "../../models/user/user-interfaces";

const addProfileService = async (request: UserProfile) => {
  try {
    const res = await addProfile(request);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default addProfileService;
