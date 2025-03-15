import { Card, CardBody, CardHeader, Divider} from '@heroui/react'; 
import type { ReactNode } from 'react';
import { cn } from '@heroui/react';
export default function ProcessList({title, children, className}: {title: string, children?: ReactNode, className?: string}): JSX.Element {
    return (
        <Card className={cn("w-full", className)}>
            <CardHeader className='flex justify-between items-center flex-col gap-2'>
                <h2 className='font-bold text-xl'>{title}</h2>
            <Divider />
                
            </CardHeader>
            <CardBody className='gap-3'>
                {children}
            </CardBody>
        </Card>
    )
}