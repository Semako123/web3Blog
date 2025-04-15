"use server"

import { UploadResponse } from "pinata"
import { YooptaContentValue } from "@yoopta/editor"
import { pinata } from "./server-exports"


export const createBlog = async (blogContent:YooptaContentValue, blogMarkdown:string) : Promise<UploadResponse | Error> =>{
    const jsonString = JSON.stringify(blogContent)

    const firstLineWithHash = blogMarkdown.split('\n')[0]
    if (firstLineWithHash[0] !== "#"){
        return Error("Tile must be written with headidng 1")
    } 
    const title = firstLineWithHash?.slice(2).trim();
    console.log(title)
    if (title?.length == 0){
        return Error("Invalid title")
    }
    const safeTitle = title?.replace(/[^a-z0-9_\-]/gi, '_');
    
    const file = new File([jsonString], safeTitle!, {type:"application/json"})

    try {
        const res = await pinata.upload.public.file(file);

        return res

    } catch (error) {
        return error as Error
    }


}
