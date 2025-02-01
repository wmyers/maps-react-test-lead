export type FormInput = {
  price: string;
  deposit: string;
  term: string;
  interest: string;
};

export type ComponentProps = {
  boeRate?: number;
  inputValues: FormInput;
};
