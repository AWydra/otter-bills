import type { HTMLProps, ReactElement } from 'react';
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface IProps extends HTMLProps<HTMLInputElement> {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutoWidthInput = forwardRef(
  (
    { value, onChange, ...props }: IProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const [visible, setVisible] = useState(false);
    const [width, setWidth] = useState<number>(0);
    const measurer = useRef<HTMLElement>(null);

    useEffect(() => {
      setVisible(true);
    }, [value]);

    useLayoutEffect(() => {
      if (visible && measurer.current) {
        const rect = measurer.current.getBoundingClientRect();
        setWidth(rect.width < 10 ? 10 : rect.width);
        setVisible(false);
      }
    }, [visible]);

    return (
      <>
        <span ref={measurer}>{visible ? value : null}</span>
        <input
          {...props}
          ref={ref}
          type="text"
          value={value}
          style={{ width }}
          onChange={(ev) => {
            if (onChange) onChange(ev);
          }}
        />
      </>
    );
  },
);

AutoWidthInput.displayName = 'AutoWidthInput';

export default AutoWidthInput;
