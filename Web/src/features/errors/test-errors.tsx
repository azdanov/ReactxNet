import { useState } from "react";
import { toast } from "react-toastify";
import { Header, Menu, Segment } from "semantic-ui-react";

import client from "../../api/client";
import ValidationErrors from "./validation-errors";

function TestErrors() {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  function handleValidationError() {
    client
      .post({}, `/api/activities`)
      .badRequest((error) => {
        setErrors(error.json.errors);
        toast.error("Validation error");
      })
      .res(console.log);
  }

  return (
    <>
      <Segment>
        <Header as="h1" content="Test Errors" />
        <Menu fluid widths="6">
          <Menu.Item name="not-found" onClick={handleNotFound}>
            Not Found
          </Menu.Item>
          <Menu.Item name="bad-request" onClick={handleBadRequest}>
            Bad Request
          </Menu.Item>
          <Menu.Item name="validation-error" onClick={handleValidationError}>
            Validation Error
          </Menu.Item>
          <Menu.Item name="server-error" onClick={handleServerError}>
            Server Error
          </Menu.Item>
          <Menu.Item name="unauthorized" onClick={handleUnauthorised}>
            Unauthorized
          </Menu.Item>
          <Menu.Item name="bad-guid" onClick={handleBadGuid}>
            Bad Guid
          </Menu.Item>
        </Menu>
      </Segment>
      <ValidationErrors errors={errors} />
    </>
  );
}

function handleNotFound() {
  client
    .get(`/api/errors/not-found`)
    .notFound((error) => toast.error(`Not Found: ${error.message}`))
    .res(console.log);
}

function handleBadRequest() {
  client
    .get(`/api/errors/bad-request`)
    .badRequest((error) => toast.error(`Bad Request: ${error.message}`))
    .res(console.log);
}

function handleServerError() {
  client
    .get(`/api/errors/server-error`)
    .internalError((error) => {
      toast.error(
        `Server Error: ${
          (JSON.parse(error.message) as { title: string }).title
        }`
      );
    })
    .res(console.log);
}

function handleUnauthorised() {
  client
    .get(`/api/errors/unauthorised`)
    .unauthorized((error) => toast.error(`Unauthorised: ${error.message}`))
    .res(console.log);
}

function handleBadGuid() {
  client
    .get(`/api/activities/123-123-123-123`)
    .badRequest((error) => toast.error(`Bad Guid: ${error.message}`))
    .res(console.log);
}

export default TestErrors;
