import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { sendEmail } from "./config/mail.js";
import { emailQueue, emailQueueName } from "./jobs/Email-jobs.js";
import Routes from "./routes/index.js"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(Routes)

app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
    name: "Dilip purohit",
  });
  try {
    const info = await emailQueue.add(emailQueueName, {
      to: "xenab23370@adambra.com",
      subject: "Testing email",
      body: html,
    });
    // console.log("info", info);
    res.send("server is running ");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

import "./jobs/Email-jobs.js";
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
