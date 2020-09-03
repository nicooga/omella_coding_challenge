import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode,
  label: string,
  htmlFor?: string
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 5px;
  cursor: pointer;
  font-weight: bold;
  color: grey;
`

const FormField = ({ children, label, htmlFor }: Props) => (
  <Root>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
  </Root>
);

export default FormField;
