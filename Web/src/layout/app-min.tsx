import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";

function AppMin() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(AppMin);
