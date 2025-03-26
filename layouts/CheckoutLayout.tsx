import React, { ReactNode } from "react";
import Container from "@mui/material/Container";
import CheckoutHeader from "../components/checkoutComponents/CheckoutHeader";

import Grid from "@mui/material/Grid2";
import CheckoutCart from "../components/checkoutComponents/CheckoutCart";
import LoadingLine from "../components/LoadingLine";
import CheckoutProgress from "../components/checkoutComponents/CheckoutProgress";

export default function CheckoutLayout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <section className={"bdl-checkout-layout"}>
      <LoadingLine />
      <CheckoutHeader />
      <main className={"bdl-checkout-layout__main"}>
        <Container className={"bdl-checkout-layout__container"}>
          {/* <CheckoutProgress /> */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 8, md: 9 }} order={{ xs: 2, sm: 1 }}>
              {children}
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 3 }} order={{ xs: 1, sm: 2 }}>
              {<CheckoutCart />}
            </Grid>
          </Grid>
        </Container>
      </main>
    </section>
  );
}
