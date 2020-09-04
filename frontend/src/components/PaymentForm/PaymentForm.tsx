import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import usePaymentCreation from './usePaymentCreation';

import CreditCardField from '../CreditCardField';
import Input from '../Input';
import FormField from '../FormField';
import Button from '../Button';

import ErrorMessages from './ErrorMessages';

type Props = {
  onSuccess: (payment: Payment) => void
};

const Root = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: whitesmoke;
  border-radius: 8px;
  align-self: center;

  & > :not(:last-child) {
    margin-bottom: 16px;
  }
`

const PaymentForm = ({ onSuccess }: Props) => {
  const [creditCard, setCreditCard] = useState<CreditCard>({});
  const [amount, setAmount] = useState<string>();

  // This is how I hid (I mean, encapsulated) the API consumption behavior.
  // If we continued to consume this API with the same format, we would generalize
  // this into a reusable hook for other components.
  const { perform, errors, submitting } = usePaymentCreation();

  const onSubmit = useCallback(async ev => {
    ev.preventDefault();
    const payment = await perform({ creditCard, amount });
    onSuccess(payment);
    setCreditCard({})
    setAmount('');
    alert('Thank your for donating!');
  }, [perform, creditCard, amount, onSuccess]);

  return (
    <Root onSubmit={onSubmit}>
      <ErrorMessages errors={errors} />

      <FormField label='Donation amount (USD)' htmlFor='amount' >
        <Input
          id='amount'
          type='number'
          value={amount}
          onChange={ev => setAmount(ev.target.value)}
        />
      </FormField>

      <CreditCardField value={creditCard} onChange={setCreditCard} />

      <Button type='submit' disabled={submitting}>
        {submitting ? 'submitting ...' : 'Confirm'}
      </Button>
    </Root>
  );
}

export default PaymentForm;
