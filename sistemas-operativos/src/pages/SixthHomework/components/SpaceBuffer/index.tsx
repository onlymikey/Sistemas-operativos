import {Card, CardBody, CardHeader, Divider, Image} from "@heroui/react"; 
import {motion, AnimatePresence, type Variants} from "framer-motion";


export default function SpaceBuffer({index, isEmpty = false}: {index: number, isEmpty: boolean}): JSX.Element {
    
    const variants: Variants ={
        initial: {
            opacity: 0, 
            scale: 0.5,
        }, 
        animate: {
            opacity: 1, 
            scale: 1,
        }
    }
    
    return (                    <Card isPressable key={index}>
        <CardHeader className="w-full flex flex-col p-3 gap-2 items-center justify-center font-extrabold">
            <h1>Espacio {index + 1}.</h1>
            <Divider />
        </CardHeader>
        <CardBody className="max-h-32 overflow-y-hidden flex items-center justify-center">
            <AnimatePresence>
            { !isEmpty ? <motion.div variants={variants} className="border-1 h-full border-white/20 rounded-xl w-full flex items-center justify-center">
            <Image src="./../hamburguesa.png" className=" max-h-20 w-auto" isBlurred classNames={{blurredImg: "blur-lg"}}/>
            </motion.div> : 
            <motion.div variants={variants} initial="initial" animate="animate" className="border-1 p-4 h-full border-white/20 rounded-xl w-full flex items-center justify-center">
                <p className="font-extrabold text-2xl">Vacio.</p>
            </motion.div>
            }
            </AnimatePresence>
        </CardBody>

    </Card>
    )
}