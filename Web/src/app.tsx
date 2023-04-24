import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";

import ModalContainer from "./common/modals/modal-container";
import Loading from "./layout/loading";
import Navbar from "./layout/navbar";
import { useStore } from "./stores/store";

function App() {
  const [loading, setLoading] = useState(true);
  const { userStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    if (userStore.user) {
      userStore
        .getUser(controller)
        .catch(() => userStore.logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => controller.abort();
  }, [userStore]);

  if (loading) return <Loading />;

  return (
    <>
      {location.pathname === "/" ? (
        <Outlet />
      ) : (
        <>
          <Navbar />
          <Container>
            <Outlet />
          </Container>
        </>
      )}
      <ScrollRestoration />
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    </>
  );
}

export default App;
