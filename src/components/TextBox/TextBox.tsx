import { TextInput, type TextInputProps } from '@gravity-ui/uikit';
import { type ChangeEvent, useId, useState } from 'react';
import { LabelableContainer } from '../LabelableContainer';

export interface TextBoxProps extends Omit<TextInputProps, 'onChange' | 'errorMessage'> {
  onChange?: (value: string) => void;
  error?: string;
  alwaysShowError?: boolean;
  label?: string;
}

export const TextBox = ({ label, size = 'xl', ...props }: TextBoxProps) => {
  const [touched, setTouched] = useState(false);

  const id = useId();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    props.onChange?.(newValue);
  };

  const onBlur = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  const showError = props.alwaysShowError || touched;
  const textbox = (
    <TextInput
      id={id}
      value={props.value}
      size={size}
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      errorMessage={props.error}
      validationState={showError && props.error ? 'invalid' : undefined}
    />
  );

  return label ? <LabelableContainer label={label}>{textbox}</LabelableContainer> : textbox;
};
