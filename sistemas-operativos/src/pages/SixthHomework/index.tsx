import { useState, useEffect} from "react"; 
import {Card, CardBody, CardHeader, Divider, Image} from "@heroui/react";
import SpaceBuffer from "./components/SpaceBuffer";
import Producer from "./components/Producer";;
import Consumer from "./components/Consumer";
export default function Sixth(): JSX.Element {
    const [elements, setElements] = useState<boolean[]>(Array.from({length: 22}, () => true));
    const [currentElement, setCurrentElement] = useState<number>(0);

    return ( 
        <main className="dark font-inter text-foreground bg-background w-full min-h-screen flex items-center justify-start flex-col">
            <section className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-5 gap-3 p-2">
                {elements.map((value, index: number) => (
                    <SpaceBuffer key={index} index={index} isEmpty={value} />
                ))}
            </section>
            <Producer {...{elements, setElements, currentElement, setCurrentElement}}/>
            <Consumer {...{elements, setElements, currentElement, setCurrentElement}}/>
        </main>
    )
}