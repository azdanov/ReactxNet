import { createBrowserRouter } from "react-router-dom";

import ActivityDashboard from "../features/activities/activity-dashboard";
import ActivityDetails from "../features/activities/activity-details";
import ActivityForm from "../features/activities/activity-form";
import HomePage from "../features/home/home-page";
import App from "../layout/app";
import AppMin from "../layout/app-min";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppMin />,
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
]);
