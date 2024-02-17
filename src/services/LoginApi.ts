import { ILogin, ILoginResponse, IUser } from "../interface/type";
import { httpWithCredentials } from "./http";

export const getLoginCridential = async (data: ILogin) => {
    try {
        const response = await httpWithCredentials.post<ILoginResponse>("Admin/login", data);
        console.log(response);
        return response;
    } catch (error) { throw error }
};



export const handleLogout = async () => {
    try {
      const response = await httpWithCredentials.post<ILoginResponse>("Admin/logout");
      console.log(response); 
      return response;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  export const isAuthorized = async () => {
    try {
      const response = await httpWithCredentials.get<IUser>(
        "/Admin/isAuthorized"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };