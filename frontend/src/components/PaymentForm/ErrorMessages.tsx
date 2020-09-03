import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  errors: BackendResponseErrorMessages
};

const Root = styled.div`
  background-color: tomato;
  border-radius: 8px;
  padding: 16px;
  & > :not(:last-child) {
    margin-bottom: 16px;
  }
`

const ErrorMessages = ({ errors }: Props) => {
  console.log({ errors })

  if (Object.keys(errors).length === 0) { return null; }

  return (
    <Root>
      <h2>Errors:</h2>

      {Object.entries(errors).map(([attribute, messages]) => (
        <>
          <label>{attribute}</label>
          <ul key={attribute}>
            {messages.map((m, i) => (<li key={i}>{m}</li>))}
          </ul>
        </>
      ))}
    </Root>
  )
};

export default ErrorMessages;
