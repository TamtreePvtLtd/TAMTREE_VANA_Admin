export interface ICategory {
  _id?: string;
  name: string;
  description: string;
  // image: string;
}

export interface ILogin {
  email: string;
 password: string;
 }
export interface IUser {
  adminId: string | null;
  email: string | null;
}

export interface ILoginResponse {
  data: IUser | null;
  message: string;
  status?: boolean;
}

export interface IAuthContext {
  user: IUser | null;
  updateUserData: (user: IUser | null) => void;
}

export type CategoryDrawerProps = {
  isDrawerOpen: boolean;
  selectedCategory: ICategory | null;
  handleDrawerClose: () => void;
  isFetching: boolean;
};
export type JewelleryItemDrawerProps = {
  isDrawerOpen: boolean;
  selectedJewelleryITem: IProduct | null;
  handleDrawerClose: () => void;
};

export interface IProduct {
  _id: string;
  title: string;
  images: string[];
  inStock: string;
  price: number;
  description: string;
  netWeight?: number;
  posterURL: string;
  JewelleryCollection: (string | undefined)[];
}

export type DialogProps = {
  deleteDialogConfirmationOpen: boolean;
  handleDeleteCancel: () => void;
  handleDeleteClickConfirm: () => void;
};

export type ProductByCollection = {
  _id: string;
  title: string;
  description: string;
  price: number;
  netWeight: number;
  posterURL: string;
  categoryName: string;
  // JewelleryCollectionId: string[];
  images: string[];
  JewelleryCollection: ICategory[];
};
///order////

export interface Id {
  _id?: string;
}

export interface IOrder extends Id {
  Sno: number;
  OrderDateAndTime: Date;
  OrderNumber: string;
}

export interface IOrderDetailByOrderID {
  _id: string;
  shippingDetail: IShippingdetail;
  userId: string;
  productdetail: IProductdetail[];
  totalPrice: number;
  paymentId: string;
  status: number;
  orderedDateAndTime: Date;
  userName: string;
  image: string;
  orderNumber: string;
  courierType: string;
  deliveryFee: string;
}

export interface IShippingdetail {
  name: string;
  address: string;
  phoneNumber: string;
  alternativeNumber: string;
  pincode: string;
  city: string;
  state: string;
  orderNumber: string;
}

export interface IProductdetail {
  productId: string;
  title: string;
  productCode: string;
  posterURL: string;
  _id: string;
}


