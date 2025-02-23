import React, { useEffect, useState } from "react";
import Base from "./../../components/Base";
import AddPost from "../../components/AddPost";
import {
  Col,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import {
  deletePostByPostId,
  loadPostsByUserId,
} from "../../services/post_service";
import Post from "../../components/Post";
import { toast } from "react-toastify";
const Userdashboard = () => {
  const [user, setUser] = useState({});

  const [posts, setPosts] = useState({
    content: [],
    pageNumber: "",
    pageSize: "",
    totalPages: "",
    totalElements: "",
    lastPage: false,
  });

  useEffect(() => {
    // console.log(getCurrentUserDetail());

    setUser(getCurrentUserDetail());

    loadPostsByUserId(0, (posts.pageSize = 5), getCurrentUserDetail().id)
      .then((data) => {
        // console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Method required for Pagination..
  const changePage = (pageNumber = 0, pageSize = 5) => {
    // Conditional logic for pagination..
    if (pageNumber > posts.pageNumber && posts.lastPage) {
      return;
    }
    if (pageNumber < posts.pageNumber && posts.pageNumber === 0) {
      return;
    }

    loadPostsByUserId(pageNumber, pageSize, getCurrentUserDetail().id)
      .then((data) => {
        setPosts(data);
        console.log(data);
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
        console.log(data);
        toast.success("Post deleted !!");

        //Loading data after post is deleted..
        let newPostContents = posts.content.filter(
          (p) => p.postId !== post.postId
        );
        setPosts({ ...posts, content: newPostContents });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post can not be deleted !!");
      });
  };

  return (
    <Base>
      <Container>
        <AddPost />
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <h3 className="text-center mt-4">
              My Blogs : {posts ? posts.totalElements : 0}
            </h3>

            {posts.content?.map((post) => (
              <Post key={post.postId} post={post} deletePost={deletePost} /> // This deletePost={} we pass as a function in Post.jsx
            ))}

            <Container className="mt-3">
              <Pagination size="sm">
                <PaginationItem
                  onClick={() => changePage(posts.pageNumber - 1)}
                  disabled={posts.pageNumber === 0}
                >
                  <PaginationLink previous>Previous</PaginationLink>
                </PaginationItem>
                {[...Array(posts.totalPages)].map((item, index) => (
                  <PaginationItem
                    active={index === posts.pageNumber}
                    key={index}
                    onClick={() => changePage(index)}
                  >
                    <PaginationLink>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem
                  onClick={() => changePage(posts.pageNumber + 1)}
                  disabled={posts.lastPage}
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

export default Userdashboard;
