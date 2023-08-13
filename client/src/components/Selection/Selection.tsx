// React elements
import React, { MutableRefObject, useRef, useState } from 'react';

// Styled elements
import {
  FormHolder,
  TextFieldStyle,
  DisplayHolder,
  DisplayTitle,
  AmountHolder,
  ButtonHolder,
  FieldHolder
} from './Selection.styles';

// Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';
import DisplayAmount from '../DisplayAmount/DisplayAmount';
import { AnyAction } from '@reduxjs/toolkit';

// Constants
import { DISPLAY_AMOUNT_CHANGE, ENTER, ENTER_AMOUNT, REQUIRED_INSERT } from '../../constants/common';

// Custom hooks
import { useInputChangeHandler, useSubmitHandler } from './Selection.hooks';

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
  const onSubmit = useSubmitHandler({
    amountRef,
    submitAllowed,
    dispatch
  });

  // custom hook that handles the change
  const handleOnChange = useInputChangeHandler(amountRef, setSubmitAllowed);

  return (
    <form
      data-testid="form"
      data-cy="form"
      onSubmit={handleSubmit(() => {
        onSubmit();
      })}>
      <FormHolder>
        <FieldHolder>
          <TextFieldStyle
            id="filled-basic"
            data-testid="providerTest"
            label={ENTER_AMOUNT}
            variant="filled"
            inputRef={amountRef}
            {...register('provider', { required: true, minLength: 1 })}
            onChange={() => handleOnChange()}
            helperText={REQUIRED_INSERT}
            error={!!errors?.provider}
          />
        </FieldHolder>

        <ButtonHolder variant="contained" disabled={!submitAllowed} type="submit">
          {ENTER}
        </ButtonHolder>

        <DisplayTitle>{DISPLAY_AMOUNT_CHANGE}</DisplayTitle>
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
