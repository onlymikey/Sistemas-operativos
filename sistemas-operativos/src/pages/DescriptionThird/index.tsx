import AboutHomework from "../../components/About";

export default function DescriptionThird(): JSX.Element {
  return (
    <AboutHomework
      title="First Come First Served"
      imageUrl="./../tercero.png"
      githubUrl="https://github.com/iSaulX/Sistemas-operativos/tree/main/sistemas-operativos/src/pages/SecondHomework"
      urlTo="/workspace/third-homework"
    >
        El objetivo de esta prátcica es tener una nocion en la manera la cual podemos calculso los tiempos para un aplicación, la cual puede evaluar tiempos de llegada
        espera, finalizacion, y respuesta. Además, de soportar la interaccion con el teclado con el usuario.
    </AboutHomework>
  );
}
