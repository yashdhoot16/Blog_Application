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
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  //Handle Change
  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const resetLoginDetail = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  //Submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(loginDetail);

    //Data validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("username or password is required !!");
      return;
    }

    //call server api for sending data..
    //Submit the data to server to generate the token
    login(loginDetail)
      .then((data) => {
        // console.log(data);

        // Saving data to localstorage..
        doLogin(data, () => {
          // console.log("Details saved to localstorage..!!");

          // Redirect to user dashboard page..
          navigate("/user/dashboard");
        });

        toast.success("Login Successfull !!");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error occured ! Something went wrong !!");
        }
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card className="shadow " outline>
              <CardHeader className="text-center">
                <h3>Login</h3>
              </CardHeader>
              <CardBody>
                {/* Creating form */}
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label style={{marginBottom:'-0.1rem'}} form="email"><h6>Email</h6></Label>
                    <Input
                      className=""
                      size="sm"
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label style={{marginBottom:'-0.1rem'}} form="password"><h6>Password</h6></Label>
                    <Input
                      size="sm"
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    ></Input>
                  </FormGroup>
                  <Container className="text-center mt-4">
                    <Button color="primary" className="shadow" size="sm">
                      Login
                    </Button>
                    <Button
                      onClick={resetLoginDetail}
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

export default Login;
