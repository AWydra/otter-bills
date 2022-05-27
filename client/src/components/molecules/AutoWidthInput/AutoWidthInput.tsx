import React, { ReactElement } from 'react';

interface InputDynamicWidthProps extends React.HTMLProps<HTMLInputElement> {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutoWidthInput = React.forwardRef(
  (
    { value, onChange, ...props }: InputDynamicWidthProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const [visible, setVisible] = React.useState(false);
    const [width, setWidth] = React.useState<number>(0);
    const measurer = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
      setVisible(true);
    }, [value]);

    React.useLayoutEffect(() => {
      if (visible && measurer?.current) {
        const rect = measurer.current.getBoundingClientRect();
        setWidth(rect.width < 10 ? 10 : rect.width);
        setVisible(false);
      }
    }, [visible]);

    return (
      <>
        <span ref={measurer}>{visible && value}</span>
        <input
          {...props}
          ref={ref}
          type="text"
          value={value}
          style={{ width }}
          onChange={(ev) => {
            if (onChange) onChange(ev);
          }}
          placeholder="0"
        />
      </>
    );
  },
);

export default AutoWidthInput;
