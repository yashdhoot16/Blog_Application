import { useState } from "react";
import { signUp } from "../services/user-service";
import Base from "../components/Base";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const [validations, setValidations] = useState({
    name: false,
    email: false,
    password: false,
    about: false,
  });

  //Handle Change
  const handleChange = (event, property) => {
    //Dynamically setting the values..
    const { value } = event.target; // Extract value correctly
    setData({ ...data, [property]: event.target.value });

    // Validate fields dynamically
    switch (property) {
      case "name":
        setValidations((prev) => ({
          ...prev,
          name: value.length >= 4,
        }));
        break;
      case "email":
        setValidations((prev) => ({
          ...prev,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        }));
        break;
      case "password":
        setValidations((prev) => ({
          ...prev,
          password: value.length >= 6 && value.length <= 10,
        }));
        break;
      case "about":
        setValidations((prev) => ({
          ...prev,
          about: value.trim().length > 15 && value.length <= 200,
        }));
        break;
      default:
        break;
    }
  };

  // Reset form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
    setValidations({
      name: false,
      email: false,
      password: false,
      about: false,
    });

    setError({
      errors: {},
      isError: false,
    });
  };

  //Submit form
  const submitForm = (event) => {
    event.preventDefault();

    // This is client side validation
    // if(error.isError){
    // 	toast.error("Form data is invalid !!")

    // 	return;
    // }

    console.log(data);

    //data validation

    //call server api for sending data..
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("Registration Successfull !!");
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error log");
        toast.error("Email is already Registered !!");

        // Handling errors
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container>
        {/* {JSON.stringify(data)} */}
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card className="shadow" outline>
              <CardHeader className="text-center">
                <h3>Register</h3>
              </CardHeader>
              <CardBody>
                {/* Creating form */}
                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label style={{ marginBottom: "-0.1rem" }} form="name">
                      <h6>Name</h6>
                    </Label>
                    <Input
                      size="sm"
                      type="text"
                      id="name"
                      placeholder="Enter name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                      valid={validations.name}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  {/* Email field */}
                  <FormGroup>
                    <Label style={{ marginBottom: "-0.1rem" }} form="email">
                      <h6>Email</h6>
                    </Label>
                    <Input
                      size="sm"
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                      valid={validations.email}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  {/* Password field */}
                  <FormGroup>
                    <Label style={{ marginBottom: "-0.1rem" }} form="password">
                      <h6>Password</h6>
                    </Label>
                    <Input
                      size="sm"
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                      valid={validations.password}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  {/* About field */}
                  <FormGroup>
                    <Label style={{ marginBottom: "-0.1rem" }} form="about">
                      <h6>About</h6>
                    </Label>
                    <Input
                      size="sm"
                      type="textarea"
                      id="about"
                      placeholder="Write something here.."
                      style={{ height: "150px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                      valid={validations.about}
                    ></Input>
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="primary" className="shadow" size="sm">
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      type="reset"
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

export default Signup;
