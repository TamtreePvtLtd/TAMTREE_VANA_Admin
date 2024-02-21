import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./layout/Layout";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Category from "./pages/Category";
import { theme } from "./theme.ts/Theme";
import { paths } from "./routes/path";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import OrdersDetails from "./pages/OrderDetails";
import Login from "./login/Login";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./common/PrivateRoute";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

      <ThemeProvider theme={theme}>
        <Toaster/>
        <BrowserRouter>
          <Routes>
          <Route path={paths.LOGIN} element={<Login />} />
              <Route path={paths.ROOT} element={<Layout />}>
              <Route
                  index
                  path={paths.ORDER}
                  element={
                    <PrivateRoute>
                      <Order />
                    </PrivateRoute>
                  }
                />
                   <Route
                  path={paths.PRODUCT}
                  element={
                    <PrivateRoute>
                      <Product />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={paths.CATEGORY}
                  element={
                    <PrivateRoute>
                      <Category />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={`${paths.ORDERSDETAILS}/:id`}
                  element={
                    <PrivateRoute>
                      <OrdersDetails />
                    </PrivateRoute>
                  }
                />
            </Route>
          </Routes>
          </BrowserRouter>
      </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
