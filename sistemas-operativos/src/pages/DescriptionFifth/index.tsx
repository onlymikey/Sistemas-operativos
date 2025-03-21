import AboutHomework from "../../components/About";

export default function DescriptionFirst(): JSX.Element {
  return (
    <AboutHomework
      title="Round Robin"
      imageUrl="./../quinta.png"
      githubUrl="https://github.com/iSaulX/Sistemas-operativos/tree/main/sistemas-operativos/src/pages/FifthHomework"
      urlTo="/workspace/fifth-homework"
    >
        Este programa simula la ejecuccion de procesos en un sistema operativo usando Round Robin,  
        el programa nos permite interactuar con dos valores, la cantidad de procesos y el quantum para los procesos. 
        Además de contar con la interaccion del teclado para pausar, reanudar, continuar y mostrar el estado de los procesos usando 
        una tabla de control de procesos. 
    </AboutHomework>
  );
}
