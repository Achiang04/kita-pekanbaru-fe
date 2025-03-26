import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Grid2,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Address,
  useDeleteAddressMutation,
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetRegenciesQuery,
  useGetSubDistrictsQuery,
  usePostAddressMutation,
  usePutAddressMutation,
} from "../../services/address";
import { AddressGetData } from "../../@types/newTypes/newTypes";
import { Close } from "@mui/icons-material";

interface TFProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  options?: Address[];
  isSelect?: boolean;
  disable?: boolean;
}

const MemoizedTextField = React.memo(
  ({
    label,
    name,
    value,
    onChange,
    options = [],
    isSelect = false,
    disable,
  }: TFProps) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required
      select={isSelect}
      disabled={disable}
    >
      {isSelect &&
        options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
    </TextField>
  )
);

interface Props {
  isEdit?: boolean;
  address?: AddressGetData;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressForm = ({ isEdit, address, setIsEdit }: Props) => {
  const [name, setName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const isSubmitDisabled = useMemo(() => {
    return (
      name.length === 0 ||
      fullAddress.length === 0 ||
      provinceId.length === 0 ||
      regencyId.length === 0 ||
      districtId.length === 0 ||
      subDistrictId.length === 0 ||
      postalCode.length === 0
    );
  }, [
    name,
    fullAddress,
    provinceId,
    regencyId,
    districtId,
    subDistrictId,
    postalCode,
  ]);

  const [postAddressMutation] = usePostAddressMutation();
  const [putAddressMutation] = usePutAddressMutation();
  const [deleteAddressMutation] = useDeleteAddressMutation();

  const { data: provinceData = [] } = useGetProvincesQuery(undefined);
  const { data: regenciesData = [] } = useGetRegenciesQuery(
    {
      provinces: provinceId,
    },
    { skip: provinceId.length === 0 }
  );
  const { data: districtsData = [] } = useGetDistrictsQuery(
    {
      regency: regencyId,
    },
    { skip: regencyId.length === 0 }
  );
  const { data: subDistricsData = [] } = useGetSubDistrictsQuery(
    {
      district: districtId,
    },
    { skip: districtId.length === 0 }
  );

  useEffect(() => {
    if (isEdit) {
      if (address) {
        setName(address.name);
        setFullAddress(address.fullAddress);
        setProvinceId(address.province.id);
        setRegencyId(address.regency.id);
        setDistrictId(address.district.id);
        setSubDistrictId(address.subDistrict.id);
        setPostalCode(address.postalCode);
      }
    }
  }, [isEdit, address]);

  const handleChangeName = useCallback(
    (e: any) => {
      setName(e.target.value);
    },
    [name]
  );

  const handleChangeFullAddress = useCallback(
    (e: any) => {
      setFullAddress(e.target.value);
    },
    [fullAddress]
  );

  const handleChangeProvinceId = useCallback(
    (e: any) => {
      if (provinceId !== e.target.value) {
        setRegencyId("");
        setDistrictId("");
        setSubDistrictId("");
      }
      setProvinceId(e.target.value);
    },
    [provinceId]
  );

  const handleChangeRegencyId = useCallback(
    (e: any) => {
      if (regencyId !== e.target.value) {
        setDistrictId("");
        setSubDistrictId("");
      }
      setRegencyId(e.target.value);
    },
    [regencyId]
  );

  const handleChangeDistrictId = useCallback(
    (e: any) => {
      if (districtId !== e.target.value) {
        setSubDistrictId("");
      }
      setDistrictId(e.target.value);
    },
    [districtId]
  );

  const handleChangeSubDistrictId = useCallback(
    (e: any) => {
      setSubDistrictId(e.target.value);
    },
    [subDistrictId]
  );

  const handleChangePostalCode = useCallback(
    (e: any) => {
      setPostalCode(e.target.value);
    },
    [postalCode]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await postAddressMutation({
      data: {
        name,
        fullAddress,
        provinceId,
        regencyId,
        districtId,
        subDistrictId,
        postalCode,
      },
    });
    if ("error" in result) {
      // TODO: handle error
    } else {
      setDistrictId("");
      setFullAddress("");
      setName("");
      setPostalCode("");
      setProvinceId("");
      setRegencyId("");
      setSubDistrictId("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", p: isEdit ? 4 : 0, position: "relative" }}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MemoizedTextField
            label="Name"
            name="name"
            value={name}
            onChange={handleChangeName}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MemoizedTextField
            label="Full Address"
            name="fullAddress"
            value={fullAddress}
            onChange={handleChangeFullAddress}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MemoizedTextField
            label="Province"
            name="provinceId"
            value={provinceId}
            onChange={handleChangeProvinceId}
            options={provinceData}
            isSelect
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MemoizedTextField
            label="Regency"
            name="regencyId"
            value={regencyId}
            onChange={handleChangeRegencyId}
            options={regenciesData}
            isSelect
            disable={provinceId.length === 0}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MemoizedTextField
            label="District"
            name="districtId"
            value={districtId}
            onChange={handleChangeDistrictId}
            options={districtsData}
            isSelect
            disable={regencyId.length === 0}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MemoizedTextField
            label="Sub-District"
            name="subDistrictId"
            value={subDistrictId}
            onChange={handleChangeSubDistrictId}
            options={subDistricsData}
            isSelect
            disable={districtId.length === 0}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <MemoizedTextField
            label="Postal Code"
            name="postalCode"
            value={postalCode}
            onChange={handleChangePostalCode}
          />
        </Grid2>
      </Grid2>
      <Stack
        direction={isEdit ? "row" : "column"}
        gap={1}
        sx={{ paddingTop: "16px" }}
      >
        {!isEdit && (
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        )}
        {isEdit && (
          <>
            <Button
              fullWidth
              type="button"
              variant="contained"
              disabled={isSubmitDisabled}
              onClick={async (e) => {
                e.preventDefault();

                const result = await putAddressMutation({
                  data: {
                    name,
                    fullAddress,
                    provinceId,
                    regencyId,
                    districtId,
                    subDistrictId,
                    postalCode,
                  },
                  id: address ? address.id : "",
                });
                if ("error" in result) {
                  // TODO: handle error
                } else {
                  setDistrictId("");
                  setFullAddress("");
                  setName("");
                  setPostalCode("");
                  setProvinceId("");
                  setRegencyId("");
                  setSubDistrictId("");
                  if (setIsEdit) setIsEdit(false);
                }
              }}
            >
              Update
            </Button>
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="error"
              onClick={async (e) => {
                e.preventDefault();

                const result = await deleteAddressMutation({
                  id: address ? address.id : "",
                });
                if ("error" in result) {
                  // TODO: handle error
                } else {
                  setDistrictId("");
                  setFullAddress("");
                  setName("");
                  setPostalCode("");
                  setProvinceId("");
                  setRegencyId("");
                  setSubDistrictId("");
                  if (setIsEdit) setIsEdit(false);
                }
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Stack>
      {isEdit && (
        <IconButton
          color="error"
          size="small"
          sx={{ position: "absolute", top: 1, right: 1 }}
          onClick={() => {
            if (setIsEdit) setIsEdit(false);
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default AddressForm;
