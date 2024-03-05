import { ICategory, IShipping } from "../interface/type";
import { httpWithCredentials } from "./http";

export const getAllCategory = async () => {
  try {
    const response = await httpWithCredentials.get<ICategory[]>(
      "JewelleryCollection/getJewelleryCollection"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (newCategory: FormData) => {
  console.log("create", newCategory);

  try {
    const response = await httpWithCredentials.post<ICategory>(
      "JewelleryCollection/createJewelleryCollection",
      newCategory
    );
    if (response.data && response.data._id) {
      return response.data;
    } else {
      throw new Error("Error while create category");
    }
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (updatedCategory: FormData) => {
  console.log("api update", updatedCategory);
  try {
    var id = updatedCategory.get("id");
    var response = await httpWithCredentials.put<ICategory>(
      `JewelleryCollection/updateJewelleryCollection/${id}`,
      updatedCategory
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id: string) => {
  const deleteApi = `JewelleryCollection/deleteJewelleryCollection/${id}`;
  try {
    await httpWithCredentials.delete(deleteApi);
    console.log("Category deleted successfully");
  } catch (error) {
    console.error("Error in delete Category:", error);
    throw error;
  }
};
