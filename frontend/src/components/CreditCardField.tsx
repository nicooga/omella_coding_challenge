import React, { useEffect } from 'react';
import styled from 'styled-components';

import useEventValueCollector from '../hooks/useEventValueCollector';

import Input from './Input';
import NumericInput from './NumericInput';
import FormField from './FormField';

type Props = { onChange: (cc: CreditCard) => void };

const Root = styled.div`
  display: flex;

  > :not(:last-child) {
    margin-right: 8px;
  }
`

const CreditCardField = ({ onChange }: Props) => {
  const [number, onNumberChange] = useEventValueCollector();
  const [expMonth, onExpMonthChange] = useEventValueCollector();
  const [expYear, onExpYearChange] = useEventValueCollector();
  const [cvc, onCvcChange] = useEventValueCollector();

  useEffect(() => {
    onChange({ number, expMonth, expYear, cvc });
  }, [number, expMonth, expYear, cvc]);

  return (
    <Root>
      <FormField label='Card Number' htmlFor='card-number'>
        <NumericInput
          id='card-number'
          onChange={onNumberChange}
          maxLength={20}
        />
      </FormField>

      {/*
        Here I could have used a select with a pre-selection for month and year.
        For simplicity's sake I just used a numeric input.
        In fact I remember using a lot of credit card forms that work like this,
        and it can be arguably be considered better UX than a select because of it's simplicity.
      */}

      <FormField label='Exp. Month' htmlFor='exp-month'>
        <Input
          id='exp-month'
          onChange={onExpMonthChange}
          maxLength={2}
          style={{ width: '70px' }}
          placeholder='mm'
        />
      </FormField>

      <FormField label='Exp. Year' htmlFor='exp-year'>
        <Input
          id='exp-year'
          onChange={onExpYearChange}
          maxLength={4}
          style={{ width: '70px' }}
          placeholder='yyyy'
        />
      </FormField>

      <FormField label='CVC' htmlFor='cvc'>
        <Input
          id='cvc'
          onChange={onCvcChange}
          maxLength={3}
          style={{ width: '70px' }}
        />
      </FormField>
    </Root>
  );
};

export default CreditCardField;
