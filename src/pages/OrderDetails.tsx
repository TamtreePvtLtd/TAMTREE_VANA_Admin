import {
  Box,
  Button,
  Container,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router";
import { paths } from "../routes/path";

function OrdersDetails() {
  const navigate = useNavigate();
  const isAddressCopied = false;
  const isLoading = false;

  const copyAddressToClipboard = () => {};

  return (
    <>
      {isLoading != null && !isLoading && (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom component="div">
                <IconButton>
                  <ArrowBackIcon
                    sx={{}}
                    onClick={() => navigate(paths.ORDER)}
                  />
                </IconButton>
                Order Details
              </Typography>
            </Grid>

            <>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }} mb={1}>
                  <Typography variant="h6" component="div" fontWeight="600">
                    Delivery Address
                    <Tooltip
                      title={isAddressCopied ? "Copied!" : "Copy Address"}
                      arrow
                    >
                      <ContentCopyIcon
                        sx={{ marginLeft: "20px", cursor: "pointer" }}
                        onClick={copyAddressToClipboard}
                      />
                    </Tooltip>
                  </Typography>
                </Box>

                <Typography variant="subtitle1">
                  <Typography component={"span"} sx={{ fontWeight: "600" }}>
                    Name: &nbsp;
                  </Typography>
                  dfgh
                </Typography>
                <Typography variant="subtitle1">
                  <Box sx={{ fontWeight: "600" }}>Address:</Box>
                </Typography>
                <Typography variant="subtitle1">
                  <Typography style={{ fontWeight: "600" }} component={"span"}>
                    Phone Number:&nbsp;
                  </Typography>
                  23456789
                </Typography>
                <Typography variant="subtitle1">
                  <Typography style={{ fontWeight: "600" }} component={"span"}>
                    Order Number:&nbsp;
                  </Typography>
                  345678
                </Typography>

                <Typography variant="subtitle1">
                  <Typography style={{ fontWeight: "600" }} component={"span"}>
                    CourierType:&nbsp;
                  </Typography>
                  dxcfgvhbj
                </Typography>
              </Grid>
            </>
          </Grid>
          <Divider />
          <Typography mt={3} variant="h6" fontWeight="600">
            Product List
          </Typography>
          <Box sx={{ padding: "20px" }}>
            <TableContainer
              sx={{
                boxShadow: 2,
                width: "80%",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Tittle
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Price
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Size - Quantity
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody sx={{ p: "10px" }}></TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end ",
            }}
          >
            <Box>
              <Typography variant="h6">
                DeliveryFee:
                <span style={{ fontWeight: "bold" }}>&#8377;123456</span>
              </Typography>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}

export default OrdersDetails;
