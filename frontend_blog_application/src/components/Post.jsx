import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, Container } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const Post = ({
  post = {
    id: -1,
    postTitle: "This is default post title",
    postContent: "This is default post content",
  },
  updatePost, // Sending as props so that wherever we call <Post /> we can user this updatePost onClick method and pass actual service method to update post as argument.
  deletePost, // Sending as props so that wherever we call <Post /> we can user this deletePost onClick method and pass actual service method to delet post as argument.
}) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);

  return (
    <Card className="shadow mt-3">
      <CardBody>
        <h4>{post.postTitle}</h4>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.postContent.substring(0, 100) + "......",
          }}
        ></CardText>
        <Container className="text-end">
          <div>
            {/* Read more button */}
            <Link
              className="btn btn-secondary btn-sm shadow"
              to={"/posts/" + post.postId}
            >
              Read More
            </Link>
            {/* Delete button */}
            {isLoggedIn &&
              (user && user.id == post.user.id ? (
                <Button
                  color="danger"
                  className="ms-2 shadow"
                  size="sm"
                  onClick={() => deletePost(post)}
                >
                  Delete
                </Button>
              ) : (
                " "
              ))}
            {/* Update button */}
            {isLoggedIn &&
              (user && user.id == post.user.id ? (
                <Button
                  color="primary"
                  className="ms-2 shadow"
                  size="sm"
                  tag={Link}
                  to={`/user/update-blog/${post.postId}`}
                >
                  Update
                </Button>
              ) : (
                " "
              ))}
          </div>
        </Container>
      </CardBody>
    </Card>
  );
};

export default Post;
