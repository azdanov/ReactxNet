import { createBrowserRouter } from "react-router-dom";

import App from "../app";
import ActivityDashboard from "../features/activities/dashboard/activity-dashboard";
import ActivityDetails from "../features/activities/details/activity-details";
import ActivityForm from "../features/activities/form/activity-form";
import NotFound from "../features/errors/not-found";
import TestErrors from "../features/errors/test-errors";
import HomePage from "../features/home/home-page";
import ProfilePage from "../features/profiles/profile-page";
import RequireAuth from "./require-auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "activities",
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
            path: "profiles",
            children: [
              {
                path: ":username",
                element: <ProfilePage />,
              },
            ],
          },
        ],
      },
      {
        path: "errors",
        children: [
          {
            path: "",
            element: <TestErrors />,
          },
        ],
      },
      {
        path: "*",
        children: [
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
