import React, { useCallback } from 'react';
import styled from 'styled-components';
import Input from './Input';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  maxLength?: number
};

type Event = React.KeyboardEvent<HTMLInputElement>;

const Root = styled(Input)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

const exeededMaxLength = (ev: Event, maxLength?: number) => (
  maxLength &&
  !ev.ctrlKey &&
  /[0-9]/.test(ev.key) &&
  ev.currentTarget.value.length > maxLength
);

// A regular input[type=number], but without arrows, and prevents user from using
// arrow keys to increment or decrement the value.
//
// I could have gone the other way around and built a input[type=string] that only accepts numbers.
//
// Also accepts maxLength property which is normally ignored by input[type=number].
//
// There's a lot of usage edge cases associated with this component.
// For simplicity's sake I covered only some.
const NumericInput = ({
  onKeyDown: externalOnKeyDown,
  maxLength,
  ...props
}: Props) => {
  const onKeyDown = useCallback((ev: Event) => {
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown' || exeededMaxLength(ev, maxLength)) {
      ev.preventDefault();
    };

    externalOnKeyDown && externalOnKeyDown(ev);
  }, [externalOnKeyDown]);

  return (
    <Root
      {...props}
      type='number'
      onKeyDown={onKeyDown}
    />
  );
};

export default NumericInput;
