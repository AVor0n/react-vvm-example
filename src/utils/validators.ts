export const required = () => (value?: string) => {
  if (value?.trim()) return false;
  return 'This field is required.';
};

export const minLength = (min: number) => (value: string) => {
  if (value.length >= min) return false;
  return `String must contain more than ${min} chars`;
};

export const maxValue = (max: number) => (value: number) => {
  if (value <= max) return false;
  return `The value must be not more than ${max}`;
};

export const email = () => (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) return false;
  return 'Invalid email format.';
};
