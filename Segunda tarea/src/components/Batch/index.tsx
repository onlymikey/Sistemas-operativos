import {Card, CardHeader, CardBody} from "@heroui/react";
import type { ReactNode } from "react";

export default function Batch({index, children}: {index: number, children?: ReactNode}): JSX.Element{
    return (
        <Card className='border-1 border-gray-400/20'>
            <CardHeader>
                <h2 className='font-inter text-xl font-semibold'>Lote {index}</h2>
            </CardHeader>
            <CardBody >
                {children}
            </CardBody>
        </Card>
    )
}