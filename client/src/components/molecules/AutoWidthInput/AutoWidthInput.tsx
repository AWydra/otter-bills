import React, { ReactElement } from 'react';

interface InputDynamicWidthProps extends React.HTMLProps<HTMLInputElement> {
  initialValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutoWidthInput = ({
  initialValue = '',
  onChange,
  ...props
}: InputDynamicWidthProps): ReactElement => {
  const [value, setValue] = React.useState(initialValue);
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
        type="text"
        value={value}
        style={{ width }}
        onChange={(ev) => {
          const evValue = ev.target.value;
          setValue(evValue);
          if (onChange) onChange(ev);
        }}
        placeholder="0"
      />
    </>
  );
};

export default AutoWidthInput;
