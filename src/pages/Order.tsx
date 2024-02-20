import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import OrderCard from "../common/OrderCard";
import { orders } from "../seed/seed";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Loader from "../common/Loader";
import { useGetAllCategory} from "../customHooksRQ/Category";


function Order() {
  const [sno, setSno] = useState<number | null>(null);
  const [orderedDate, setOrderedDate] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLoading, isFetching } = useGetAllCategory();

  
  const handleClearFilter = () => {
    setSno(null);
    setOrderedDate(null);
    setOrderNumber(null);
  };

  return (
    
    <Container>
      <Box
      display="flex"
      flexDirection="column"             
      marginBottom={2}
            >
     <Box>
                <Typography variant="h6" marginY={2}>Orders</Typography>
              </Box>
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          gap: 3,
          paddingBottom: 4,
        }}
      >
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
        {/* <Grid container justifyContent="center"> Centering the Grid */}
        {isLoading || isFetching ? (
          <Loader />
        ) : (
        orders.length > 0 ? (
          <Grid item xs={12} md={12} lg={12}>
            {/* Adjust width based on your requirement */}
            <OrderCard orders={orders} />
          </Grid>
        ) : (
          <Typography sx={{ fontSize: 30 }}>No orders found</Typography>
          )
        )}
      </Box>
        </Container>
 
  );
}

export default Order;
