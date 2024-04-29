import { readdirSync, readFileSync } from "node:fs";
import { NextApiRequest, NextApiResponse } from "next";
import JSZip from "jszip";

function* getSync(dir: string): Iterable<string> {
  const files = readdirSync(dir, { withFileTypes: true }).filter(function (
    file
  ) {
    return !/bin|etc|dev|node_modules|\.git|\.swc|\.next|out/.test(file.name);
  });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* getSync(dir + "/" + file.name);
    } else {
      console.log(dir + "/" + file.name);
      yield dir + "/" + file.name;
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Not existing endpoint" });
  }

  const zip = new JSZip();

  try {
    //Set the proper headers
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=assessment.zip");

    const filePaths = getSync(".");
    for (const filePath of filePaths) {
      const fileData = readFileSync(filePath);
      zip.file(filePath, fileData);
    }

    return res.send(zip.generateNodeStream({ streamFiles: true }));
  } catch (exception) {
    return res.status(500).send("Internal Server Error");
  }
};
