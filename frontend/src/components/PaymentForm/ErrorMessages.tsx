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

const Label = styled.label`
  font-weight: bold;
`

// I know I can do better job showing errors.
// I kept it simple.
const ErrorMessages = ({ errors }: Props) => {
  console.log({ errors })

  if (Object.keys(errors).length === 0) { return null; }

  return (
    <Root>
      <h2>Errors:</h2>

      {Object.entries(errors).map(([attribute, messages]) => (
        <div key={attribute}>
          {attribute !== 'base' && (<Label>{attribute}</Label>)}
          {messages.map((m, i) => (<div key={i}>{m}</div>))}
        </div>
      ))}
    </Root>
  )
};

export default ErrorMessages;
