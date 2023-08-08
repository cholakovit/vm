// React elements
import React, { MutableRefObject, useRef, useState } from 'react';

// MUI elements
import { Button, TextField } from '@mui/material';

// Styled elements
import { FormHolder, AmountHolder, ButtonHolder, FieldHolder } from './Selection.styles';

// Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';
import DisplayAmount from '../DisplayAmount/DisplayAmount';

// Constants
import { ENTER } from '../../constants/common';
import { useInputChangeHandler, useSubmitHandler } from '../../hooks/customHooks';
import { AnyAction } from '@reduxjs/toolkit';

const Selection = () => {
  const [submitAllowed, setSubmitAllowed] = useState<boolean>(false);
  const amountRef = useRef() as MutableRefObject<HTMLInputElement>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch: React.Dispatch<AnyAction> = useDispatch();

  // By using the custom hooks, I have encapsulated the specific logic for form submission and input change in separate hooks, 
  // making my code cleaner and more reusable. Now, the logic for handling the form submission and input change is abstracted 
  // away in the custom hooks, and I can easily reuse these hooks in other components if needed.

  // custom hook that handles the submit of the form
  const onSubmit = useSubmitHandler(amountRef, submitAllowed, dispatch);

  // custom hook that handles the change 
  const handleOnChange = useInputChangeHandler(amountRef, setSubmitAllowed);

  return (
    <form
      data-cy="form"
      onSubmit={handleSubmit(() => {
        onSubmit();
      })}>
        <FormHolder>
          <FieldHolder>
            <TextField
              id="filled-basic"
              data-testid="providerTest"
              label="Enter Amount..."
              variant="filled"
              inputRef={amountRef}
              {...register('provider', { required: true, minLength: 1 })}
              onChange={() => handleOnChange()}
              helperText="Required! Please insert amount"
              error={!!errors?.provider}
            />
          </FieldHolder>

          <ButtonHolder>
            <AmountHolder>
              <DisplayAmount />
            </AmountHolder>
            <Button variant="contained" disabled={!submitAllowed} type="submit">
              {ENTER}
            </Button>
          </ButtonHolder>
      </FormHolder>
    </form>
  );
};

export default Selection;
