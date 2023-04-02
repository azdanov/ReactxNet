import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Navbar from "./navbar";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
