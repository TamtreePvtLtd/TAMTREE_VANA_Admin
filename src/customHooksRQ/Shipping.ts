import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../App";
import toast from "react-hot-toast";
import { createShipping, getAllShippingDetails, updateShippingDetails } from "../services/ShippingApi";

export const useCreateShippingMutation = () => {
  const createCategoryMutation = useMutation({
    mutationFn: createShipping,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return createCategoryMutation;
};


export const useGetAllShipping = () => {
  return useQuery({
    queryKey: ["shipping"],
    queryFn: getAllShippingDetails,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateShippingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShippingDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  
};