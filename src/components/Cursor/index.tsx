import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// @ts-ignore
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";

const Cursor = () => {
    const theme = useTheme();
    const [mount, setMount] = useState(false);

    const getCustomCursor = () => {
        if (theme.theme === "dark") {
            return "#fff";
        } else if (theme.theme === "light") {
            return "#000";
        }
    };

    useEffect(() => {
        setMount(true);
    }, []);

    return (
        <>
            {mount && (
                <CustomCursor
                    targets={[".link"]}
                    customClass="custom-cursor"
                    dimensions={30}
                    fill={getCustomCursor()}
                    smoothness={{
                        movement: 0.2,
                        scale: 0.1,
                        opacity: 0.2,
                    }}
                    targetOpacity={0.5}
                    targetScale={2}
                />
            )}
        </>
    );
};

export default Cursor;