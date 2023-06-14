import { env } from "@/env.mjs";
import handleCron from "@/server/handleCron";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      const { query } = req;
      if (query.secret !== env.CRON_SECRET) return res.json({ message: "Invalid token: Listening To The Cron" });
      try {
        await handleCron();
        return res.json({
          message: `Cron Successful at ${new Date().toISOString()}`,
        });
      } catch (error) {
        return res.json({
          message: `Cron error: ${error instanceof Error ? error.message : ""}`,
        });
      }
    }
    default:
      return res.status(404).json({});
  }
}
