import Document from "../../../components/Document";

export default function DocumentSixth(): JSX.Element {
    return (
        <Document title="Tecnicas para la administracion de memoria" urlTo="./../septima.pdf">
            En este documento se analizan las diferentes técnicas de administración de memoria utilizadas en sistemas operativos, incluyendo la paginación, segmentación y la gestión de memoria virtual.
            Se discuten las ventajas y desventajas de cada técnica, así como su impacto en el rendimiento del sistema.
        </Document>
    )
}