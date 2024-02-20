import { IOrder } from "../interface/type";


export const orders: IOrder[] = [
  {
    _id:"A",
    Sno:1,
    OrderDateAndTime: new Date("2024-02-13T10:00:00"), // Example date and time
    OrderNumber: "ORD001",
  },
  {
    _id:"B",
    Sno:2,
    OrderDateAndTime: new Date("2024-02-14T11:30:00"), // Example date and time
    OrderNumber: "ORD002",
  },
  {
    _id:"C",
    Sno:3,
    OrderDateAndTime: new Date("2024-02-15T11:30:00"), // Example date and time
    OrderNumber: "ORD003",
  },
  {
     _id:"D",
    Sno:4,
    OrderDateAndTime: new Date("2024-02-16T11:30:00"), // Example date and time
    OrderNumber: "ORD004",
  },
  {
      _id:"E",
    Sno:5,
    OrderDateAndTime: new Date("2024-02-17T11:30:00"), // Example date and time
    OrderNumber: "ORD005",
  },
];
