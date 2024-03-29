import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct } from "../interface/type";
import { useDeleteProductMutation } from "../customHooksRQ/Product";
import { FetchJewelleryItemByJewelleryCollection } from "../services/Product";
import DeleteConfirmationDialogBox from "../common/DeleteConfirmationDialogBox";
import Loader from "../common/Loader";
import { useGetAllCategory } from "../customHooksRQ/Category";
import JewelleryItem from "../drawer/JewelleryItem";
import { ProductInitialValue } from "../constants/IntialValues";

const Product = () => {
  const deleteProductMutation = useDeleteProductMutation();
  const [productdialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
    ProductInitialValue
  );
  const [deleteDialogConfirmationOpen, setDeleteDialogConfirmationOpen] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<IProduct | null>(
    null
  );
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const {
    data: CollectionData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllCategory();

  const collections = CollectionData || [];
  const newProduct: IProduct = {
    _id: "",
    title: "",
    images: [],
    price: 0,
    inStock: "",
    description: "",
    netWeight: 0,
    posterURL: "",
    JewelleryCollection: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingProducts(true);
        if (selectedCollection) {
          const result = await FetchJewelleryItemByJewelleryCollection(
            selectedCollection
          );

          setFilteredProducts(result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (selectedCollection) {
      fetchData();
    }
  }, [selectedCollection]);

  const handleCollectionChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    setSelectedCollection(selectedValue);
  };

  const handleProductEditClick = (product: IProduct) => {
    setSelectedProduct({ ...product });
    setProductDialogOpen(true);
  };

  const handleProductDeleteClick = (product: IProduct) => {
    setDeleteConfirmation(product);
    setDeleteDialogConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogConfirmationOpen(false);
  };

  const handleDeleteConfirmClick = async () => {
    setDeleteDialogConfirmationOpen(true);

    if (deleteConfirmation?._id) {
      await deleteProductMutation.mutateAsync(deleteConfirmation._id, {
        onError: (error) => console.log(error.message),
      });
      setDeleteConfirmation(null);
      setDeleteDialogConfirmationOpen(false);
    }
  };

  const handleProductEdit = (updatedProduct: IProduct) => {
    // Update the product in the table
    const updatedProducts = filteredProducts.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    setFilteredProducts(updatedProducts);
    // Close the dialog
    setProductDialogOpen(false);
    // Show success message
    // updat(true, "Product updated successfully.", "success");
  };

  const handleAddProductClick = () => {
    setSelectedProduct(newProduct);
    setProductDialogOpen(true);
    refetch();
  };

  const handleClearSearch = () => {
    setSearchText("");
    setFilteredProducts([]);
    setSelectedCollection(null);
  };

  return (
    <>
      {isLoading || isFetching || loadingProducts ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Box>
                <Typography variant="h6">Products</Typography>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <FormControl
                sx={{
                  marginRight: 2,
                  width: "250px",
                }}
              >
                <Select
                  value={selectedCollection || ""}
                  onChange={handleCollectionChange}
                  displayEmpty
                  size="small"
                >
                  <MenuItem value="" sx={{ display: "none" }}>
                    Select Collection
                  </MenuItem>

                  {collections.map((collection) => (
                    <MenuItem
                      key={collection._id}
                      value={collection._id}
                      sx={{
                        color:
                          selectedCollection === collection._id
                            ? "#bd8d67"
                            : "#333",
                      }}
                    >
                      {collection.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                onClick={handleClearSearch}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: "13px",
                  fontWeight: "bolder",
                  height: "38px",
                  color: "#bd8d67",
                }}
              >
                Clear search
              </Button>
            </Box>
            <TableContainer
              sx={{
                // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                marginTop: 3,
                position: "relative",
                lineHeight: "none",
              }}
            >
              <Table>
                <TableHead
                  sx={{
                    position: "sticky",
                    zIndex: 1,
                    backgroundColor: "wheat",
                    lineHeight: "none",
                    height: selectedProduct ? "50px" : "auto",
                  }}
                >
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Images</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">InStock</TableCell>
                    <TableCell align="center" sx={{ width: "300px"}}>
                      Description
                    </TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredProducts &&
                    filteredProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {product.title || null}
                        </TableCell>

                        <TableCell align="center">
                          <img src={product.posterURL} height={70} width={70} />
                        </TableCell>
                        <TableCell align="center">
                          {product.price || null}
                        </TableCell>
                        <TableCell align="center" sx={{ width: "20px" }}>
                          {product.inStock || null}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{textAlign:"left",maxWidth: "300px", wordWrap: "break-word"}}
                        >
                          {product.description || null}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleProductEditClick(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleProductDeleteClick(product)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          {deleteDialogConfirmationOpen && (
            <DeleteConfirmationDialogBox
              deleteDialogConfirmationOpen={deleteDialogConfirmationOpen}
              handleDeleteCancel={handleDeleteCancel}
              handleDeleteClickConfirm={handleDeleteConfirmClick}
            />
          )}
          {productdialogOpen && selectedProduct && (
            <JewelleryItem
              selectedProduct={selectedProduct}
              dialogOpen={productdialogOpen}
              onCloseDialog={() => setProductDialogOpen(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Product;
