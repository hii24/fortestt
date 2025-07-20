import React, { useEffect, useMemo, useState } from 'react';
import { Input, InputProps } from 'antd';
import { debounce } from '@/utils/debounce';
import clsx from 'clsx';

type SearchInputProps = InputProps & {
  onDebouncedChange: (value: string) => void;
  value?: string;
  delay?: number;
  className?: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  onDebouncedChange,
  delay = 500,
  className,
  ...rest
}) => {
  const [value, setValue] = useState(rest?.value ?? '');

  const debouncedChange = useMemo(() => debounce(onDebouncedChange, delay), [onDebouncedChange, delay]);

  useEffect(() => {
    debouncedChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      {...rest}
      value={value}
      className={clsx('!text-[16px] font-[400]', className)}
      autoComplete="nope"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
