import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { IOrder } from "../interface/type";
import { IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate } from "react-router";
import { paths } from "../routes/path";


export interface IProps{
  orders: IOrder[];
}

const OrderCard = ({ orders }: IProps) => {

  const navigate = useNavigate();
  
  const handleOrderRedirect = (orderId: string) => {
    navigate(`${paths.ORDERSDETAILS}/${orderId}`);
  }

  return (
     <Box>
      <TableContainer
                  elevation={0}
                  sx={{
                    boxShadow: 3,
                    width: "100%",
                    maxWidth: "none",
                  }}
                  component={Paper}
      >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Order Number</TableCell>
            <TableCell>Order DateAndTime</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id} >
              <TableCell>{order.Sno}</TableCell>
              <TableCell>{order.OrderNumber}</TableCell>
              <TableCell>{order.OrderDateAndTime && dayjs(new Date(order.OrderDateAndTime)).format("DD-MM-YYYY")}</TableCell>
              <TableCell>
              <IconButton onClick={() => order._id && handleOrderRedirect(order._id)}>
 <RemoveRedEyeOutlinedIcon /> </IconButton></TableCell>
            </TableRow>
          ))}
          </TableBody>
          </Table>
      </TableContainer>
   </Box>
  );
};

export default OrderCard;
