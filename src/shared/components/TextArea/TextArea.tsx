import React from "react";
import { Input, InputProps } from "shared/components/Input";

export type TextAreaProps = Omit<InputProps, "rows" | "multiline" | "type">;

const TextArea = (props: TextAreaProps) => {
  return <Input rows={3} multiline {...props} />;
};

export { TextArea };
