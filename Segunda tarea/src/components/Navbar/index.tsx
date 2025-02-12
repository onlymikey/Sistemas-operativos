import { Navbar, NavbarContent, NavbarItem, Switch, Button, Popover, PopoverContent, 
    PopoverTrigger, Form, SelectItem, Select, Input 
} from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { FaPlay as Play, FaCloudMoon as Moon, FaPlus as Plus, FaMinus as Minus, FaDivide as Divide, FaPercentage as Percentage} from "react-icons/fa";
import { CiSun as Sun } from "react-icons/ci";
import { FormEvent } from "react";
import { DataProvider } from "../../providers/DataProvider";
import { useContext, useState, useEffect } from "react";


export default function NavBar(): JSX.Element{
    const {theme, setTheme}: {theme: string, setTheme: (value: string) => void} = useTheme();
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {data, setData, isRunning, setIsRunning} = useContext(DataProvider);
    const [value, setValue] = useState<number>(1);


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
        event.preventDefault();
        const temporalData: Record<string, any>[] = Array.from({length: value}, (_, index) => (
            {
                firstNumber: Math.floor(Math.random() * 100), 
                secondNumber: Math.floor(Math.random() * 100),
                operation: Math.floor(Math.random() * 4) + 1,
                time: Math.floor(Math.random() * 10) + 1,
                id: index + +1
            }
        ))
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