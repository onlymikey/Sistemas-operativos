import { Navbar, NavbarContent, NavbarItem, Switch, Button, Popover, PopoverContent, 
    PopoverTrigger, Form, Input 
} from "@heroui/react";
import NumberFlow from "@number-flow/react";
import { useTheme } from "@heroui/use-theme";
import { FaPlay as Play, FaCloudMoon as Moon, FaPlus as Plus} from "react-icons/fa";
import { CiSun as Sun } from "react-icons/ci";
import { FormEvent } from "react";
import { DataProvider } from "../../providers/DataProvider";
import { useContext, useState } from "react";
import type { ProcesType } from "../..";

export default function NavBar({time}: {time: number}): JSX.Element{
    const {theme, setTheme}: {theme: string, setTheme: (value: string) => void} = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {data, setData, setIsRunning} = useContext(DataProvider);
    const [value, setValue] = useState<number>(1);


    const handleSumbit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const temporalData: Record<string, any>[] = Array.from({length: value}, (_, index) => (
            {
                firstNumber: Math.floor(Math.random() * 100), 
                secondNumber: Math.floor(Math.random() * 100) + 1,
                operation: Math.floor(Math.random() * 5) + 1,
                time: Math.floor(Math.random() * 14) + 6,
                id: index + 1
            }
        ));
        setData((prev: ProcesType[]) => [...prev, ...temporalData]);
        setIsOpen(false);
    }

    return (
        <Navbar isBordered  position="sticky">
            <NavbarContent justify="start">
                <NavbarItem>
                    <Button startContent={<Play />} variant='flat' color='secondary' isDisabled={data.length === 0}
                    onPress={() => setIsRunning((prev: boolean) => !prev)}>
                        Iniciar
                    </Button>
                </NavbarItem>
                <NavbarItem>
                <Switch startContent={<Moon />} endContent={<Sun />} size="lg" className="hidden md:block"
                     onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                     isSelected={theme === "dark"} aria-label="Cambiar el tema de la aplicación" />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Popover showArrow backdrop="opaque" isOpen={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger>
                            <Button variant="flat" color="primary" startContent={<Plus />}>
                                Nuevo proceso. 
                            </Button>
                        </PopoverTrigger>
                    <PopoverContent className="w-72">
                        <Form className="my-2 w-full" validationBehavior="native" onSubmit={handleSumbit} >
                            <Input label="Numero de procesos." placeholder="Cantidad de procesos." name="quantity" type="number" 
                            onValueChange={(currentValue: string) => setValue(parseInt(currentValue))}
                            isInvalid={value <= 0}
                            errorMessage="La cantidad de procesos debe ser mayor que cero."
                            isRequired variant="bordered"/>
                            <Button type="submit" variant="flat" color="primary" className='w-full'>Crear nuevo proceso</Button>
                        </Form>
                    </PopoverContent>
                    </Popover>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="w-32">
                    <NumberFlow value={time} className="font-extrabold text-4xl mb-0"/>
                    <p className='text-neutral-400 text-tiny mb-2'>segundos</p>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}