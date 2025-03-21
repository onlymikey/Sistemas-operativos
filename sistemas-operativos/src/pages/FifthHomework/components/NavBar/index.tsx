import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Form,
} from "@heroui/react";
import NumberFlow from "@number-flow/react";
import { type FormEvent, useState} from "react";
import { useGlobalContext } from "../../provider/GlobalContext";
import type { ProcessType } from "../../types/types";

export default function NavBar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setProcesses, time, setIsRunning, setQuantum, processes } = useGlobalContext();



  function handleStart(): void {
    setIsRunning((prev: boolean) => !prev);
  }


  function handleSumbit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const quantity = Number(data.quantity);
    const quantum = Number(data.quantum);
    setQuantum(quantum);
    addProcesses(quantity);

  }

  function addProcesses(quantity: number): void {
    const newProcesses = Array.from(
      { length: quantity },
      (_, index: number) => ({
        id: index + 1,
        firstNumber: Math.floor(Math.random() * 100),
        secondNumber: Math.floor(Math.random() * 100) + 1,
        operation: Math.floor(Math.random() * 4) + 1,
        time: Math.floor(Math.random() * 15) + 6,
        status: "Nuevo" as "Nuevo",
      })
    );
    setProcesses((prev: ProcessType[]) => [...prev, ...newProcesses]);
    setIsOpen(false);
  }
  return (
    <Navbar isBordered className="backdrop-blur">
      <NavbarContent justify="start">
        <NavbarItem>
          <Button variant="flat" color="secondary"
          onPress={handleStart}
          isDisabled={processes.length < 1}
          >
            Iniciar
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem>
          <Popover
            className="dark"
            showArrow
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            backdrop="opaque"
          >
            <PopoverTrigger>
              <Button variant="flat" color="primary">
                Agregar proceso
              </Button>
            </PopoverTrigger>
            <PopoverContent className="gap-2 p-2">
              <Form validationBehavior="native" onSubmit={handleSumbit}>
              <Input
                placeholder="Cantidad de procesos"
                className="text-white"
                label="N de procesos."
                min={0}
                type="number"
                name="quantity"
                isRequired
              />
              <Input 
                placeholder="Quantum"
                className="text-white"
                label="Valor del quantum"
                min={1}
                type="number"
                name="quantum"
                isRequired
              />
              <Button
                variant="flat"
                color="primary"
                className="w-full"
                type="submit"
              >
                Agregar procesos
              </Button>
              </Form>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex flex-col items-center">
          <NumberFlow value={time} className="text-4xl font-extrabold" />
          <p className="text-neutral-400 text-tiny -mt-3">segundos</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
