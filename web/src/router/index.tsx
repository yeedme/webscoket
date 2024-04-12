import React from "react";
import { Skeleton } from "antd";
import { Suspense } from "react";
import { BrowserRouter as Router, RouteObject, useRoutes } from "react-router-dom";
import Control from "../pages";

const newRouter: RouteObject[] = [
  {
    path: "/",
    element: <Control />,
    children: []
  }
];

function RouterElements() {
  const elements = useRoutes(newRouter);
  return <>{elements}</>;
}

function LazyRouterElements() {
  return (
    <Router>
      <Suspense fallback={<Skeleton />}>
        <RouterElements />
      </Suspense>
    </Router>
  );
}

export default LazyRouterElements;