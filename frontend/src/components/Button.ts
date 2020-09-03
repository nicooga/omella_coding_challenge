import styled from 'styled-components';

const Button = styled.button`
  border-radius: 8px;
  background-color: lightgrey;
  color: black;
  padding: 8px;
  border-width: 0;
  font-weight: bold;
  font-size: 20px;
  transition: all 300ms;

  &:disabled {
    color: whitesmoke;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover:not(:disabled) {
    background-color: grey;
    color: white;
  }
`;

export default Button;
