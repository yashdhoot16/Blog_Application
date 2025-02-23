import React, { useEffect, useState } from "react";
import { getAllPost, deletePostByPostId } from "../services/post_service";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    pageNumber: "",
    pageSize: "",
    totalPages: "",
    totalElements: "",
    lastPage: false,
  });

  useEffect(() => {
    // load all posts from server..
    getAllPost(0, (postContent.pageSize = 5))
      .then((data) => {
        // console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Error in loading posts !!");
      });
  }, []);

  // Method required for Pagination..
  const changePage = (pageNumber = 0, pageSize = 5) => {
    // Conditional logic for pagination..
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }

    getAllPost(pageNumber, pageSize)
      .then((data) => {
        setPostContent(data);
        // console.log(data);
      })
      .catch((error) => {
        toast.error("Error in loading posts !!");
      });
  };

  // Function to delete the post...
  const deletePost = (post) => {
    //Method from post-service.js to delete the user by PostId
    deletePostByPostId(post.postId)
      .then((data) => {
        // console.log(data);
        toast.success("Post deleted !!");

        //Loading data after post is deleted..
        let newPostContents = postContent.content.filter(
          (p) => p.postId !== post.postId
        );
        setPostContent({...postContent, content:newPostContents});
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post can not be deleted !!");
      });
  };

  return (
    <Container>
      <Row className="">
        <Col
          md={{
            size: 12,
            // offset: 1,
          }}
        >
          <h3 className="text-center">
            Blog Count : {postContent ? postContent.totalElements : 0}
          </h3>

          {postContent.content?.map((post) => (
            <Post key={post.postId} post={post} deletePost={deletePost} />
          ))}

          <Container className="mt-3">
            <Pagination size="sm">
              <PaginationItem
                onClick={() => changePage(postContent.pageNumber - 1)}
                disabled={postContent.pageNumber === 0}
              >
                <PaginationLink previous>Previous</PaginationLink>
              </PaginationItem>
              {[...Array(postContent.totalPages)].map((item, index) => (
                <PaginationItem
                  active={index === postContent.pageNumber}
                  key={index}
                  onClick={() => changePage(index)}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem
                onClick={() => changePage(postContent.pageNumber + 1)}
                disabled={postContent.lastPage}
              >
                <PaginationLink next>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default NewFeed;
