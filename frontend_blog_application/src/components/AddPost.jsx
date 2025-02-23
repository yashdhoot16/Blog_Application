import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost, uploadPostImage } from "./../services/post_service";
import { getCurrentUserDetail } from "../auth";
import { Navigate } from "react-router-dom";

const AddPost = () => {
  const editor = useRef(null);
  // const [content, setContent] = useState("");

  const [post, setPost] = useState({
    postTitle: "",
    postContent: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  const [user, setUser] = useState(undefined);

  const [image, setImage] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        // console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Field changed function
  const fieldChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  // Content field change function
  const contentFieldChange = (data) => {
    setPost({ ...post, postContent: data });
  };

  //Reset all data..
  const resetData = () => {
    setPost({
      postTitle: "",
      postContent: "",
      categoryId: "",
    });
  };

  // Create Post Function..(Submitting form)
  const submitForm = (event) => {
    event.preventDefault();

    //This is for test only to print the post data in console..
    // console.log(post);

    if (post.postTitle.trim() === "") {
      // toast.error("post title can not be empty..")
      toast.error("Post title is required !!");
      return;
    }
    if (post.postContent.trim() === "") {
      // toast.error("post title can not be empty..")
      toast.error("Post content is required !!");
      return;
    }
    if (post.categoryId.trim() === "") {
      // toast.error("post title can not be empty..")
      toast.error("Select any one category !!");
      return;
    }

    //Submit the form..
    post["userId"] = user.id;
    createPost(post)
      .then((data) => {
        //upload image
        uploadPostImage(image, data.postId)
          .then((data) => {
            toast.success("Image uploaded !!");
          })
          .catch((error) => {
            toast.error("Error in uploading image !!");
            console.log(error);
          });

        toast.success("Post Created !!");
        // console.log(post);
        resetData(); // reset the data..
        // Navigate("/");
      })
      .catch((error) => {
        toast.error("Something went wrong !!");
        // console.log(error);
      });
  };

  // Handling file upload and change event..
  const handleFileChange = (event) => {
    // setImage(event.target.files[0]);
    const file = event.target.files[0]; // Get the selected file

    // Uploading image validation
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];

      if (!validImageTypes.includes(file.type)) {
        toast.error(
          "Invalid file type! Please select an image (JPG, JPEG, PNG, GIF)."
        );
        event.target.value = ""; // Reset input field
        return;
      }

      setImage(file); // Set the file if valid
      // console.log(event.target.files[0]);
    }
  };

  return (
    <Row className="mt-5">
      <Col sm={{ size: 10, offset: 1 }}>
        <Card className="shadow">
          <CardHeader>
            <h3 className="text-center">Create Post</h3>
          </CardHeader>
          <CardBody>
            {/* {JSON.stringify(post)} */}
            <Form onSubmit={submitForm}>
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
                  onChange={fieldChange}
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
                  onChange={contentFieldChange}
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
                  onChange={handleFileChange}
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
                  value={post.categoryId || ""}
                  onChange={fieldChange}
                  size="sm"
                >
                  <option disabled value="">
                    Select Category
                  </option>
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
                  Create post
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
  );
};

export default AddPost;
