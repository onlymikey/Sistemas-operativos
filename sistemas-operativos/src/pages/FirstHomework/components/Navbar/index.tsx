import { Navbar, NavbarContent, NavbarItem, Switch, Button, Popover, PopoverContent, 
    PopoverTrigger, Form, SelectItem, Select, Input 
} from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { FaPlay as Play, FaCloudMoon as Moon, FaPlus as Plus, FaMinus as Minus, FaDivide as Divide, FaPercentage as Percentage} from "react-icons/fa";
import { IoClose as Cross } from "react-icons/io5";
import { CiSun as Sun } from "react-icons/ci";
import { ChangeEvent, FormEvent } from "react";
import { DataProvider } from "../../providers/DataProvider";
import { useContext, useState, useEffect } from "react";


export default function NavBar(): JSX.Element{
    const {theme, setTheme}: {theme: string, setTheme: (value: string) => void} = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentOp, setCurrentOperation] = useState<number>(0); 
    const [currentValue, setCurrentValue] = useState<number>(0);
    const {data, setData, isRunning, setIsRunning} = useContext(DataProvider);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [time, setTime] = useState<number>(1);
    const [id, setId] = useState<string | null>(null);


    useEffect(() => {
    let interval: any; 
    
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime((prev: number) => prev + 1);
      }, 1000);
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]); // Solo dependemos de isRunning


    function handleSumbit(event: FormEvent<HTMLFormElement>){
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        event.preventDefault();
        setData([...data, formData]);
        setIsOpen(false); 
        setCurrentOperation(0);
    }

    return (
        <Navbar isBordered >
            <NavbarContent justify="start">
                <NavbarItem>
                    <Button startContent={<Play />} variant='flat' color='secondary' isDisabled={data.length === 0}
                    onPress={() => setIsRunning((prev: boolean) => !prev)}>
                        Iniciar
                    </Button>
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
                    <PopoverContent>
                        <Form className="my-2" validationBehavior="native" onSubmit={handleSumbit}>
                            <Input label="Primer numero" type="number" variant="bordered" placeholder="Primer numero" 
                            name="firstNumber" isRequired />
                            <Select label="Operacion" placeholder="Operacion a realizar" isRequired 
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => setCurrentOperation(parseInt(event.target.value))}
                            variant="bordered" name="operation">
                                <SelectItem key={1} startContent={<Plus/>}>Suma</SelectItem>
                                <SelectItem key={2} startContent={<Minus/>}>Resta</SelectItem>
                                <SelectItem key={3} startContent={<Cross/>}>Multiplicacion</SelectItem>
                                <SelectItem key={4} startContent={<Divide/>}>Division</SelectItem>
                                <SelectItem key={5} startContent={<Percentage />}>Modulo</SelectItem>
                            </Select>
                            <Input label="Segundo numero" type="number" variant="bordered" placeholder="Segundo numero" 
                            name="secondNumber" onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrentValue(parseInt(event.target.value))}
                            isInvalid={(currentValue === 0 && (currentOp === 4 || currentOp === 5)) || isNaN(currentValue)}
                            errorMessage={isNaN(currentValue) ? "El valor debe ser un numero" : "El valor no puede ser 0"}
                            isRequired />
                            <Input label="Nombre del programador" type="text" variant="bordered" placeholder="Nombre" 
                            name="name"
                            isRequired />
                            <Input label="Tiempo" placeholder="Tiempo de ejecucion" type="number" variant="bordered"
                            name="time" isRequired
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setTime(parseInt(event.target.value))}
                            isInvalid={time <= 0 || isNaN(time)}
                            errorMessage={isNaN(time) ? "El valor debe ser un numero" : "El tiempo debe ser mayor a 0"}
                            />
                            <Input isRequired type="text" name="id"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setId(event.target.value)}
                            label="ID " placeholder="ID del proceso"
                            isInvalid={data.some((process: any) => process.id === id)}
                            variant="bordered" errorMessage="El ID ya existe"
                            />
                            <Button type="submit" variant="flat" color="primary" className='w-full'>Crear nuevo proceso</Button>
                        </Form>
                    </PopoverContent>
                    </Popover>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Switch startContent={<Moon />} endContent={<Sun />} size="lg" className="hidden md:block"
                     onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                     isSelected={theme === "dark"} aria-label="Cambiar el tema de la aplicación" />
                </NavbarItem>
                <NavbarItem>
                    <Input isReadOnly value={currentTime.toString()} label="Tiempo transcurrido" />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}