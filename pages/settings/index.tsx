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
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddressFieldset from "../../components/checkoutComponents/AddressFieldset";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ICheckoutShippingPageData } from "../../@types/delivery";
import { Formik, useFormikContext } from "formik";
import { IShippingFormValues } from "../../@types/shipping";

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

  useEffect(() => {
    setNameValue(name);
    setPhoneValue(phoneNumber);
  }, [name, phoneNumber]);

  return (
    <MainLayout
      mainMenu={mainMenu}
      footerMenu={footerMenu}
      basicSettings={basicSettings}
      noIndex
    >
      <div className="container">
        <Box className="" mb={2} sx={{ px: "100px" }}>
          <Typography variant="h6" mb={2}>
            User
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label={"Name"}
                variant={"standard"}
                required={true}
                fullWidth
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
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
              />
            </Grid>
          </Grid>
        </Box>
        <Formik
          initialValues={{
            shipping_address: {
              first_name: "",
              last_name: "",
              company: "",
              address_line_1: "",
              address_line_2: "",
              city: "",
              state: "",
              country_id: 0,
              zip: "",
              phone: "",
            },
          }}
          onSubmit={() => {}}
        >
          {() => (
            <Box className="" mt={4} mb={2} sx={{ px: "100px" }}>
              <Typography variant="h6">Shipping address</Typography>
              <AddressFieldset
                countries={shippingPage.options.country}
                keyPrefix={"shipping_address"}
                showPhone
              />
            </Box>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  ISettingsPageProps
> = async () => {
  const { mainMenu, footerMenu } = makeAllMenus({ categoryTree });

  return {
    props: {
      mainMenu,
      footerMenu,
      basicSettings,
    },
  };
};

interface ISettingsPageProps {
  mainMenu: IMenuItem[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}
