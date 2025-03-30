import type { Dispatch, SetStateAction } from "react";

export type SpaceBuffer = boolean[]; 

export type SpecialProps = {
    setElements: Dispatch<SetStateAction<boolean[]>>;
    elements: boolean[];
    currentElement: number;
    setCurrentElement: Dispatch<SetStateAction<number>>;
}