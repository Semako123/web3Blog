"use server";

import { pinata } from "@/services/pinataService";
import { UploadResponse } from "pinata";
import { blogMetadata } from "../types";

type address = `0x${string}`;

export const createBlog = async (
  tags: string[],
  address: address,
  editorJSON: string,
  editorMarkdown: string,
  formData: FormData
):Promise<{blogCID:UploadResponse, metadata:blogMetadata}> => {

  //TODO: Move validation to frontend
  const firstLineWithHash = editorMarkdown.split("\n")[0];
  // if (firstLineWithHash[0] !== "#") {
  //   return Error("Tile must be written with headidng 1");
  // }
  const title = firstLineWithHash?.slice(2).trim();
  // if (title?.length == 0) {
  //   return Error("Invalid title");
  // }

  const safeTitle = title?.replace(/[^a-z0-9_\-]/gi, "_");

  const file = new File([editorJSON], `${safeTitle!}.json`, {
    type: "application/json",
  });

  try {
    const res = await pinata.upload.public.file(file);
    // return res

    const metadata = {
      title: title,
      description: formData.get("description"),
      author: address,
      tags: tags,
      content: res.cid,
      timestamp: Date.now(),
    };

    const metadataFile = new File(
      [JSON.stringify(metadata)],
      `_${safeTitle}.json`,
      { type: "application/json" }
    );

    const blogCID = await pinata.upload.public.file(metadataFile);
    return {blogCID, metadata}

  } catch (error) {
    throw error as Error;
  }
};
