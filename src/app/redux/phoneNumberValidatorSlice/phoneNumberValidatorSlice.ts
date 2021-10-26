import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios, { AxiosRequestConfig } from 'axios';

const apiDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN || 'http://localhost:3001';
const apiUri = `${apiDomain}/api/email-validator`;

interface PhoneNumber {
  countryCode: string;
  phoneNumber: number
}

interface PhoneNumberValidator extends PhoneNumber{
  _id: string;
  isPhoneNumberValid: boolean;
}

interface PagedValidatedPhoneNumber {
  page: number;
  total: number;
  data: Array<PhoneNumberValidator>;
  lastPage: number;
}

export interface PhoneNumberValidatorState {
  data: PagedValidatedPhoneNumber;
  message: string;
  phoneNumberValidationStatus: 'valid' | 'invalid' | 'verifying';
  fetchingStatus: 'loading' | 'error';
}

const initialState: PhoneNumberValidatorState = {
  data: { page: 0, total: 0, data: [], lastPage: 0 },
  message: '',
  phoneNumberValidationStatus: 'invalid',
  fetchingStatus: 'loading',
};

export const getPaginatedPhoneNumberValidationHistory = createAsyncThunk(
  'phone-number-validator/fetchHistory',
  async (page: number, { rejectWithValue }) => {
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: `${apiUri}/getPaginatedPhoneNumberValidationHistory?page=${page}`,
      headers: {}
    };

    try {
      const res =  await axios(axiosConfig);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyPhoneNumber = createAsyncThunk(
  'phone-number-validator/verfiyPhoneNumber',
  async (phoneNumberData: PhoneNumber, { rejectWithValue }) => {
    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: `${apiUri}/verify`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : phoneNumberData
    };

    try {
      const res = await axios(axiosConfig);
      return res.data;
    } catch(err) {
      return rejectWithValue(err);
    }
  }
);

export const phoneNumberValidatorSlice = createSlice({
  name: 'phoneNumberValidatorState',
  initialState,
  reducers: {
    changeValidationState: (state, action: PayloadAction<PhoneNumberValidatorState>) => {
      state.phoneNumberValidationStatus = action.payload.phoneNumberValidationStatus;
    },
    changeFetchingState: (state, action: PayloadAction<PhoneNumberValidatorState>) => {
      state.fetchingStatus = action.payload.fetchingStatus;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaginatedPhoneNumberValidationHistory.pending, (state) => {
        state.phoneNumberValidationStatus = 'verifying';
      })
      .addCase(getPaginatedPhoneNumberValidationHistory.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(verifyPhoneNumber.pending, (state) => {
        state.phoneNumberValidationStatus = 'verifying';
      })
      .addCase(verifyPhoneNumber.fulfilled, (state, action) => {
        state.phoneNumberValidationStatus = action.payload.isValid ? 'valid' : 'invalid';
        state.message = action.payload.message;
      });
  }
});

export const { changeValidationState, changeFetchingState } = phoneNumberValidatorSlice.actions;

export const selectPhoneNumberValidator = (state: RootState) => state.phoneNumberValidator;

export default phoneNumberValidatorSlice.reducer;