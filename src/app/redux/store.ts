import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import phoneNumberValidatorReducer from './phoneNumberValidatorSlice/phoneNumberValidatorSlice';
import emailValidatorReducer from './emailValidatorSlice/emailValidatorSlice';

export const store = configureStore({
  reducer: {
    phoneNumberValidator: phoneNumberValidatorReducer,
    emailValidator: emailValidatorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;