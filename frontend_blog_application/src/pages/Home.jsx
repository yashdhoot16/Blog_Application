import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import CategoryMenu from "./../components/CategoryMenu";
import NewFeed from "./../components/NewFeed";

const Home = () => {
  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="mt-5">
            <CategoryMenu />
          </Col>
          <Col md={10}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
