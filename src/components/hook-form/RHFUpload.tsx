import {
  FILE_EXTENSIONS_WITH_MIME,
  type FILE_EXTENSIONS_TYPE,
  MAXIMUM_FILE_SIZE_BYTES,
} from "@/config";
import useUploadFile, { type FileExtensions } from "@/hooks/useUploadFile";
import { Box, FormHelperText, LinearProgress } from "@mui/material";
import { useCallback, useMemo } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type PathValue,
  type UseControllerProps,
  type UseFormGetValues,
  type UseFormSetValue,
} from "react-hook-form";
import { toast } from "react-toastify";
import { UploadAvatar, UploadMultiFile, UploadSingleFile } from "../upload";

export const extToMime = (exts: FILE_EXTENSIONS_TYPE[]) =>
  exts.map((val) => FILE_EXTENSIONS_WITH_MIME[val]);

export function RHFUploadAvatar<T extends FieldValues>({
  name,
  setValue,
  onSuccess,
  ...other
}: {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  onSuccess?: (file: string) => void;
} & UseControllerProps) {
  const accept: FileExtensions = useMemo(
    () => ["PNG", "JPG", "WEBP", "JPEG"],
    [],
  );

  const { control } = useFormContext();
  const { uploadFile, progress } = useUploadFile(accept);

  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const mimeType = file.type;
        if (!mimeType) return toast.error("Invalid File. Mime Type not found");
        const acceptedMimeTypes = extToMime(accept);

        if (!acceptedMimeTypes.includes(mimeType)) {
          return toast.error(`Only ${accept.join(",")} formats are allowed`);
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
          const { fileUrl } = await uploadFile(formData);
          setValue(name, fileUrl as PathValue<T, Path<T>>);
          onSuccess?.(fileUrl);
        } catch (error) {
          /* empty */
        }
      }
      return undefined;
    },
    [accept, name, onSuccess, setValue, uploadFile],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <div>
            <UploadAvatar
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onDrop={handleDropSingleFile}
              error={checkError}
              file={field.value as string}
              progress={progress}
              accept={accept}
              maxSize={MAXIMUM_FILE_SIZE_BYTES}
              {...other}
            />
            {checkError && (
              <FormHelperText
                error
                sx={{ px: 2, textAlign: "center" }}
              >
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

export function RHFUploadSingleFile<T extends FieldValues>({
  name,
  setValue,
  accept = ["PNG", "JPG", "WEBP", "JPEG"],
  onSuccess,
  ...other
}: {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  accept?: FileExtensions;
  onSuccess?: (file: string) => void;
  [x: string]: unknown;
}) {
  const { control } = useFormContext();
  const { uploadFile, progress } = useUploadFile(accept);

  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (accept !== "any") {
          const mimeType = file.type;
          if (!mimeType)
            return toast.error("Invalid File. Mime Type not found");
          const acceptedMimeTypes = extToMime(accept);

          if (!acceptedMimeTypes.includes(mimeType)) {
            return toast.error(`Only ${accept.join(",")} formats are allowed`);
          }
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
          const { fileUrl } = await uploadFile(formData);
          setValue(name, fileUrl as PathValue<T, Path<T>>);
          onSuccess?.(fileUrl);
        } catch (error) {
          /* empty */
        }
      }
      return undefined;
    },
    [accept, name, onSuccess, setValue, uploadFile],
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;
        return (
          <UploadSingleFile
            accept={accept}
            file={field.value as string}
            error={checkError}
            progress={progress}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onDrop={handleDropSingleFile}
            maxSize={MAXIMUM_FILE_SIZE_BYTES}
            helperText={
              checkError && (
                <FormHelperText
                  error
                  sx={{ px: 2 }}
                >
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

export function RHFUploadMultiFile<T extends FieldValues>({
  name,
  accept = ["PNG", "JPG", "WEBP", "JPEG"],
  setValue,
  getValues,
  maxFiles = 5,
  ...other
}: {
  accept?: FileExtensions;
  name: Path<T>;
  maxFiles?: number;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
}) {
  const { control } = useFormContext();
  const { uploadFile, progress } = useUploadFile(accept);
  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const files = getValues(name) as string[];
      const totalLength = files.length + acceptedFiles.length;
      if (files?.length >= maxFiles || totalLength > maxFiles) {
        return toast.error(`Maximum ${maxFiles} files are allowed`);
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const file of acceptedFiles) {
        const allFiles = getValues(name) as string[];
        if (accept !== "any") {
          const mimeType = file.type;
          if (!mimeType)
            return toast.error("Invalid File. Mime Type not found");
          const acceptedMimeTypes = extToMime(accept);

          if (!acceptedMimeTypes.includes(mimeType)) {
            return toast.error(`Only ${accept.join(",")} formats are allowed`);
          }
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
          const { fileUrl } = await uploadFile(formData);
          setValue(name, [...allFiles, fileUrl] as PathValue<T, Path<T>>);
        } catch (error) {
          /* empty */
        }
      }
      return undefined;
    },
    [accept, getValues, maxFiles, name, setValue, uploadFile],
  );

  const handleRemove = (file: string) => {
    const files = getValues(name) as string[];
    const filteredItems = files?.filter((_file: string) => _file !== file);
    setValue(name, filteredItems as PathValue<T, Path<T>>);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {!!progress && (
        <Box>
          <LinearProgress
            sx={{
              width: 1,
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
            variant="determinate"
            value={progress}
          />
        </Box>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const checkError = !!error && (field.value as string[])?.length === 0;
          return (
            <UploadMultiFile
              accept={accept}
              files={field.value as string[]}
              error={checkError}
              maxFiles={maxFiles}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onDrop={handleDrop}
              onRemove={handleRemove}
              helperText={
                checkError && (
                  <FormHelperText
                    error
                    sx={{ px: 2 }}
                  >
                    {error?.message}
                  </FormHelperText>
                )
              }
              {...other}
            />
          );
        }}
      />
    </Box>
  );
}
