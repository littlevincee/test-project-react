import React, { useState, useCallback } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { CountryCodeList } from '../../shared/countryCode';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { verifyPhoneNumber, selectPhoneNumberValidator } from '../../redux/phoneNumberValidatorSlice/phoneNumberValidatorSlice';
import { verifyEmail, selectEmailValidator } from '../../redux/emailValidatorSlice/emailValidatorSlice';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const generateDropDownOption = (opt: {key: string | number, value: string}[]) => {
  if (opt) {
    return opt.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>);
  }

  return <Option value="">{}</Option>;
};

export const ValidationForm = ( ) =>{
  const phoneNumberValidationState = useAppSelector(selectPhoneNumberValidator);
  const emailValidationState = useAppSelector(selectEmailValidator);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [validationHistory, setValidationHistory] = useState<Array<any>>([]);

  const validation = useCallback((countryCode: string, phoneNumber: number, email: string) => {
    dispatch(verifyPhoneNumber({countryCode, phoneNumber}));
    dispatch(verifyEmail({email}));
  }, [dispatch]);

  const onFinish = (values: any) => {
    const countryCodeInput = values.countryCode;
    const phoneNumberInput = values.phoneNumber;
    const emailInput = values.email;

    const key = validationHistory.length + 1;

    const countryCode = CountryCodeList.find(e => e.key === countryCodeInput);

    const data = {
      key: key,
      value: `phone number: ${countryCode!.value} ${phoneNumberInput}. email: ${emailInput}`,
      ref: values
    };

    setValidationHistory(oldArray => [...oldArray, data]);

    validation(countryCodeInput, phoneNumberInput, emailInput);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onHistorySelectChange = (value: number) => {
    const data = validationHistory.find(e => e.key === value);
    form.setFieldsValue({
      countryCode: data.ref.countryCode,
      phoneNumber: data.ref.phoneNumber,
      email: data.ref.email
    });
  };

  return (
    <>
      <div className="form-page-container" >
        <div className="result-container">
          <div>
            <h1>Phone Number Validation Result: {phoneNumberValidationState.phoneNumberValidationStatus} {phoneNumberValidationState.message}</h1>
            <h1>Email Validation Result: {emailValidationState.emailValidationStatus} {emailValidationState.message}</h1>
          </div>
        </div>
        <Form {...layout} form={form} name="validator" onFinish={onFinish}>
          <Form.Item name="countryCode" label="Country Code" rules={[{ required: true }]}>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Select a country code"
              allowClear>
              { generateDropDownOption(CountryCodeList) }
            </Select>
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Phone Number is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Email is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="history" label="History">
            <Select placeholder="Select a previously validated data" allowClear onChange={onHistorySelectChange}>
              { generateDropDownOption(validationHistory) }
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="button" onClick={onReset}>
          Reset
            </Button>
            <Button type="primary" htmlType="submit">
          Validate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};