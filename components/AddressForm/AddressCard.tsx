import {
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { AddressGetData } from "../../@types/newTypes/newTypes";
import AddressForm from "./AddressForm";
import { Create } from "@mui/icons-material";

interface Props {
  address: AddressGetData;
  selectedCard: string;
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
}

const AddressCard = ({ address, selectedCard, setSelectedCard }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card>
      {!isEdit && (
        <CardActionArea
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCard(address.id);
          }}
          data-active={selectedCard === address.id ? "" : undefined}
          sx={{
            height: "100%",
            "&[data-active]": {
              backgroundColor: "action.selected",
              "&:hover": {
                backgroundColor: "action.selectedHover",
              },
            },
            position: "relative",
          }}
        >
          <CardContent sx={{ height: "100%" }}>
            <Typography variant="body2" component="div">
              <b>{address.name}</b> | {address.customer.gsm}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {address.fullAddress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {address.subDistrict.name}, {address.district.name},{" "}
              {address.regency.name}, {address.province.name},{" "}
              {address.postalCode}
            </Typography>
          </CardContent>
          <IconButton
            color="default"
            size="small"
            sx={{ position: "absolute", top: 2, right: 2 }}
            onClick={(e) => {
              e.stopPropagation();
              if (selectedCard === address.id) {
                setSelectedCard("");
              }

              if (setIsEdit) setIsEdit(true);
            }}
          >
            <Create fontSize="small" />
          </IconButton>
        </CardActionArea>
      )}
      {isEdit && <AddressForm isEdit address={address} setIsEdit={setIsEdit} />}
    </Card>
  );
};

export default AddressCard;
