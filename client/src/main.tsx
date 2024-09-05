import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AllEssays } from "./routes/AllEssays";
import { EssayPage } from "./routes/EssayPage";
import { EssayCorrectionPage } from "./routes/EssayCorrectionPage";
import { WriteEssay } from "./routes/WriteEssay";

import "./index.css";
import { fetcher } from "./api";
import { RouteWrapper } from "./components/RouteWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteWrapper>
        <AllEssays />
      </RouteWrapper>
    ),
    loader: () => fetcher("/Essay"),
  },
  {
    path: "/essays/:id",
    element: (
      <RouteWrapper>
        <EssayPage />
      </RouteWrapper>
    ),
    loader: ({ params }) => fetcher(`/Essay/${params.id}`),
  },
  {
    path: "/essays/:id/correction",
    element: (
      <RouteWrapper>
        <EssayCorrectionPage />
      </RouteWrapper>
    ),
    loader: ({ params }) => fetcher(`/Essay/${params.id}`),
  },
  {
    path: "/write",
    element: (
      <RouteWrapper>
        <WriteEssay />
      </RouteWrapper>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
