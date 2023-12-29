import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const editBlog = (req, res) => {
    const postsDirectory = join(process.cwd(), "_posts");
    if (process.env.NODE_ENV === "development") {
        if (req.method === "POST") {
            const { date, title, tagline, preview, image } = req.body.variable;
            try {
                fs.writeFileSync(
                    postsDirectory + req.body.slug + ".md",
                    matter.stringify(req.body.content, {
                        date,
                        title,
                        tagline,
                        preview,
                        image,
                    }),
                    "utf8"
                )
            }
            catch (err) {
                console.log(err);
            }
        } else {
            res
                .status(200)
                .json({ name: "This route works in development mode only" });
        }
    }
}

export default editBlog;