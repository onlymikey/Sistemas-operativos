import { Image, Button, Divider } from "@heroui/react";
import { Link } from "react-router";
import type { ReactNode } from "react";
import { FaGithub as Github, FaPlay as Play } from "react-icons/fa";
import { IoIosArrowBack as Back } from "react-icons/io";
import { Link as ExternalLink } from "@heroui/react";
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
  imageUrl: string;
  urlTo: string;
}): JSX.Element {
  return (
    <main className="dark w-full  bg-[url('./primero.png')] bg-center bg-cover min-h-screen bg-background text-foreground font-inter flex items-center flex-col justify-start">
      <div className="w-full md:w-3/4 my-4 flex items-center flex-row space-x-3 md:space-x-10 justify-start">
      <Button  as={Link} to="/" isIconOnly variant="flat" color="primary">
            <Back />
      </Button>
        <div>
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="text-small text-neutral-400">
            Por Saul Emanuel Yañez Salazar
          </p>
        </div>
      </div>
      <Divider />
      <div className="w-full md:w-4/6 my-4 p-3">
      <Image src={imageUrl} alt="Preview of homework" className="w-full h-auto"/>
        <p className="text-lg my-3">{children}</p>
        <section className="flex flex-row items-center justify-end gap-2 w-full">
          <Button
            variant="flat"
            as={ExternalLink}
            isExternal={true}
            href={githubUrl}
            startContent={<Github />}
            className="w-full md:w-auto"
          >
            Código fuente.
          </Button>
          <Button
            variant="flat"
            color="primary"
            as={Link}
            to={urlTo}
            startContent={<Play />}
            className="w-full md:w-auto"
          >
            Ver en acción
          </Button>
        </section>
      </div>
    </main>
  );
}
