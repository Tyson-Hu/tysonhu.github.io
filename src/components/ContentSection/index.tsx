import React, {ReactNode} from "react";
import ReactMarkdown from "react-markdown";
import {Prism as  SyntaxHighlighter} from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = {
    code({node, inline, className, children, ...props}: any) {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>{children}</code>
        );
    }
};

const ContentSection = ({content}: any) => {
    return (
        <ReactMarkdown components={CodeBlock} className="markdown-class">
            {content}
        </ReactMarkdown>
    );
}

export default ContentSection;
