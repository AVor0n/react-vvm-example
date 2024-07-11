import { PasswordInput, PasswordInputProps } from '@gravity-ui/components';
import { useState } from 'react';

interface PasswordProps extends Omit<PasswordInputProps, 'errorMessage' | 'onUpdate' | 'onChange'> {
  error?: string;
  onChange: (value: string) => void;
  alwaysShowError?: boolean;
}

export const Password = ({ onChange, ...props }: PasswordProps) => {
  const [touched, setTouched] = useState(false);

  const onBlur = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  const showError = props.alwaysShowError || touched;

  return (
    <PasswordInput
      {...props}
      onUpdate={onChange}
      onBlur={onBlur}
      errorMessage={props.error}
      validationState={showError && props.error ? 'invalid' : undefined}
    />
  );
};
