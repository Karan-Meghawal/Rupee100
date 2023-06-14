import { APP_URL, type FILE_EXTENSIONS_TYPE } from "@/config";
import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export type FileExtensions = FILE_EXTENSIONS_TYPE[] | "any";

export const Axios = axios.create({
  baseURL: `${APP_URL}/api`,
});

type FileOutput = {
  fileName: string;
  fileUrl: string;
};

export const PostUploadFile = (
  formData: FormData,
  headers: AxiosRequestConfig,
) => Axios.post<FileOutput>("/upload", formData, headers);

const useUploadFile = (accept: FileExtensions) => {
  const [progress, setProgress] = useState(0);
  const uploadFile = async (formData: FormData) => {
    try {
      const { data } = await PostUploadFile(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Accept": accept,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progressVal =
            (progressEvent.loaded / (progressEvent.total ?? 0)) * 100;
          setProgress(progressVal);
        },
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error Uploading File->${error.message}`);
      }
      throw error;
    } finally {
      setProgress(0);
    }
  };
  return { uploadFile, progress };
};

export default useUploadFile;
