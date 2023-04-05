import { Fragment } from "react";
import { Message } from "semantic-ui-react";

interface Props {
  errors: { [key: string]: string[] };
}

function ValidationErrors({ errors }: Props) {
  return Object.keys(errors).length === 0 ? (
    <></>
  ) : (
    <Message error>
      <Message.Header>
        There were some errors with your submission
      </Message.Header>
      <Message.List>
        {Object.entries(errors).map(([error, messages]) => (
          <Fragment key={error}>
            <Message.Header>{error}</Message.Header>
            {messages.map((message) => (
              <Message.Item key={message}>{message}</Message.Item>
            ))}
          </Fragment>
        ))}
      </Message.List>
    </Message>
  );
}

export default ValidationErrors;
