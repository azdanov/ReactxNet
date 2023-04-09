import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

import logoImage from "../../assets/logo-without-background.png";
import { useStore } from "../../stores/store";
import LoginForm from "../accounts/login-form";
import RegisterForm from "../accounts/register-form";

function HomePage() {
  const { userStore, modalStore } = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted size="large">
          <Image
            src={logoImage}
            alt="logo"
            style={{ marginRight: 15, height: 96, width: 96 }}
          />
          ReactxNet
        </Header>
        <Header inverted style={{ marginTop: 30 }}>
          Your friendly activities app
          <Header.Subheader>Have a look around</Header.Subheader>
        </Header>
        {userStore.isLoggedIn ? (
          <Button as={Link} to="/activities" size="large" inverted>
            Go to activities
          </Button>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="large"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="large"
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
}

export default observer(HomePage);
