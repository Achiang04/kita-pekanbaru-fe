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
  };
  price: number;
  qty: number;
  total: number;
}

export interface CheckoutItemType {
  id: string;
  orderItems: OrderItem[];
  total: number;
}
