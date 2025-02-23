import { privateAxios } from "./helper";
import { myAxios } from "./helper";

// Create post function
export const createPost = (post) => {
  // console.log(post)
  return privateAxios
    .post(`/api/user/${post.userId}/category/${post.categoryId}/posts`, post)
    .then((response) => response.data);
};

//upload post banner image
export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/api/post/image/upload/${postId}`, formData)
    .then((response) => response.data);
};

// Load all posts...
export const getAllPost = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postDate&sortDir=desc`
    )
    .then((response) => response.data);
};

//Load post by postId
export const getPostById = (postId) => {
  return myAxios.get(`/api/posts/` + postId).then((response) => response.data);
};

// Load post by category..
export const loadPostByCategory = (pageNumber, pageSize, categoryId) => {
  return myAxios
    .get(
      `/api/category/${categoryId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postDate&sortDir=desc`
    )
    .then((response) => response.data);
};

//load posts of user by user id
export const loadPostsByUserId = (pageNumber, pageSize, userId) => {
  return privateAxios
    .get(
      `/api/user/${userId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postDate&sortDir=desc`
    )
    .then((response) => response.data);
};

// Delete post..
export const deletePostByPostId = (postId) => {
  return privateAxios
    .delete(`/api/posts/${postId}`)
    .then((response) => response.data);
};

// Update the post..
export const updatePostByPostId = (post, postId) => {
  console.log(post)
  return privateAxios
    .put(`/api/posts/${postId}`,post)
    .then((response) => response.data);
};
