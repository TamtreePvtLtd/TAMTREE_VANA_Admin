import  { useState, useEffect } from "react";
import {
  Box,
  Card,
  Container,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IShipping } from "../interface/type";
import {
  useCreateShippingMutation,
  useGetAllShipping,
  useUpdateShippingMutation,
} from "../customHooksRQ/Shipping";
import toast from "react-hot-toast";

const Shipping = () => {
  const [open, setOpen] = useState(false);
  const [editedPrice, setEditedPrice] = useState("");
  const [title, setTitle] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IShipping | null>(
    null
  );
  const [products, setProducts] = useState<IShipping[]>([]);
  const { data: shippingDetails } = useGetAllShipping();
  const Shipping = shippingDetails || [];
  const createShippingMutation = useCreateShippingMutation();
  const updateShippingMutation = useUpdateShippingMutation();

  const handleProductEditClick = (product: IShipping) => {
    setSelectedProduct(product);
    setTitle(product.title);
    setEditedPrice(product.price.toString());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const data = {
      
        title: title,
        price: parseFloat(editedPrice),
      };

      if (!selectedProduct?._id) {
        await createShippingMutation.mutate(data, {
          onSuccess: () => {
            toast.success("Shipping created successfully");
            handleClose();
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
          },
        });
      } else {
     
        const formData = new FormData();
        formData.append("id", selectedProduct._id);
        formData.append("title", data.title);
        formData.append("price", data.price.toString());

        await updateShippingMutation.mutate(
          { _id: selectedProduct._id, title: data.title, price: data.price },
          {
            onSuccess: () => {
              toast.success("Shipping updated successfully");
              handleClose();
            },
            onError: (error: any) => {
              toast.error(error.response.data.message);
            },
          }
        );
      }
    } catch (error) {
      console.error("Error while creating or updating shipping:", error);
    }
  };

  useEffect(() => {}, [products]);

  const handleAddProductClick = () => {
    setTitle("");
    setEditedPrice("");
    setSelectedProduct(null);
    setOpen(true);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" marginBottom={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Box>
            <Typography variant="h6">Shipping</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              onClick={handleAddProductClick}
              sx={{ textTransform: "none" }}
            >
              + Add Product
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {Shipping.map((product, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={2}
                >
                  <Typography variant="subtitle1">{product.title}</Typography>
                  <Typography variant="body1">{product.price}</Typography>
                  <IconButton onClick={() => handleProductEditClick(product)}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Shipping</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="New Price"
              type="number"
              fullWidth
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSave}
            sx={{ color: "white" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Shipping;
