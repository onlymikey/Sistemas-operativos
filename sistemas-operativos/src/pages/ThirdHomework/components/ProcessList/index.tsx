import { Card, CardBody, CardHeader, Divider} from '@heroui/react'; 
import type { ReactNode } from 'react';

export default function ProcessList({title, children}: {title: string, children?: ReactNode}): JSX.Element {
    return (
        <Card className='w-full'>
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