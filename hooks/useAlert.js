import React, { useState } from "react";

const useAlert = (intialvisible) => {
  const [value, setValue] = useState(intialvisible);
  const onChange = (visible) => {
    setValue(visible);
  };
  return { value, onChange };
};

export default useAlert;
