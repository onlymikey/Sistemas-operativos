import { Image, Button } from "@heroui/react";
import { Link } from "react-router";
import type { ReactNode } from "react";

export default function AboutHomework({
  children,
  title,
  githubUrl,
  imageUrl,
  urlTo,
}: {
  children: ReactNode;
  title: string;
  githubUrl: string;
  description: string;
  imageUrl: string;
  urlTo: string;
}): JSX.Element {

    return (
        <main className="dark w-full min-h-screen bg-background text-foreground font-inter flex items-center flex-col justify-start">
            <figure>
                <figcaption className="flex flex-col">
                    <h2 className="text-2xl font-extrabold">{title}</h2>
                    <p className="text-neutral-400 font-semibold">{children}</p>
                </figcaption>
            </figure>

        </main>
    )
}
