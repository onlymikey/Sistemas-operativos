import Homework from "../../components/Homework";
import { Divider } from "@heroui/react";

export default function HomePage(): JSX.Element {
  return (
    <main className="dark bg-background text-foreground bg-[url('https://astro.build/_astro/HeroBackground.B0iWl89K_2hpsgp.webp')] bg-left bg-cover  min-h-screen w-full font-inter flex items-center flex-col justify-start">
      <div className="md:w-3/4 w-full py-5 px-3">
        <h1 className="text-4xl font-extrabold">
          Portafolio de evidencias &bull; Sistemas operativos.
        </h1>
        <p className="text-neutral-400 font-semibold">
          Por Saul Emanuel Yañez Salazar
        </p>
        <Divider className="mt-3" />
      </div>
      <section className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 p-2 ">
        <Homework
          title="Procesamiento por lotes"
          imageUrl="./primero.png"
          urlTo="/about/first"
        >
          Simulación de procesos en un sistema operativo usando lotes, con
          capacidad de 5 procesos por lotes. Sin capacidad de interacción más
          que la visualización de los procesos e inicio de los mismos.
        </Homework>
        <Homework
          title="Interacción de procesos."
          imageUrl="./segundo.png"
          urlTo="/about/second"
        >
          Simulacion de procesos de un sistema operativo, con la oportunidad de
          interacturar con los procesos, pausar, reunudar, eliminar procesos y
          agregar nuevos procesos mendiante la entreada del teclado.
        </Homework>
        <Homework
          title="First Come First Served"
          imageUrl="./tercero.png"
          urlTo="/about/third"
        >
          Simulación de procesos de un sistema operativo, con la oportunidad de
          interactuar con los procesos, pausar, reanudar, y bloquear procesos
          con el teclado.
        </Homework>
        <Homework
          title="First Come First Served p2."
          imageUrl="./cuarto.png"
          urlTo="/about/fourth"
        >
          Simulacion del algoritmo de planificacion de procesos FCFS, con la
          capacidad de mostrar el bloque de control de procesos y ademas de
          agregar una nueva tecla que permite agregar procesos incluso durante
          la ejecucion del programa.
        </Homework>
        <Homework
          title="Round Robin"
          imageUrl="./quinta.png"
          urlTo="/about/fifth"
        >
          Simulación de porocesos en un sistema operativo usando Round Robin con
          la capacidad de interactuar con los procesos, pausar, reanudar,
          continuar y mostrar el estado de los procesos usando una tabla de
          control de procesos.
        </Homework>
        <Homework
          title="Productor-Consumidor"
          imageUrl="./sexta.png"
          urlTo="/about/sixth"
        >
          Simulación del problema clásico del Productor-Consumidor en un sistema
          operativo. En esta implementación, se utiliza un búfer circular con
          capacidad para 22 elementos, donde los procesos productores generan
          elementos y los procesos consumidores los consumen.
        </Homework>
      </section>
    </main>
  );
}
