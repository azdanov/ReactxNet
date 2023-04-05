import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" size="mini" />
        We're sorry, we couldn't find what you're looking for.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to Activities page
        </Button>
      </Segment.Inline>
    </Segment>
  );
}

export default NotFound;
