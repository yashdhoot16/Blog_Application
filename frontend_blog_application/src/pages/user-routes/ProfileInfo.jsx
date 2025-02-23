import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { getCurrentUserDetail } from "../../auth";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../services/user-service";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from "reactstrap";

const ProfileInfo = () => {
  let object = getCurrentUserDetail();
  // console.log(object);

  const { id } = useParams();
  // console.log(id);

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserDetails(id)
      .then((data) => {
        // console.log(data);
        setUser({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Base>
      { user ? 
        <Container>
          <Row className="mt-5">
            <Col md={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader className="text-center">
                  <h3>User Details</h3>
                </CardHeader>
                <CardBody>
                  <Container className="text-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaJS0dnDYQ5NkVr30LWhCjQoMLtm6BC0TDA&s"
                      alt=""
                      style={{ borderRadius: "120px", width: "100px" }}
                    />
                  </Container>

                  {/* Table for user details */}

                  <Table hover striped responsive borderless className="mt-2">
                    <tbody>
                      <tr>
                        <th scope="row">User Id</th>
                        <td>{user.id}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name</th>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">About</th>
                        <td><p>{user.about}</p></td>
                      </tr>
                      <tr>
                        <th scope="row">Role</th>
                        <td>
                          {user?.roles?.length > 0 ? (
                            user.roles.map((role) => (
                              <span key={role.roleId}> {role.roleName}</span>
                            ))
                          ) : (
                            <div>No roles assigned</div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        : 'No data found !!'
      }
    </Base>
  );
};

export default ProfileInfo;
