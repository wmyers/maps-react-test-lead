export type FormInput = {
  price?: string;
  deposit?: string;
  term?: string;
  interest?: string;
};

export type GenericFormInput = {
  [key: string]: string;
};

export type ComponentProps = {
  boeRate: number;
  searchParams?: FormInput & GenericFormInput;
};
