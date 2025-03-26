import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { AddressGetData } from "../../@types/newTypes/newTypes";
import AddressCard from "./AddressCard";

const cards = [
  {
    id: 1,
    title: "Plants",
    description: "Plants are essential for all life.",
  },
  {
    id: 2,
    title: "Animals",
    description: "Animals are a part of nature.",
  },
  {
    id: 3,
    title: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
];

interface Props {
  address: AddressGetData[];
  selectedAddress: string;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressSelection = ({
  address,
  selectedAddress,
  setSelectedAddress,
}: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 100%, 1fr))",
        gap: 2,
      }}
    >
      {address.map((address) => (
        <AddressCard
          address={address}
          key={address.id}
          selectedCard={selectedAddress}
          setSelectedCard={setSelectedAddress}
        />
      ))}
    </Box>
  );
};

export default AddressSelection;
