import React, { useEffect, useState } from "react";
import { IMenuItem } from "../../@types/components";
import { IBasicSettings } from "../../@types/settings";
import { GetServerSideProps } from "next";
import { makeAllMenus } from "../../lib/menu";
import {
  basicSettings,
  categoryTree,
  checkoutShippingDummy,
} from "../../dummy/data";
import MainLayout from "../../layouts/Main";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddressFieldset from "../../components/checkoutComponents/AddressFieldset";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ICheckoutShippingPageData } from "../../@types/delivery";
import { Formik, useFormikContext } from "formik";
import { IShippingFormValues } from "../../@types/shipping";
import { Category, ListProdutData } from "../../@types/newTypes/newTypes";
import CheckoutShippingForm from "../../components/checkoutComponents/CheckoutShippingForm";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../redux/reducers/userAuth";
import { removeCheckoutItem } from "../../redux/reducers/cart";
import ProtectedLayout from "../../layouts/ProtectedLayout";

export default function SettingsPage({
  mainMenu,
  footerMenu,
  basicSettings,
}: ISettingsPageProps) {
  const shippingPage: ICheckoutShippingPageData = checkoutShippingDummy;
  const formikProps = useFormikContext<IShippingFormValues>();

  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const { name, phoneNumber } = useSelector(
    (state: RootState) => state.userAuth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setNameValue(name);
    setPhoneValue(phoneNumber);
  }, [name, phoneNumber]);

  return (
    <ProtectedLayout>
      <MainLayout
        mainMenu={mainMenu}
        footerMenu={footerMenu}
        basicSettings={basicSettings}
        noIndex
      >
        <div className="container">
          <Box className="" mb={2} sx={{ px: { md: "100px" } }}>
            <Typography variant="h5" mb={2}>
              User
            </Typography>
            <Grid container spacing={2} sx={{ paddingBottom: "16px" }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label={"Name"}
                  variant={"standard"}
                  required={true}
                  fullWidth
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label={"Phone Number"}
                  variant={"standard"}
                  required={true}
                  fullWidth
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  disabled
                />
              </Grid>
            </Grid>
            <CheckoutShippingForm isSetting withButton />
            <Stack sx={{ paddingTop: "16px" }}>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  dispatch(setIsLogin(false));
                  localStorage.removeItem("access_token");
                  dispatch(removeCheckoutItem());
                }}
              >
                Logout
              </Button>
            </Stack>
          </Box>
        </div>
      </MainLayout>
    </ProtectedLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  ISettingsPageProps
> = async () => {
  const { mainMenu, footerMenu } = await makeAllMenus({ categoryTree });

  return {
    props: {
      mainMenu,
      footerMenu,
      basicSettings,
    },
  };
};

interface ISettingsPageProps {
  mainMenu: Category[];
  footerMenu: ListProdutData[];
  basicSettings: IBasicSettings;
}
