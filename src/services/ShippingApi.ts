import { IShipping } from "../interface/type";
import { httpWithCredentials } from "./http";

export const createShipping = async (newShipping: FormData) => {
  console.log("create", newShipping);

  try {
    const response = await httpWithCredentials.post<IShipping>(
      "Shipping/createShipping",
      newShipping
    );
    if (response.data && response.data) {
      return response.data;
    } else {
      throw new Error("Error while create category");
    }
  } catch (error) {
    throw error;
  }
};

export const getAllShippingDetails = async () => {
  try {
    const response = await httpWithCredentials.get<IShipping[]>(
      "Shipping/getAllShippingDetails"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateShippingDetails = async (updatedShipping: IShipping) => {
  console.log("api update", updatedShipping);
  try {
    const response = await httpWithCredentials.put<IShipping>(
      `/Shipping/updateShippingDetails/${updatedShipping._id}`,
      updatedShipping
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
