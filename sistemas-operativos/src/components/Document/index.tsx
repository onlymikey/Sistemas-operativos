import { Button, Divider, Card, CardBody, CardFooter } from "@heroui/react";
import { Link } from "react-router";
import type { ReactNode } from "react";
import { IoIosArrowBack as Back } from "react-icons/io";
import { Link as ExternalLink } from "@heroui/react";
import { FaDownload as Download} from "react-icons/fa6";

export default function Document({
  children,
  title,
  urlTo,
}: {
  children: ReactNode;
  title: string;
  urlTo: string;
}): JSX.Element {
  return (
    <main className="dark w-full bg-center bg-cover min-h-screen bg-background text-foreground font-inter flex items-center flex-col justify-start">
      <div className="w-full md:w-3/4 my-4 flex items-center flex-row space-x-3 md:space-x-10 justify-start p-2">
      <Button  as={Link} to="/" isIconOnly variant="flat" color="primary">
            <Back aria-hidden className="focus:outline-none" />
      </Button>
        <div>
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="text-small text-neutral-400">
            Por Saul Emanuel Yañez Salazar
          </p>
        </div>
      </div>
      <Divider />
      <Card className="w-full md:w-4/6 p-3 m-3">
        <CardBody>
            <p className="text-lg my-3">{children}</p>
        </CardBody>
        <CardFooter className="flex flex-row items-center justify-end gap-2 w-full">
          <Button
            variant="flat"
            color="primary"
            as={ExternalLink}
            href={urlTo}
            startContent={<Download aria-hidden className="focus:outline-none" />}
            className="w-full md:w-auto"
          >
            Descargar
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
