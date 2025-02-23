// import App from "../App";
import { Card, Col, Container, Row } from "reactstrap";
import Base from "./../components/Base";

const About = () => {
  return (
    <Base>
      <Container>
        <Row className="mt-5">
          <Col md={{ size: 8, offset: 2 }}>
            <Card
              className="background-transparent p-5"
              style={{
                textAlign: "justify",
                borderColor: "black",
                background: "transparent",
              }}
            >
              <p style={{ fontFamily: "sans-serif" }}>
                <i>
                  "Welcome to <b>MyBlogs</b>, a platform dedicated to [primary
                  topic] for [target audience description]. <b>Mr.Yash Dhoot</b>
                  , a passionate Bloger and writer, created this blog to
                  [explain the purpose, e.g., "share insights," "provide
                  practical advice," "spark conversation"] on [key topics]. We
                  strive to deliver well-researched content with a [distinctive
                  style, e.g., "engaging," "accessible"] approach, so you can
                  [benefit to the reader, e.g., "stay informed," "make informed
                  decisions," "gain new perspectives"]. Join us on this journey
                  to explore the world of [topic]!"
                </i>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default About;
