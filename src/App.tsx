import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <ThemeProvider theme={theme}>
        <Router>
          <Layout />
          <Routes>
            <Route path={paths.ROOT} element={<Layout />}>
              <Route index path={paths.LOGIN} element={<Login />} />
              <Route index path={paths.PRODUCT} element={<Product />} />
              <Route path={paths.ORDER} element={<Order />} />
              <Route path={paths.CATEGORY} element={<Category />} />
              <Route
                path={`${paths.ORDERSDETAILS}/:id`}
                element={<OrdersDetails />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
