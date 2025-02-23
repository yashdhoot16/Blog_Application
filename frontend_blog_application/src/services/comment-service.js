import { privateAxios } from "./helper";

// Create comment..
export const createComment = (comment, postId) => {
  return privateAxios
    .post(`/api/post/${postId}/comments`, comment)
    .then((response) => response.data);
};

//Delete comment..
export const deleteCommentService = (commentId) => {
  return privateAxios
    .delete(`/api/comments/${commentId}`)
    .then((response) => response.data);
};
