import type { Dispatch, SetStateAction } from "react";

export type SpaceBuffer = {
    index: number; 
    isEmpty: boolean;
}

export type SpecialProps = {
    setElements: Dispatch<SetStateAction<SpaceBuffer[]>>;
    elements: SpaceBuffer[];
    currentElement: number;
    setCurrentElement: Dispatch<SetStateAction<number>>;
}