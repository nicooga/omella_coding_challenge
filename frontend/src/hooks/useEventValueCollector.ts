import React, { useState, useCallback } from 'react';

type Event = React.ChangeEvent<HTMLInputElement>;
type EventCallback = (ev: Event) => void;

// I could have used a form utility library like react-final-form (overkill),
// or even just defined each onChange handler manually (not DRY).
// I think this is a nice middle ground.
//
// Here I have to declare the return type explicitly because otherwise
// Typescript will infer a union type instead of a tuple type.
const useEventValueCollector = (): [
  string | undefined,
  EventCallback,
  (v: string) => void
] => {
  const [value, setValue] = useState<string>();

  const onChange = useCallback<EventCallback>(
    (ev: Event) => setValue(ev.target.value),
    [setValue]
  );

  return [value, onChange, setValue];
};

export default useEventValueCollector;
