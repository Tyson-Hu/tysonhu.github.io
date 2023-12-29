import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

import data from "@/data/portfolio.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Cursor from "@/components/Cursor";
import BlogEditor, {Post} from "@/components/BlogEditor";
import ContentSection from "@/components/ContentSection";
import { stagger } from "@/animations";
import {getPostSlugs, getAllPosts, getPostBySlug} from "@/utils/api";
import { useIsomorphicLayoutEffect } from "@/utils";

interface BlogPostProps {
    post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
    const [showEditor, setShowEditor] = useState(false);
    const textOne = useRef<HTMLHeadingElement | null>(null);
    const textTwo = useRef<HTMLHeadingElement | null>(null);
    const router = useRouter();

    useIsomorphicLayoutEffect(() => {
        stagger(
            [textOne.current, textTwo.current],
            { y: 30 },
            { y: 0 },
        );
    }, []);

    return (
        <>
            <Head>
                <title>{"Blog - " + post.title}</title>
                <meta name="description" content={post.preview} />
            </Head>
            {data.showCursor && <Cursor />}
            <div
                className={`container mx-auto mt-10 ${
                    data.showCursor && "cursor-none"
                }`}
            >
                <Header isBlog={true}/>
                <div className="mt-10 flex flex-col">
                    <img
                        className="w-full h-96 rounded-lg shadow-lg object-cover"
                        src={post.image}
                        alt={post.title}
                    />
                    <h1
                        ref={textOne}
                        className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
                    >
                        {post.title}
                    </h1>
                    <h2
                        ref={textTwo}
                        className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
                    >
                        {post.tagline}
                    </h2>
                </div>
                <ContentSection content={post.content} />
                <Footer />
            </div>
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-6 right-6">
                    <Button onClick={() => setShowEditor(true)} type={"primary"}>
                        Edit this Post
                    </Button>
                </div>
            )}
            {showEditor && (
                <BlogEditor
                    post={post}
                    close={() => setShowEditor(false)}
                    refresh={() => router.reload()}
                />
            )}
        </>
    );
};

export const getStaticProps = async ({ params }) => {
    const post = getPostBySlug(params.slug, [
        "date",
        "slug",
        "preview",
        "title",
        "tagline",
        "preview",
        "image",
        "content",
    ]);

    return {
        props: {
            post: {
                ...post,
            },
        },
    };
};

export const getStaticPaths = async () => {
    const posts = getAllPosts(["slug"]);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
};

export default BlogPost;
