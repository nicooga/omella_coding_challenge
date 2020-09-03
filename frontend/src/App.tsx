import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import PaymentForm from './components/PaymentForm';
import PaymentsList from './components/PaymentsList';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const App = () => {
  const [paymentsListKey, setPaymentsListKey] = useState<number>(0);

  const resetPaymentsList =
    useCallback(() => setPaymentsListKey(new Date().getTime()), []);

  return (
    <Root>
      <Container>
        <h1>Donate here</h1>

        <PaymentForm onSuccess={resetPaymentsList} />

        <h1>Public donations list</h1>

        {/*
          Changing the key is a way to force a children component to re-render.
          We could solve the re-render/global_state problem using Redux, RxJS or a shared React context.
          Again, for a simple demo I think this is enough.
        */}
        <PaymentsList key={paymentsListKey} />
      </Container>
    </Root>
  );
}

export default App;
