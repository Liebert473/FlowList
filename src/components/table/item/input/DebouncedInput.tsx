import { useState, useEffect } from "react";
interface Props {
  initialVal: any;
  onChange: (changes: any) => void;
}

export default function DebouncedInput({ initialVal, onChange }: Props) {
  const [value, setValue] = useState(initialVal);
  const [debouncedValue, setDebouncedValue] = useState(initialVal);

  // Update local input immediately
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(initialVal);
  }, [initialVal]);

  // Debounce logic: wait 500ms after the user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 500); // adjust delay

    return () => clearTimeout(timeout);
  }, [value]);

  // When the debounced value changes → call parent callback (fetch/update DB)
  useEffect(() => {
    if (debouncedValue !== initialVal) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <input
      value={value}
      onChange={handleChange}
      className="outline-none rounded flex flex-1 text-fl-text"
      placeholder="Type something..."
    />
  );
}
