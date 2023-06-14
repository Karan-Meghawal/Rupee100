import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

// ----------------------------------------------------------------------

interface Props<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

export default function RHFProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
}: Props<T>) {
  return (
    <FormProvider {...methods}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}
