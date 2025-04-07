import type { ProcessType } from "./types/types";
import { getKeyValue, Chip } from "@heroui/react";
import type { Key, ReactNode } from "react";

export function getColor(status: string): "primary" | "success" | "danger" | "warning" | "default" {
    switch(status){
      case "Nuevo": 
        return "primary";
      case "Listo": 
        return "success";
      case "Ejecutando": 
        return "warning";
      case "Terminado": 
        return "success";
      case "Error": 
        return "danger";
      case "Bloqueado": 
        return "danger";
      default: 
        return "default"; 
    }
  }

export function renderCell(item: ProcessType, columnKey: Key): ReactNode {
  const value: string | number = getKeyValue(item, columnKey as string);
  const operations: string[] = ["+", "-", "*", "/"];

  switch (columnKey) {
    case "id":
      return (
        <Chip variant="flat" color="primary">
          {value}
        </Chip>
      );
    case "status":
      return (
        <Chip variant="flat" color={getColor(value as string)}>
          {value}
        </Chip>
      );
    case "operation":
      return (
        <span className="font-extrabold">
          {item.firstNumber +
            " " +
            operations[item.operation - 1] +
            " " +
            item.secondNumber}
        </span>
      );
    case "responseTime" : 
      return <span>{(item.responseTime ?? 0) - (item.startTime ??0 )}</span>
    case "result":
      return item.status === "Terminado" ? (
        <Chip variant="flat" color="primary">
          {eval(
            item.firstNumber +
              " " +
              operations[item.operation - 1] +
              " " +
              item.secondNumber
          )}
        </Chip>
      ) : (
        "No aplica"
      );
    case "timeLeft": 
      return <span className="text-white font-extrabold">{ item.status !== "Nuevo" ? (item.time - (item.time - (item.timeLeft ?? 0))) : item.time}</span>
    case "passedTime": 
      return <span className="text-white font-extrabold">{item.status !== "Nuevo"  ? item.time - (item.timeLeft ?? 0) : 0}</span>
    case "returnTime":
      return (item.status === "Terminado" || item.status === "Error") ? (
        <Chip variant="flat" color="primary">{item.endTime ?? 0 - (item.startTime ?? 0)}</Chip>
      ) : (
        <Chip variant="flat" color="danger">
          No aplica.
        </Chip>
      );
    default:
      return value !== undefined ? <span className="font-extrabold text-white w-full text-center">{value}</span> : <Chip variant="flat" color="danger">No aplica.</Chip>;
  }
}