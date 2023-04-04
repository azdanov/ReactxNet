import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

import logoImage from "../../assets/logo-without-background.png";

function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted size="large">
          <Image
            src={logoImage}
            alt="logo"
            style={{ marginRight: 15, width: "1.5em" }}
          />
          ReactxNet
        </Header>
        <Header inverted style={{ marginTop: 30 }}>
          Your friendly activities app
          <Header.Subheader>Have a look around</Header.Subheader>
        </Header>
        <Button
          as={Link}
          to="/activities"
          style={{ marginTop: 20 }}
          size="large"
        >
          Go to activities!
          <Icon name="arrow right" />
        </Button>
      </Container>
    </Segment>
  );
}

export default HomePage;
