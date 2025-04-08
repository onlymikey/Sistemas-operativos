import type { ProcessType } from "./types/types";
import { getKeyValue, Chip } from "@heroui/react";
import type { Key, ReactNode } from "react";

export function getColor(
  status: string
): "primary" | "success" | "danger" | "warning" | "default" {
  switch (status) {
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
    case "Suspendido": 
      return "warning";
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
      case "waitTime":
        return (
          <span>
            {" " +
              (() => {
                if (item.status === "Terminado" || item.status === "Error") {
                  return (
                    (item.endTime ?? 0) -
                    (item.startTime ?? 0) -
                    (item.time - (item.timeLeft ?? 0))
                  );
                }
                return item.waitTime ?? 0;
              })()}
          </span>
        );
      case "responseTime": 
        return <span>{item.responseTime !== undefined ? (item.responseTime ?? 0) - (item.startTime ?? 0) : "No aplica."}</span>
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
      return (
        <span className="text-white font-extrabold">
          {item.status !== "Nuevo"
            ? item.time - (item.time - (item.timeLeft ?? 0))
            : item.time}
        </span>
      );
    case "passedTime":
      return (
        <span className="text-white font-extrabold">
          {item.status !== "Nuevo" ? item.time - (item.timeLeft ?? 0) : 0}
        </span>
      );
    case "returnTime":
      return item.status === "Terminado" || item.status === "Error" ? (
        <Chip variant="flat" color="primary">
          {item.endTime ?? 0 - (item.startTime ?? 0)}
        </Chip>
      ) : (
        <Chip variant="flat" color="danger">
          No aplica.
        </Chip>
      );
    default:
      return value !== undefined ? (
        <span className="font-extrabold text-white w-full text-center">
          {value}
        </span>
      ) : (
        <Chip variant="flat" color="danger">
          No aplica.
        </Chip>
      );
  }
}


export function downloadSuspendedProcess(suspendedProcesses: ProcessType[]) {
  const operations: string[] = ["+", "-", "*", "/"];
  const data = suspendedProcesses.map((process) => ({
    id: process.id, 
    status: process.status,
    operation: process.firstNumber + " " + operations[process.operation - 1] + " " + process.secondNumber,
    time: process.time,
    timeLeft: process.timeLeft,
    waitTime: process.waitTime,
  }))
  const csvContent =
    "data:text/csv;charset=utf-8," +
    data
      .map((e) => {
        return Object.values(e).join(",");
      })
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "suspended_processes.csv");
  document.body.appendChild(link); // Required for FF
  link.click();
  document.body.removeChild(link);
  // Remove the link from the document
  // Clear the suspended processes
}