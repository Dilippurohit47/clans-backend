import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendEmail } from "../config/mail.js";

interface jobDataType {
  to: string;
  from: string;
  body: string;
}

export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data: jobDataType = job.data;
    const info = await sendEmail(data.to, data.from, data.body);
    console.log("the queue data  is", info);
  },
  {
    connection: redisConnection,
  }
);
