import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./stored/store";
import { queryClient } from "./libs/blog";

// import Blog from "./pages/Blog";
// import BlogNew from "./pages/BlogNew";
// import BlogDetail from "./pages/BlogDetail";

const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const BlogNew = lazy(() => import("./pages/BlogNew"));
const Blog = lazy(() => import("./pages/Blog"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: (meta) => import("./libs/blog").then((module) => module.action(meta)),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: ":blogId",
        loader: (meta) => import("./libs/blog").then((module) => module.loader(meta)),
        element: (
          <Suspense>
            <BlogDetail />
          </Suspense>
        ),
      },
      {
        path: "new",
        element: (
          <Suspense>
            <BlogNew />
          </Suspense>
        ),
      },
      {
        path: "edit",
        element: null,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}
