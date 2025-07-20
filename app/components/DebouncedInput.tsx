import React, { useEffect, useMemo, useState, useRef, InputHTMLAttributes } from 'react';
import { debounce } from '@/utils/debounce';

type DebouncedInputProps = {
  onDebouncedChange: (value: string) => void;
  validate?: (value: string) => string | null;
  delay?: number;
  value?: string | number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  onDebouncedChange,
  validate,
  delay = 400,
  value: externalValue,
  disabled,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string>(externalValue?.toString() ?? '');
  const lastExternalValue = useRef<string | number | undefined>(externalValue);

  // Store callback in ref to maintain stable reference
  const callbackRef = useRef(onDebouncedChange);
  callbackRef.current = onDebouncedChange;

  // Create debounced function with stable callback reference
  const debouncedChange = useMemo(
    () => debounce((value: string) => callbackRef.current(value), delay),
    [delay]
  );

  // Update internal value when external value changes
  useEffect(() => {
    if (externalValue !== undefined && externalValue !== lastExternalValue.current) {
      setInternalValue(externalValue.toString());
      lastExternalValue.current = externalValue;
    }
  }, [externalValue]);

  // Trigger debounced change when internal value changes
  useEffect(() => {
    if (!disabled) {
      debouncedChange(internalValue);
    }
  }, [internalValue, disabled, debouncedChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const nextValue = e.target.value;

    if (validate) {
      const validated = validate(nextValue);
      if (validated !== null) {
        setInternalValue(validated);
      }
    } else {
      setInternalValue(nextValue);
    }
  };

  return <input {...rest} disabled={disabled} value={internalValue} onChange={handleChange} />;
};
