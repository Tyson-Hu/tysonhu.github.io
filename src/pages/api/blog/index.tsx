import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

import { getRandomImage } from "@/utils";

const blogHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const postsDirectory = join(process.cwd(), `/_posts/${uuidv4()}.md`);
    if (process.env.NODE_ENV === "development") {
        if (req.method === "POST") {
            const data = matter.stringify("# New Blog", {
                date: new Date().toISOString(),
                title: "New Blog",
                tagline: "New Blog",
                preview: "A new blog",
                image: getRandomImage(),
            });
            try {
                fs.writeFileSync(postsDirectory, data);
            }
            catch (err) {
                console.error(err);
            }
            res.status(200).json({ status: "CREATED" });
        }
        if (req.method === "DELETE") {
            const deleteFile = join(process.cwd(), `/_posts/${req.body.slug}.md`);
            try {
                fs.unlinkSync(deleteFile);
            }
            catch (err) {
                console.error(err);
            }
            res.status(200).json({ status: "DELETED" });
        }
    } else {
        res.status(200).json({ name: "This route is only available in development mode" });
    }
}