import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

function HomePage() {
  return (
    <Container style={{ marginTop: "3rem" }}>
      <Header size="huge">Home Page</Header>
      <Link to={"/activities"}>Activities</Link>
    </Container>
  );
}

export default HomePage;
