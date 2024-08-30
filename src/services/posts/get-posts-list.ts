import { getPostList } from "../../database/post";

const getPostsListService = async (userId: string) => {
  try {
    const res = await getPostList(userId);
    return {
      res,
      err: null
    };

  } catch(err) {
    return {
      res: null,
      err
    };
  }
};

export default getPostsListService;