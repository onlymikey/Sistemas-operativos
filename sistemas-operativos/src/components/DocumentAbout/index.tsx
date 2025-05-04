import { Card, CardHeader, CardBody, CardFooter, Button, Chip} from "@heroui/react"; 
import { IoDocument as Document } from "react-icons/io5";
import { FaCircleInfo as Circle } from "react-icons/fa6";
import { Link } from "react-router";
export type DocumentAboutProps = {
    title: string; 
    description: string; 
    to: string; 
    homeworkNumber: number; 
}

export default function DocumentAbout({ title, description, to, homeworkNumber }: DocumentAboutProps) {
    return (
        <Card className="w-full h-full">
            <CardHeader className="flex flex-row items-start justify-center gap-2 ">
                <Document className="text-2xl mt-1" />
                <h2 className="text-2xl font-extrabold">{title}</h2>
                <Chip className="ml-auto">{homeworkNumber}</Chip>
            </CardHeader>
            <CardBody>
                <p className="text-gray-400 text-small">{description}</p>
            </CardBody>
            <CardFooter className="flex justify-end">
                <Button variant="flat" color="secondary" className="w-full" as={Link} to={to} startContent={<Circle aria-hidden className="focus:outline-none"/>} >
                Ver más
                </Button>
            </CardFooter>
        </Card>
    );

}