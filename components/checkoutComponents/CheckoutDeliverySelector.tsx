import React from "react";
import { useFormikContext } from "formik";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { IShippingFormValues } from "../../@types/shipping";
import {
  ICheckoutShippingPageData,
  IDelivery,
  TShippingAlias,
} from "../../@types/delivery";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { Box } from "@mui/system";
import useFormatCurrency from "../../hooks/useFormatCurrency";

export default function CheckoutDeliverySelector({ options }: IInPros) {
  const formikProps = useFormikContext<IShippingFormValues>();

  return (
    <Box mb={2}>
      <FormControl
        component="fieldset"
        error={Boolean("delivery_id" in formikProps.errors)}
      >
        <RadioGroup
          name="delivery_id"
          onChange={formikProps.handleChange}
          value={formikProps.values.delivery_id}
        >
          {options.delivery.map((delivery) => (
            <React.Fragment key={delivery.delivery_id}>
              <FormControlLabel
                className="bdl-shipping-form__shipping-item"
                value={delivery.delivery_id}
                control={<Radio size="small" required />}
                label={<DeliveryTitle delivery={delivery} />}
                // label={<span>asdasd</span>}
              />
              {formikProps.values.delivery_id == delivery.delivery_id && (
                <DeliveryDetails delivery={delivery} />
              )}
            </React.Fragment>
          ))}
        </RadioGroup>
        {"delivery_id" in formikProps.errors && (
          <FormHelperText>{formikProps.errors.delivery_id}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

type IInPros = Pick<ICheckoutShippingPageData, "options">;

const DeliveryTitle = ({ delivery }: { delivery: IDelivery }) => {
  const price = delivery.shipping_config?.price;

  const { formatCurrency } = useFormatCurrency();

  //   const getImgThumb = (img: string) =>
  //     api!
  //       .makeThumb({
  //         imgLocalPath: img,
  //         maxSize: 50,
  //       })
  //       .getSrc();

  return (
    <span>
      {delivery.shipping?.alias === TShippingAlias.selfPickup ? (
        <StoreMallDirectoryIcon
          className="bdl-shipping-form__shipping-img"
          fontSize="large"
        />
      ) : (
        delivery.img && (
          <img
            className="bdl-shipping-form__shipping-img"
            // src={getImgThumb(delivery.img)}
          />
        )
      )}
      {delivery.title}
      <small className="bdl-shipping-form__price">
        {price ? formatCurrency(price) : "Free"}
      </small>
    </span>
  );
};

const DeliveryDetails = ({ delivery }: { delivery: IDelivery }) => {
  let details = "";
  if (
    delivery.shipping?.alias === TShippingAlias.selfPickup &&
    delivery.shipping_config?.address
  ) {
    details = delivery.shipping_config?.address;
  }

  if (delivery.description) {
    details = delivery.description;
  }

  return (
    <div className="bdl-shipping-form__shipping-details">
      {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
    </div>
  );
};
