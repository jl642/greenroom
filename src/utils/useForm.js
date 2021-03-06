import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [values, (e) => {
    setValues({ ...values, [e.targe.name]: e.target.value });
  }];
};

export default useForm;
