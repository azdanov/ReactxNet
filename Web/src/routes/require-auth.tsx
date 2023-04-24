﻿import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useStore } from "../stores/store";

function RequireAuth() {
  const { userStore } = useStore();
  const location = useLocation();

  if (!userStore.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}

export default RequireAuth;
