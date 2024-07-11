/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, FocusEvent, PropsWithChildren, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { TextBox, type TextBoxProps } from '../TextBox';
import type { FormSchema } from '@yoskutik/mobx-form-schema';

interface ComponentRequiredProps<TValue> {
  onChange?: (value: TValue) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: string | true;
  value?: TValue;
  name?: string;
}

interface FieldOwnProps<T, TValue, TObject extends FormSchema> extends ComponentRequiredProps<TValue> {
  /** Компонент поля ввода */
  component?: ComponentType<T>;
  /** Модель представления */
  object: TObject;
  /** Путь к полю с данными, к которому производится привязка */
  bind: keyof TObject['presentation'];
  /** Флаг постоянного отображения ошибки. */
  alwaysShowError?: boolean;
}

type FieldProps<T, TValue, TObject extends FormSchema> = PropsWithChildren<
  FieldOwnProps<T, TValue, TObject> & Omit<T, keyof ComponentRequiredProps<TValue>>
>;

/** Обертка для полей ввода, реализующая двустороннюю привязку к полям модели представления */
export const Field = observer(
  <T = TextBoxProps, TValue = string, TObject extends FormSchema = FormSchema>({
    component = TextBox as any,
    onChange,
    onBlur,
    object,
    bind,
    name,
    error = object.errors?.[bind],
    ...props
  }: FieldProps<T, TValue, TObject>) => {
    const Component = component as ComponentType<any>;
    const [visited, setVisited] = useState(false);

    const compName = name || bind.toString().split('.')[0];
    const onValueChange = (value: any) => {
      runInAction(() => (object[bind] = value));
      setVisited(true);
      onChange && onChange(value);
    };

    const onFieldBlur = (event: FocusEvent<HTMLInputElement>) => {
      component === TextBox && onValueChange((object[bind] as any)?.trim());
      setVisited(true);
      onBlur && onBlur(event);
    };

    useEffect(() => {
      setVisited(false);
    }, [object]);

    return (
      <Component
        error={(visited || props.alwaysShowError) && error !== true && error}
        onBlur={onFieldBlur}
        name={compName}
        value={object[bind] ?? ''}
        onChange={onValueChange}
        {...props}
      />
    );
  },
);
