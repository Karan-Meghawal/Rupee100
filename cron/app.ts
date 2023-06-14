import dotenv from "dotenv";
import cron from "node-cron";
import fetch from "node-fetch";

dotenv.config();

// eslint-disable-next-line prefer-destructuring
const CRON_URL = process.env.CRON_URL;
if (!CRON_URL) throw new Error("CRON URL is empty");

async function runCron() {
  try {
    console.log("cron is running");
    const res = await fetch(CRON_URL!, {
      method: "POST",
    });
    const data = (await res.json()) as object;
    console.log(data);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }

  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
runCron();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
cron.schedule("0 0 * * * *", runCron);
