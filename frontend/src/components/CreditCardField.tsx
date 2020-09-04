import React, { useEffect } from 'react';
import styled from 'styled-components';

import Input from './Input';
import NumericInput from './NumericInput';
import FormField from './FormField';

type Props = {
  onChange: (cc: CreditCard) => void,
  value: CreditCard
};

const Root = styled.div`
  display: flex;

  > :not(:last-child) {
    margin-right: 8px;
  }
`

const CreditCardField = ({ value: cc, onChange }: Props) => (
  <Root>
    <FormField label='Card Number' htmlFor='card-number'>
      <NumericInput
        id='card-number'
        value={cc.number || ''}
        onChange={ev => onChange({ ...cc, number: ev.target.value })}
        maxLength={20}
      />
    </FormField>

    {/*
      Here I could have used a select with a list of months and year.
      For simplicity's sake I just used a numeric input.
      In fact I remember using a lot of credit card forms that work like this,
      and it can be arguably be considered better UX than a select
    */}

    <FormField label='Expiration' htmlFor='exp-month'>
      <Input
        id='exp-month'
        value={cc.expMonth || ''}
        onChange={ev => onChange({ ...cc, expMonth: ev.target.value })}
        maxLength={2}
        style={{ width: '40px' }}
        placeholder='mm'
      />

      <Input
        id='exp-year'
        value={cc.expYear || ''}
        onChange={ev => onChange({ ...cc, expYear: ev.target.value })}
        maxLength={2}
        style={{ width: '40px' }}
        placeholder='yy'
      />
    </FormField>

    <FormField label='CVC' htmlFor='cvc'>
      <Input
        id='cvc'
        value={cc.cvc || ''}
        onChange={ev => onChange({ ...cc, cvc: ev.target.value })}
        maxLength={3}
        style={{ width: '70px' }}
      />
    </FormField>
  </Root>
);

export default CreditCardField;
