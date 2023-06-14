import { ALLOWED_FILE_TYPES, FILE_EXTENSIONS_WITH_MIME } from "@/config";
import crypto from "crypto";
import { IncomingForm, type File } from "formidable";
import { type NextApiRequest, type NextApiResponse } from "next";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // check if x-accept header is present
    const AcceptExtensions = req.headers["x-accept"];
    if (typeof AcceptExtensions !== "string")
      throw new Error("Invalid Accept header");

    // check if x-accept header is valid
    const isAcceptValid = AcceptExtensions.split(",").every((val) =>
      ALLOWED_FILE_TYPES.includes(val),
    );

    if (!isAcceptValid && AcceptExtensions !== "any")
      throw new Error("Invalid Accept header");

    // covert file extensions array to mime extensions array
    const ALLOWED_MIMES = AcceptExtensions.split(",").map(
      (val) =>
        FILE_EXTENSIONS_WITH_MIME[
          val as keyof typeof FILE_EXTENSIONS_WITH_MIME
        ],
    );

    const form = new IncomingForm({
      multiples: false,
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      filename(name, ext) {
        const fileName = name
          .toLowerCase()
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
        const randomUUID = crypto.randomUUID();
        const now = Date.now();
        const fullFileName = `${randomUUID}-${now}-${fileName}${ext}`;
        return fullFileName;
      },
      filter(part) {
        const { mimetype } = part;
        if (!mimetype) return false;
        return ALLOWED_MIMES.includes(mimetype) || AcceptExtensions === "any";
      },
    });

    const data: File = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve(files.file as File);
      });
    });

    return res.json({
      fileName: data.newFilename,
      fileUrl: `/uploads/${data.newFilename}`,
    });
  } catch (error) {
    if (error instanceof Error)
      console.log("Error uploading file", error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
