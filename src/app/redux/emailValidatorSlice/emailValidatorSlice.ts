import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios, { AxiosRequestConfig } from 'axios';

const apiDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN || 'http://localhost:3001';
const apiUri = `${apiDomain}/api/email-validator`;

interface Email {
  email: string;
}

interface EmailValidator extends Email{
  _id: string;
  isEmailValid: boolean;
}

interface PagedValidatedEmail {
  page: number;
  total: number;
  data: Array<EmailValidator>;
  lastPage: number;
}

export interface EmailValidatorState {
  data: PagedValidatedEmail;
  message: string;
  emailValidationStatus: 'valid' | 'invalid' | 'verifying';
  fetchingStatus: 'loading' | 'error';
}

const initialState: EmailValidatorState = {
  data: { page: 0, total: 0, data: [], lastPage: 0 },
  message: '',
  emailValidationStatus: 'invalid',
  fetchingStatus: 'loading',
};

export const getPaginatedEmailValidationHistory = createAsyncThunk(
  'email-validator/fetchEmailValidationHistory',
  async (page: number, { rejectWithValue }) => {
    const axiosConfig: AxiosRequestConfig = {
      method: 'get',
      url: `${apiUri}/getPaginatedEmailValidationHistory?page=${page}`,
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

export const verifyEmail = createAsyncThunk(
  'email-validator/verifyEmail',
  async (EmailData: Email, { rejectWithValue }) => {
    const axiosConfig: AxiosRequestConfig = {
      method: 'post',
      url: `${apiUri}/verify`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : EmailData
    };

    try {
      const res = await axios(axiosConfig);
      return res.data;
    } catch(err) {
      return rejectWithValue(err);
    }
  }
);

export const emailValidatorSlice = createSlice({
  name: 'emailValidatorState',
  initialState,
  reducers: {
    changeEmailValidationState: (state, action: PayloadAction<'valid' | 'invalid' | 'verifying'>) => {
      state.emailValidationStatus = action.payload;
      state.message = '';
    },
    changeEmailFetchingState: (state, action: PayloadAction<'loading' | 'error'>) => {
      state.fetchingStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaginatedEmailValidationHistory.pending, (state) => {
        state.emailValidationStatus = 'verifying';
      })
      .addCase(getPaginatedEmailValidationHistory.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.emailValidationStatus = 'verifying';
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.emailValidationStatus = action.payload.isEmailValid ? 'valid' : 'invalid';
        state.message = action.payload.message;
      });
  }
});

export const { changeEmailValidationState, changeEmailFetchingState } = emailValidatorSlice.actions;

export const selectEmailValidator = (state: RootState) => state.emailValidator;

export default emailValidatorSlice.reducer;