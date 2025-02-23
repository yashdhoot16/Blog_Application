import React, { useEffect, useState, useRef } from "react";
import Base from "../components/Base";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUserDetail } from "../auth";
import {
  getPostById,
  updatePostByPostId,
  uploadPostImage,
} from "../services/post_service";
import { loadAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const UpdateBlog = () => {
  const { postId } = useParams();

  const editor = useRef(null);

  const [categories, setCategories] = useState([]);

  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({});

  const [image, setImage] = useState(null);

  const object = getCurrentUserDetail();
  // console.log(object.id);

  const navigate = useNavigate();

  useEffect(() => {
    //Load all categories..
    loadAllCategories()
      .then((data) => {
        // console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //Load post from database by postId..
    getPostById(postId)
      .then((data) => {
        // console.log(data);
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post !!");
        navigate("/");
      });
  }, []);

  useEffect(() => {
    // Accessing user_id from post and user_id from current logged in user data..
    if (post && post.user && object) {
      if (post.user.id !== object.id) {
        toast.warning("You cannot edit this post !!");
        navigate("/");
      }
    }
  }, [post]);

  //Reset all data..
  const resetData = () => {
    setPost({
      postTitle: "",
      postContent: "",
      categoryId: "",
    });
  };

  //Updating form data..
  const updateForm = (event) => {
    event.preventDefault();
    console.log(post);

    //Update post method from post-service
    updatePostByPostId(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((data) => {
        console.log(data);
        toast.success("Post updated !!");

        //Resetting data
        resetData();

        //Navigate 
        navigate("/user/dashboard")
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post cannot be updated !!");
      });
  };

  //Handle change two way data binding...
  const handleChange = (event, property) => {
    setPost({ ...post, [property]: event.target.value });
  };

  return (
    <Base>
      <Container>
        {/* {JSON.stringify(post)} */}
        <Row className="mt-5">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card>
              <CardHeader className="text-center">
                <h3>Update Post</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={updateForm}>
                  {/* Post Title */}
                  <FormGroup>
                    <Label style={{ marginBottom: "-0.1rem" }} for="title">
                      <h6>Post title</h6>
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Enter title"
                      name="postTitle"
                      value={post.postTitle} // Bind state
                      onChange={(event) => handleChange(event, "postTitle")}
                      size="sm"
                    />
                  </FormGroup>

                  {/* Post Content */}
                  <FormGroup>
                    <Label style={{ marginBottom: "-0.1rem" }} for="content">
                      <h6>Post Content</h6>
                    </Label>
                    <JoditEditor
                      ref={editor}
                      value={post.postContent}
                      onChange={(newContent) =>
                        setPost({ ...post, postContent: newContent })
                      }
                      size="sm"
                    />
                  </FormGroup>

                  {/* Image uploading */}
                  <div className="">
                    <Label style={{ marginBottom: "-0.1rem" }} for="image">
                      <h6>Post Image</h6>
                    </Label>
                    <Input
                      size="sm"
                      type="file"
                      id="image"
                      // onChange={handleFileChange}
                    ></Input>
                  </div>

                  {/* Post Categoty.. */}
                  <FormGroup className="mt-2">
                    <Label style={{ marginBottom: "-0.1rem" }} for="category">
                      <h6>Post category</h6>
                    </Label>
                    <Input
                      type="select"
                      id="category"
                      name="categoryId"
                      value={post.categoryId}
                      defaultValue={0}
                      onChange={(event) => handleChange(event, "categoryId")}
                      size="sm"
                    >
                      <option disabled value="">Select Category</option>
                      {categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.categoryTitle}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button
                      type="submit"
                      color="primary"
                      className="shadow"
                      size="sm"
                    >
                      Update post
                    </Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      className="ms-2 shadow"
                      size="sm"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default UpdateBlog;
