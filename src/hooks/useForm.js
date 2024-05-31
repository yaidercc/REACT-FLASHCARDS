import { useState } from "react";
export const useForm = (initialValue = {}) => {
  const [formState, setFormState] = useState(initialValue);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(`${name}:${value}`);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return {
    ...formState,
    formState,
    onInputChange
  };
};
