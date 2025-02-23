import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import CategoryMenu from "../components/CategoryMenu";
import {
  loadPostByCategory,
  deletePostByPostId,
} from "../services/post_service";
import { toast } from "react-toastify";
import Post from "./../components/Post";

const Categories = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    pageNumber: "",
    pageSize: "",
    totalPages: "",
    totalElements: "",
    lastPage: false,
  });

  const { categoryId } = useParams();

  useEffect(() => {
    // console.log(categoryId);
    loadPostByCategory(0, (postContent.pageSize = 5), categoryId)
      .then((data) => {
        // console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post !!");
      });
  }, [categoryId]);

  // Method required for Pagination..
  const changePage = (pageNumber = 0, pageSize = 5) => {
    // Conditional logic for pagination..
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }

    loadPostByCategory(pageNumber, pageSize, categoryId)
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
        setPostContent({ ...postContent, content: newPostContents });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post can not be deleted !!");
      });
  };

  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="mt-5">
            <CategoryMenu />
          </Col>
          <Col md={10}>
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
    </Base>
  );
};

export default Categories;
