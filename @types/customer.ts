import { IAddress } from "./delivery";

export interface IRegisterCustomerData {
  email: string;
  password: string;
  re_password: string;
  first_name?: string;
  last_name: string;
  private_comment?: string;
  receive_marketing_info?: boolean;
  custom_attrs?: {
    [key: string]: any;
  };
  send_welcome_email?: boolean;
  login_url?: string;
}
export interface ICustomer {
  id: string;
  email: string | null;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  receive_marketing_info: boolean;
  custom_attrs: {
    [key: string]: any;
  } | null;
  addresses: IAddress[];
}
