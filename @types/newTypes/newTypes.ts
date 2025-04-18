export type Price = {
  minQty: number;
  price: number;
};

export interface ListPrice extends Price {
  id: string;
}

export interface Media {
  id: string;
  fileType: string;
  fileUrl: string;
}

export type ListProdutData = {
  id: string;
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  priceLists: ListPrice[];
  medias: Media[];
  stock: number;
};

export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetCartResponse {
  id: string;
  product: {
    id: string;
    name: string;
    priceLists: ListPrice[];
    medias: Media[];
    stock: number;
  };
  qty: number;
}

export interface AddressPostData {
  name: string;
  fullAddress: string;
  provinceId: string;
  regencyId: string;
  districtId: string;
  subDistrictId: string;
  postalCode: string;
}

export interface AddressGetData {
  id: string;
  customer: {
    id: string;
    name: string;
    gsm: string;
    createdAt: string;
    updatedAt: string;
  };
  name: string;
  fullAddress: string;
  province: {
    id: string;
    name: string;
  };
  regency: {
    id: string;
    provinceId: string;
    name: string;
  };
  district: {
    id: string;
    regencyId: "2171";
    name: string;
  };
  subDistrict: {
    id: string;
    districtId: string;
    name: string;
  };
  postalCode: string;
}
export interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    medias: Media[];
  };
  price: number;
  qty: number;
  total: number;
}

export interface CheckoutItemType {
  id: string;
  orderItems: OrderItem[];
  total: number;
  cartId: string[];
}

export interface OrderListItemType {
  orderItems: OrderItem[];
  id: string;
  redirectUrl: string;
  total: string;
  status: string;
}

export interface NewShipping {
  id: string;
  name: string;
  fullAddress: string;
  province: {
    id: string;
    name: string;
  };
  regency: {
    id: string;
    provinceId: string;
    name: string;
  };
  district: {
    id: string;
    regencyId: string;
    name: string;
  };
  subDistrict: {
    id: string;
    distritcId: string;
    name: string;
  };
  postalCode: string;
}

export interface OrderItemType {
  id: string;
  customer: {
    id: string;
    name: string;
    gsm: string;
    createdAt: string;
    updatedAt: string;
  };
  orderItems: OrderItem[];
  shippingAddress: NewShipping;
  subTotal: number;
  shippingCost: number;
  total: number;
  status: string;
  redirectUrl: string;
  createdAt: string;
  updatedAt: string;
}
