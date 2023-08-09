// React elements
import React, { MutableRefObject, useRef, useState } from 'react';

// MUI elements
import { Button, TextField } from '@mui/material';

// Styled elements
import { FormHolder, DisplayHolder, DisplayTitle, AmountHolder, ButtonHolder, FieldHolder } from './Selection.styles';

// Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';
import DisplayAmount from '../DisplayAmount/DisplayAmount';
import { AnyAction } from '@reduxjs/toolkit';

// Constants
import { ENTER } from '../../constants/common';

// Custom hooks
import { useInputChangeHandler, useSubmitHandler } from '../../hooks/customHooks';


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
              label="Enter Amount: $..."
              variant="filled"
              inputRef={amountRef}
              {...register('provider', { required: true, minLength: 1 })}
              onChange={() => handleOnChange()}
              helperText="Required! Please insert $"
              error={!!errors?.provider}
            />
          </FieldHolder>

          <ButtonHolder variant="contained" disabled={!submitAllowed} type="submit">
            {ENTER}
          </ButtonHolder>          

          <DisplayTitle>Display amount and returned change</DisplayTitle>
          <DisplayHolder>
            <AmountHolder>
              <DisplayAmount />
            </AmountHolder>
          </DisplayHolder>
      </FormHolder>
    </form>
  );
};

export default Selection;
