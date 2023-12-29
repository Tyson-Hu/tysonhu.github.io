import fs from 'fs';
import { join } from 'path';
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const portfolioData = join(process.cwd(), 'src', 'data', 'portfolio.json');
    if (process.env.NODE_ENV === 'development') {
        if (req.method === 'POST') {
            try {
                fs.writeFileSync(
                    portfolioData,
                    JSON.stringify(req.body),
                    "utf8",
                );
                console.log("Data written to file");
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

export default handler;
