import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table } from 'antd';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getPaginatedPhoneNumberValidationHistory, selectPhoneNumberValidator } from '../../redux/phoneNumberValidatorSlice/phoneNumberValidatorSlice';
import { getPaginatedEmailValidationHistory, selectEmailValidator } from '../../redux/emailValidatorSlice/emailValidatorSlice';
import { DateTime } from 'luxon';

const phoneNumberValidationTableColumns: any = [
  {
    title: 'Country Code',
    dataIndex: 'countryCode',
    sorter: (a: any, b: any) => a.countryCode.length - b.countryCode.length,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    sorter: (a: any, b: any) => a.phoneNumber - b.phoneNumber
  },
  {
    title: 'Phone Number Validation Result',
    dataIndex: 'isPhoneNumberValid',
    sorter: (a: any, b: any) => a.isPhoneNumberValid - b.isPhoneNumberValid,
    render: (isPhoneNumberValid: boolean) => <span>{isPhoneNumberValid ? 'True' : 'False'}</span>
  },
  {
    title: 'Phone Number Validation Date (UTC)',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => DateTime.fromISO(a.createdAt).valueOf() - DateTime.fromISO(b.createdAt).valueOf(),
    render: (dateString: string) => <span> {DateTime.fromISO(dateString).toLocaleString(DateTime.DATETIME_MED)} </span>
  }
];

const emailValidationTableColumns: any = [
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a: any, b: any) => a.email.length - b.email.length,
  },
  {
    title: 'Email Validation Result',
    dataIndex: 'isEmailValid',
    sorter: (a: any, b: any) => a.isEmailValid - b.isEmailValid,
    render: (isEmailValid: boolean) => <span>{isEmailValid ? 'True' : 'False'}</span>
  },
  {
    title: 'Email Validation Date (UTC)',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => DateTime.fromISO(a.createdAt).valueOf() - DateTime.fromISO(b.createdAt).valueOf(),
    render: (dateString: string) => <span> {DateTime.fromISO(dateString).toLocaleString(DateTime.DATETIME_MED)} </span>

  }
];

export const ResultTable = () => {
  const phoneNumberValidationState = useAppSelector(selectPhoneNumberValidator);
  const emailValidationState = useAppSelector(selectEmailValidator);

  const dispatch = useAppDispatch();

  const [phoneNumberValidationTableData, setPhoneNumberValidationTableData] = useState<any>([]);
  const [emailValidationTableData, setEmailValidationTableData] = useState<any>([]);

  const getValidationHistory = useCallback((page: number) => {
    dispatch(getPaginatedPhoneNumberValidationHistory(page));
    dispatch(getPaginatedEmailValidationHistory(page));
  }, [dispatch]);

  useEffect(() => {
    getValidationHistory(1);
  }, []);

  useMemo(() => {
    setPhoneNumberValidationTableData(phoneNumberValidationState.data.data);
    setEmailValidationTableData(emailValidationState.data.data);
  }, [phoneNumberValidationState.data, emailValidationState.data] );

  return (
    <div className='result-table-container'>
      <div>
        <h1>Phone Number Validation Result</h1>
        <Table columns={phoneNumberValidationTableColumns} dataSource={phoneNumberValidationTableData} />
      </div>
      <div>
        <h1>Email Validation Result</h1>
        <Table columns={emailValidationTableColumns} dataSource={emailValidationTableData} />
      </div>
    </div>
  );
};