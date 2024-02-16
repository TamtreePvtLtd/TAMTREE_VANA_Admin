import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../services/Product";
import { queryClient } from "../App";
import toast from "react-hot-toast";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
    refetchOnWindowFocus: false,
  });
};
export const useFetchJewelleryItemByJewelleryCollection = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
    refetchOnWindowFocus: false,
  });
};

export const useCreateProductMutation = () => {
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return createProductMutation;
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteProductMutation = () => {
  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
  });
  return deleteProductMutation;
};
