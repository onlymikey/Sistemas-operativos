import { useState, useEffect } from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import type { SpecialProps } from "../type/type";

export default function Consumer({
    elements,
    setElements,
    currentElement,
    setCurrentElement,
}: SpecialProps): JSX.Element {
    const [status, setStatus] = useState<"Durmiendo" | "Consumiendo">("Durmiendo");
    const [time, setTime] = useState<number>(Math.floor(Math.random() * 6) + 3);

    function generateRandomTime(): number {
        return Math.floor(Math.random() * 6) + 3;
    }

    useEffect(() => {
        if (status === "Durmiendo") {
            const timeout = setInterval(() => {
                setTime((prev: number) => {
                    if (prev === 0) {
                        setStatus("Consumiendo");
                        return generateRandomTime();
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timeout);
        }

        if (status === "Consumiendo") {
            const quantityElements: number = Math.floor(Math.random() * 4) + 3;
            const timeout = setTimeout(() => {
                let consumed = 0;
                setElements((prev: boolean[]) => {
                    return prev.map((value: boolean, index: number) => {
                        if (!value && consumed < quantityElements) {
                            consumed++;
                            return true;
                        }
                        return value;
                    });
                });
                setCurrentElement((prev: number) => (prev + consumed) % 22);
                setStatus("Durmiendo");
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [time, status]);

    return (
        <Card
            className="bg-green-300/20 border-1 border-green-300 fixed bottom-2 right-10 z-10"
            isPressable
        >
            <CardBody className="flex flex-col items-center justify-center gap-2 p-4">
                <h2 className="font-extrabold text-4xl">Consumidor.</h2>
                <div className="w-full flex flex-row items-center justify-between gap-3">
                    <p>
                        Tiempo actual del sueño:
                        <span className="font-extrabold"> {time}</span>
                    </p>
                    <Chip
                        variant="flat"
                        color={status === "Durmiendo" ? "danger" : "success"}
                    >
                        {status}
                    </Chip>
                </div>
            </CardBody>
        </Card>
    );
}
