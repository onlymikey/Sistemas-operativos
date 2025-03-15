import { Chip } from "@heroui/react";
import { ProcessType } from "../types/types";
import type { Key } from "react";
import { getKeyValue } from "@heroui/react";

function getColor(
    status: string
): "primary" | "warning" | "default" | "danger" | "success" | "secondary" {
    switch (status) {
        case "Listo":
            return "success";
        case "Bloqueado":
            return "danger";
        case "Error":
            return "danger";
        case "Ejecutando":
            return "primary";
        case "Terminado":
            return "warning";
        default:
            return "primary";
    }
}

function getSymbol(operation: number): string {
    switch (operation) {
        case 1:
            return "+";
        case 2:
            return "-";
        case 3:
            return "*";
        case 4:
            return "/";
        case 5:
            return "%";
        default:
            return "No aplica.";
    }
}

function calculateOperation(
    operation: number,
    firstNumber: number,
    secondNumber: number
): number {
    switch (operation) {
        case 1:
            return firstNumber + secondNumber;
        case 2:
            return firstNumber - secondNumber;
        case 3:
            return firstNumber * secondNumber;
        case 4:
            return firstNumber / secondNumber;
        case 5:
            return firstNumber % secondNumber;
        default:
            return 0;
    }
}

export function renderCell(item: ProcessType, key: Key): JSX.Element {
    const value: string | number = getKeyValue(item, key as string);

    switch (key) {
        case "id":
            return <Chip variant="flat">{value}</Chip>;
        case "currentOperation":
            return (
                <Chip variant="flat">
                    {item.firstNumber} {getSymbol(item.operation)} {item.secondNumber}
                </Chip>
            );
        case "result":
            return (
                item.status === "Terminado" ? (
                    <Chip variant="flat" color="success">{calculateOperation(item.operation, item.firstNumber, item.secondNumber)}</Chip>
                ) : (
                    <span className="font-extrabold">No aplica.</span>
                )
            );
        case "status":
            return (
                <Chip color={getColor(value as string)} variant="flat">
                    {value}
                </Chip>
            );
        default:
            return <span className="text-center">{value ?? "No aplica."}</span>;
    }
}
