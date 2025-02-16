import {Card, CardBody, CardHeader} from "@heroui/react"; 
import {motion} from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";


export default function Section({title, children}: {title: string, children?: ReactNode}): JSX.Element{
    const variants: Variants = {
        initail: {
            scale: 0.8, 
            opacity: 0
        },
        animate: {
            scale: 1, 
            opacity: 1
        }, 
        exit: {
            scale: 0.5, 
            opacity: 0
        }
    }
    return (
        <motion.div variants={variants} initial="initail" animate="animate" exit="exit">
            <Card>
                <CardHeader>
                    <h2 className='font-inter text-xl font-semibold'>{title}</h2>
                </CardHeader>
                <CardBody className='gap-2'>
                    {children}
                </CardBody>
            </Card>
        </motion.div>
    )
}