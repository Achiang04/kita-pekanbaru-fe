import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { fieldAttrs } from "../../utils/formUtils";
import { useTranslation } from "react-i18next";
import { cartOrder } from "../../dummy/data";

export default function CheckoutCartDiscountForm() {
  const orderId = cartOrder.id;

  const onSubmit = (
    values: IDiscountFormValues,
    { setSubmitting, setErrors }: FormikHelpers<IDiscountFormValues>
  ) => {
    if (!orderId) return;
    // TODO: integrate submit discount voucher
  };

  return (
    <Formik initialValues={{ code: "" }} onSubmit={onSubmit}>
      {(formikProps) => {
        const { helperText, error, ...restProps } =
          fieldAttrs<IDiscountFormValues>("code", formikProps);
        return (
          <Form className={"bdl-cart__discount-form"}>
            <FormControl fullWidth variant="standard" error={error} required>
              <InputLabel htmlFor="discount-code-input">
                Insert Discount Code
              </InputLabel>
              <Input
                id="discount-code-input"
                type={"text"}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <Button type="submit" disabled={formikProps.isSubmitting}>
                      Apply
                    </Button>
                  </InputAdornment>
                }
                {...restProps}
              />
              <FormHelperText id="my-helper-text">
                {helperText || ""}
              </FormHelperText>
            </FormControl>
          </Form>
        );
      }}
    </Formik>
  );
}

export interface IDiscountFormValues {
  code: string;
}
