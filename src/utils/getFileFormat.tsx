import { getFileSrc } from "./fns";

const FORMAT_IMG = ["jpg", "jpeg", "gif", "bmp", "png", "svg", "webp"];
const FORMAT_VIDEO = ["m4v", "avi", "mpg", "mp4", "webm"];
const FORMAT_WORD = ["doc", "docx"];
const FORMAT_EXCEL = ["xls", "xlsx"];
const FORMAT_POWERPOINT = ["ppt", "pptx"];
const FORMAT_PDF = ["pdf"];
const FORMAT_PHOTOSHOP = ["psd"];
const FORMAT_ILLUSTRATOR = ["ai", "esp"];
const FORMAT_ZIP = ["zip"];

function getFileType(fileUrl = "") {
  return (fileUrl && fileUrl.split(".").pop()) || "";
}

export function getFileName(fileUrl: string) {
  return fileUrl
    .substring(fileUrl.lastIndexOf("/") + 1)
    .replace(/\.[^/.]+$/, "");
}

export function getFileFullName(fileUrl: string) {
  return fileUrl.split("/").pop();
}

export function getFileFormat(fileUrl: string) {
  let format;

  switch (fileUrl.includes(getFileType(fileUrl))) {
    case FORMAT_ZIP.includes(getFileType(fileUrl)):
      format = "zip";
      break;
    case FORMAT_IMG.includes(getFileType(fileUrl)):
      format = "image";
      break;
    case FORMAT_VIDEO.includes(getFileType(fileUrl)):
      format = "video";
      break;
    case FORMAT_WORD.includes(getFileType(fileUrl)):
      format = "word";
      break;
    case FORMAT_EXCEL.includes(getFileType(fileUrl)):
      format = "excel";
      break;
    case FORMAT_POWERPOINT.includes(getFileType(fileUrl)):
      format = "powerpoint";
      break;
    case FORMAT_PDF.includes(getFileType(fileUrl)):
      format = "pdf";
      break;
    case FORMAT_PHOTOSHOP.includes(getFileType(fileUrl)):
      format = "photoshop";
      break;
    case FORMAT_ILLUSTRATOR.includes(getFileType(fileUrl)):
      format = "illustrator";
      break;
    default:
      format = getFileType(fileUrl);
  }
  return format;
}

const getIcon = (name: string) => `/file-icons/${name}.svg`;

export function getFileThumb(fileUrl: string): string {
  let thumb;
  switch (getFileFormat(fileUrl)) {
    case "zip":
      thumb = getIcon("format_zip");
      break;
    case "video":
      thumb = getIcon("format_video");
      break;
    case "word":
      thumb = getIcon("format_word");
      break;
    case "excel":
      thumb = getIcon("format_excel");
      break;
    case "powerpoint":
      thumb = getIcon("format_powerpoint");
      break;
    case "pdf":
      thumb = getIcon("format_pdf");
      break;
    case "photoshop":
      thumb = getIcon("format_photoshop");
      break;
    case "illustrator":
      thumb = getIcon("format_ai");
      break;
    case "image":
      thumb = getFileSrc(fileUrl);
      break;
    default:
      thumb = getIcon("format_file");
  }
  return thumb;
}
