import {Card, CardBody, CardFooter,  Image, Button} from "@heroui/react"; 
import { Link } from "react-router";
import type { ReactNode } from "react";

export default function Homework({children, title, urlTo, imageUrl}: {children: ReactNode, title: string, urlTo: string, imageUrl: string}): JSX.Element{

    return (
        <Card>
            <CardBody>
                <Image src={imageUrl} alt="Preview of homework" className="w-full h-auto"/>
            </CardBody>
            <CardFooter className="flex flex-col items-start justify-start gap-2">
                <h2 className="text-2xl font-bold ">{title}</h2>
                <p className="text-neutral-400 text-small">{children}</p>
                <Button className="w-full" variant="flat" color="primary" as={Link} to={urlTo}>Más información</Button>
            </CardFooter>
        </Card>
    )
}