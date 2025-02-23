import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getPostById } from "../services/post_service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import {
  createComment,
  deleteCommentService,
} from "../services/comment-service";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [login, setLogin] = useState(null);

  const [user, setUser] = useState(null);
  const [comment, setComment] = useState({
    comment: "",
  });

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
    // Load post by postId
    getPostById(postId)
      .then((data) => {
        // console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post !!");
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };

  const submitCommentOnPost = () => {
    if (!isLoggedIn()) {
      toast.error("Please login !!");
    }

    if (comment.comment === "") {
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        // console.log(data);
        toast.success("Comment created !!");
        setPost({
          ...post,
          comments: [...post.comments, data],
        });
        setComment({
          comment: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to delete the comment...
  const deleteComment = (comment) => {
    // console.log("Received comment object:", comment); // Debugging log
    if (!comment || !comment.commentId) {
      toast.error("Invalid comment ID!");
      return;
    }

    // console.log("Deleting comment with ID:", comment.commentId); // Debugging log
    //Method from comment-service.js to delete the comment by commentId
    deleteCommentService(comment.commentId)
      .then((data) => {
        // console.log(data);
        toast.success("Comment deleted !!");

        //Loading data after comment is deleted..
        // Correctly filtering out the deleted comment from post.comments
        let updatedComments = post.comments.filter(
          (c) => c.commentId !== comment.commentId
        );

        setPost({ ...post, comments: updatedComments }); // Update the post state
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post can not be deleted !!");
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Row>
          <Col
            md={{
              size: 10,
              offset: 1,
            }}
          >
            <Link style={{ color: "black" }} to="/">
              Home
            </Link>{" "}
            / <u>{post?.postTitle}</u>
            <Card className="mt-2 shadow ps-2 pe-2 pt-2">
              {post && (
                <CardBody>
                  <CardText>
                    <h3> {post.postTitle}</h3>
                  </CardText>
                  <div
                    className="image-container mt-3"
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/api/post/image/" + post.imageName}
                      alt=""
                    />
                  </div>
                  <CardText
                    dangerouslySetInnerHTML={{ __html: post.postContent }}
                    className="mt-3"
                  ></CardText>
                  <div className="d-flex justify-content-between mt-4">
                    <CardText className="text-start text-muted">
                      <small>
                        <i> Category: {post.category.categoryTitle}</i>
                      </small>
                    </CardText>
                    <CardText className="text-end text-muted">
                      <small>
                        <i>
                          Posted by <b>{post.user.name} </b> on{" "}
                          {printDate(post.postDate)}
                        </i>
                      </small>
                    </CardText>
                  </div>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 ps-3 pe-3">
          <Col
            md={{
              size: 10,
              offset: 1,
            }}
          >
            <h4>Comments ({post ? post.comments.length : 0})</h4>
            {post &&
              post.comments.map((c, index) => (
                <Card className="my-1" key={index}>
                  <CardBody className="d-flex justify-content-between align-items-center">
                    {/* {console.log(c.comment)} */}

                    <small>{c.comment}</small>

                    {isLoggedIn &&
                      (user && user.id === post.user.id ? (
                        <Button
                          color="danger"
                          className="ms-2 shadow"
                          size="sm"
                          onClick={() => deleteComment(c)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      ) : (
                        ""
                      ))}
                  </CardBody>
                </Card>
              ))}
            <Card className="mt-3">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Comment here.."
                  value={comment.comment}
                  onChange={(event) =>
                    setComment({ comment: event.target.value })
                  }
                ></Input>
                <Button
                  onClick={submitCommentOnPost}
                  color="primary"
                  className="mt-2"
                  size="sm"
                >
                  Comment
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
