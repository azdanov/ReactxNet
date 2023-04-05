import { createBrowserRouter } from "react-router-dom";

import ActivityDashboard from "../features/activities/dashboard/activity-dashboard";
import ActivityDetails from "../features/activities/details/activity-details";
import ActivityForm from "../features/activities/form/activity-form";
import NotFound from "../features/errors/not-found";
import TestErrors from "../features/errors/test-errors";
import HomePage from "../features/home/home-page";
import App from "../layout/app";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/activities",
    element: <App />,
    children: [
      {
        path: "",
        element: <ActivityDashboard />,
      },
      {
        path: ":id",
        element: <ActivityDetails />,
      },
      {
        path: "create",
        element: <ActivityForm key="create" />,
      },
      {
        path: "edit/:id",
        element: <ActivityForm key="edit" />,
      },
    ],
  },
  {
    path: "/errors",
    element: <App />,
    children: [
      {
        path: "",
        element: <TestErrors />,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
