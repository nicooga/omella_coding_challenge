import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import Backend from '../Backend';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: whitesmoke;
  padding: 8px;

  & > :not(:last-child) {
    margin-bottom: 16px;
    border-bottom: 1px solid lightgrey;
  }
`

const Table = styled.table`
  border-spacing: 8px;
`

const Status = styled.div`
  border-radius: 8px;
  padding: 5px 8px;
  background-color: lightgrey;
  color: grey;
`

const PaymentsList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    (async () => {
      const response = await Backend.getPayments()
      if (response.success) { setPayments(response.data); }
    })();
  }, []);

  return (
    <Root>
      <Table>
        <thead>
          <tr>
            <th>Stripe ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <th>{p.stripe_id}</th>
              <th>${p.amount}</th>
              <th><Status>{p.status}</Status></th>
              <th>{p.created_at}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Root>
  );
};

export default PaymentsList;
