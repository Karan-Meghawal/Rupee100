import {
  useFieldArray,
  useFormContext,
  type ArrayPath,
  type FieldArray,
  type FieldValues,
} from "react-hook-form";

const useFormRepeater = <T extends FieldValues>({
  name,
  append: appendData,
}: {
  name: ArrayPath<T>;
  append: FieldArray<T, ArrayPath<T>> | FieldArray<T, ArrayPath<T>>[];
}) => {
  const { control } = useFormContext<T>();
  const { fields, append, remove, replace } = useFieldArray<T>({
    control,
    name,
  });

  const onAddField = (
    data?: FieldArray<T, ArrayPath<T>> | FieldArray<T, ArrayPath<T>>[],
  ) => {
    append(data ?? appendData);
  };
  const onRemoveField = (index: number) => remove(index);

  return {
    fields,
    replace,
    onAddField,
    onRemoveField,
  };
};

export default useFormRepeater;
