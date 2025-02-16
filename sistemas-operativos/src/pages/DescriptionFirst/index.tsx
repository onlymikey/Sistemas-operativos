import AboutHomework from "../../components/About"

export default function DescriptionFirst(): JSX.Element {
    return (
        <AboutHomework
            title="Primer trabajo práctico"
            imageUrl="./segundo.png"
            githubUrl="https://github.com"
            urlTo="/workspace/first"
        >
            Random text
        </AboutHomework>
    )
}