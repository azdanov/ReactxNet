import "react-toastify/dist/ReactToastify.css";

import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";

import Navbar from "./navbar";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    </>
  );
}

export default observer(App);
