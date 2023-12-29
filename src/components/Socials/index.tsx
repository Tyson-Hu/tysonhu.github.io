import React from "react";

import Button from "@/components/Button";
import data from "@/data/portfolio.json"

interface SocialsProps {
    className?: string;
}

const Socials: React.FC<SocialsProps> = ({ className }) => {
    return (
        <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
            {data.socials.map((social, index) => (
                <Button key={index} onClick={() => window.open(social.link)}>
                    {social.title}
                </Button>
            ))}
        </div>
    );
};

export default Socials;