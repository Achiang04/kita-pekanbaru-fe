import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postUserLogin,
  postUserRegister,
  postValidateUser,
} from "../../lib/apiFunction";

export const userRegister = createAsyncThunk<
  any,
  { phoneNumber: string; name: string }
>("userAuth/userRegister", async ({ phoneNumber, name }, thunkAPI) => {
  try {
    const response = await postUserRegister(name, phoneNumber);

    if (response.status !== 200) {
      const message = response.response.data.message;
      throw new Error(message);
    }

    return { phoneNumber, name };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const userLogin = createAsyncThunk<any, { phoneNumber: string }>(
  "userAuth/userLogin",
  async ({ phoneNumber }, thunkAPI) => {
    try {
      const response = await postUserLogin(phoneNumber);

      if (response.status !== 200) {
        const message = response.response.data.message;
        throw new Error(message);
      }

      return { phoneNumber };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userValidate = createAsyncThunk<
  any,
  { phoneNumber: string; otp: string }
>("userValidate/userLogin", async ({ phoneNumber, otp }, thunkAPI) => {
  try {
    const response = await postValidateUser(phoneNumber, otp);

    if (response.status !== 200) {
      const message = response.response.data.message;
      throw new Error(message);
    }

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface InitialState {
  isLogin: boolean;
  name: string;
  phoneNumber: string;
  isLoading: boolean;
  isShowOTPModal: boolean;
  error: {
    status: boolean;
    message: string;
  };
}

const initialState: InitialState = {
  isLogin: false,
  name: "",
  phoneNumber: "",
  isLoading: false,
  isShowOTPModal: false,
  error: {
    status: false,
    message: "",
  },
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = {
        status: false,
        message: "",
      };
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = {
          status: false,
          message: "",
        };
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isShowOTPModal = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          status: true,
          message: action.payload as string,
        };
      });

    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = {
          status: false,
          message: "",
        };
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.isShowOTPModal = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          status: true,
          message: action.payload as string,
        };
      });

    builder
      .addCase(userValidate.pending, (state) => {
        state.isLoading = true;
        state.error = {
          status: false,
          message: "",
        };
      })
      .addCase(userValidate.fulfilled, (state, action) => {
        const { data } = action.payload;
        const accessToken = data.accessToken;
        localStorage.setItem("access_token", accessToken);

        state.isLogin = true;
        state.isLoading = false;
        state.isShowOTPModal = false;
      })
      .addCase(userValidate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          status: true,
          message: action.payload as string,
        };
      });
  },
});

export default userAuthSlice.reducer;
export const { resetError, setIsLogin } = userAuthSlice.actions;
