import { useState, useEffect} from "react"; 
import {Card, CardBody, CardHeader, Divider, Image} from "@heroui/react";
import SpaceBuffer from "./components/SpaceBuffer";
import Producer from "./components/Producer";
import type { SpaceBuffer as SpaceBufferType } from "./components/type/type";

export default function Sixth(): JSX.Element {
    const [elements, setElements] = useState<SpaceBufferType[]>(Array.from({length: 22}, (_, index) => ({index, isEmpty: true})));
    const [currentElement, setCurrentElement] = useState<number>(0);

    return ( 
        <main className="dark font-inter text-foreground bg-background w-full min-h-screen flex items-center justify-start flex-col">
            <section className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-5 gap-3 p-2">
                {elements.map((value, index: number) => (
                    <SpaceBuffer key={index} index={index} isEmpty={value.isEmpty} />
                ))}
            </section>
            <Producer {...{elements, setElements, currentElement, setCurrentElement}}/>
            <Card className="bg-red-600/20 border-1 border-red-600 fixed bottom-2 right-10 z-10" isPressable>
                <CardBody className="flex flex-col items-center justify-center gap-2 p-10">
                    <h2 className="font-extrabold text-4xl">Consumidor.</h2>
                </CardBody>
            </Card>
        </main>
    )
}