import { Card, CardBody, Chip } from "@heroui/react";
import type { SpecialProps } from "../type/type";
import { useEffect, useState } from "react";

export default function Producer({
    elements,
    setElements,
    currentElement,
    setCurrentElement,
}: SpecialProps): JSX.Element {
    const [status, setStatus] = useState<"Durminedo" | "Generado">("Durminedo");
    const [time, setTime] = useState<number>(Math.floor(Math.random() * 6) + 3);

    function generateRandomTime(): number {
        return Math.floor(Math.random() * 6) + 3;
    }
    useEffect(() => {
        if (status === "Durminedo") {
            const timeout = setInterval(() => {
                setTime((prev: number) => {
                    if (prev === 0) {
                        setStatus("Generado");
                        return generateRandomTime();
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timeout);
        }

        if (status === "Generado") {
            const quantityElements: number = Math.floor(Math.random() * 6) + 3;
            const timeout = setInterval(() => {
                for (let i = 0; i < quantityElements; i++) {
                    setElements((prev) => {
                        return prev.map((element, index: number) =>
                            index === currentElement ? { index, isEmpty: false } : element
                        );
                    });
                }
                setCurrentElement((prev) => (prev + 1) % elements.length);
                setStatus("Durminedo");
            }, 1000);
            return () => clearInterval(timeout);
        }
    }, [time, status]);

    return (
        <Card
            className="bg-sky-300/20 border-1 border-sky-300 fixed bottom-2 left-10 z-10"
            isPressable
        >
            <CardBody className="flex flex-col items-center justify-center gap-2 p-4">
                <h2 className="font-extrabold text-4xl">Productor.</h2>
                <div className="w-full flex flex-row items-center justify-between gap-3 ">
                    <p>
                        Tiempo actual del sueño:
                        <span className="font-extrabold"> {time}</span>
                    </p>
                    <Chip
                        variant="flat"
                        color={status === "Durminedo" ? "danger" : "success"}
                    >
                        {status}
                    </Chip>
                </div>
            </CardBody>
        </Card>
    );
}
