import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

export const renderEmailEjs = async (fileName: string, paylaod: any) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const html: string = await ejs.renderFile(
    __dirname + `/views/emails/${fileName}.ejs`,
    paylaod
  );

  return html;
};
