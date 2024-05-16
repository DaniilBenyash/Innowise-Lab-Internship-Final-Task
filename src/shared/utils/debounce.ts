import { debounce as debounceLodash } from "lodash";

const debounce = (callback: () => void) => {
  return debounceLodash(callback, 300);
};

export { debounce };
