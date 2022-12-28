import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from "./pages/PaymentPage";
import ProductDetails from "./pages/ProductDetails";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
