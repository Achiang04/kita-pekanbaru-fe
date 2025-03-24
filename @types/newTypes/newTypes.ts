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
  product: { id: string; name: string; priceLists: ListPrice[] };
  qty: number;
}
