import React, { useState } from "react";

export default function Search(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <input
      type="text"
      placeholder="Search for product"
      value={inputValue}
      onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value);
      }}
    ></input>
  );
}
