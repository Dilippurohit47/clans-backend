import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import Routes from "./routes/index.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.use(Routes);
app.get("/", async (req, res) => {
    try {
        // const info = await emailQueue.add(emailQueueName, {
        //   to: "xenab23370@adambra.com",
        //   subject: "Testing email",
        //   body: html,
        // });
        // // console.log("info", info);
        res.send("server is running ");
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
import "./jobs/Email-jobs.js";
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
