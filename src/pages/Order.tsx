import { Box, Button, Grid, Typography } from "@mui/material";
import { paths } from "../routes/path";
import { useNavigate } from "react-router";
import { useState } from "react";
import OrderCard from "../common/OrderCard";
import { orders } from "../seed/seed";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Order() {
  const [orderedDate, setOrderedDate] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClearFilter = () => {
    setOrderedDate(null);
    setOrderNumber(null);
  };

  return (
    <>
      <Typography
        sx={{ fontSize: 30 }}
        color="textPrimary"
        gutterBottom
        component="div"
      >
        Orders
      </Typography>
      <Box sx={{ maxWidth: "60%", display: "flex", gap: 3, paddingBottom: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker format="DD-MM-YYYY" />
        </LocalizationProvider>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="contained">Search</Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="outlined" onClick={handleClearFilter}>
            Clear Search
          </Button>
        </Box>
      </Box>
      <Grid container columnGap={4} rowGap={4}>
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <Grid item xs={12} md={3} lg={2} key={index}>
              <Box
                onClick={() => navigate(`${paths.ORDERSDETAILS}/${item._id}`)}
              >
                <OrderCard
                  orderNumber={item.orderNumber}
                  orderDateAndTime={item.orderDateAndTime}
                />
              </Box>
            </Grid>
          ))
        ) : (
          <Typography sx={{ fontSize: 30 }}>No orders found</Typography>
        )}
      </Grid>
    </>
  );
}

export default Order;
