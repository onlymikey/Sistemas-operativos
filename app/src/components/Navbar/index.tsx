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
                                <SelectItem value="1" key={1} startContent={<Plus/>}>Suma</SelectItem>
                                <SelectItem value="2" key={2} startContent={<Minus/>}>Resta</SelectItem>
                                <SelectItem value="3" key={3} startContent={<Cross/>}>Multiplicacion</SelectItem>
                                <SelectItem value="4" key={4} startContent={<Divide/>}>Division</SelectItem>
                                <SelectItem value="5" key={5} startContent={<Percentage />}>Modulo</SelectItem>
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
                            name="time" isRequired />
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
                     isSelected={theme === "dark"} />
                </NavbarItem>
                <NavbarItem>
                    <Input isReadOnly value={currentTime.toString()} label="Tiempo transcurrido" />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}