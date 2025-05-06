import { Image, Button, Divider, Card, CardBody, CardFooter } from "@heroui/react";
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
    <main className="dark w-full bg-center bg-cover min-h-screen bg-background text-foreground font-inter flex items-center flex-col justify-start">
      <div className="w-full md:w-3/4 my-4 flex items-center flex-row space-x-3 md:space-x-10 justify-start p-2">
      <Button  as={Link} to="/" isIconOnly variant="flat" color="primary">
            <Back />
      </Button>
        <div>
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="text-small text-neutral-400">
            Por Miguel Angel y Diana Laura.
          </p>
        </div>
      </div>
      <Divider />
      <Card className="w-full md:w-4/6 p-3 m-3">
      <Image src={imageUrl} alt="Preview of homework" className="w-full h-auto"/>
        <CardBody>
            <p className="text-lg my-3">{children}</p>
        </CardBody>
        <CardFooter className="flex flex-row items-center justify-end gap-2 w-full">
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
        </CardFooter>
      </Card>
    </main>
  );
}
