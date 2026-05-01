import type {CssObjectType} from "../../types/CssObjectType.ts";

export const hecrdStyles: CssObjectType = {
    divGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        columnGap: 10,
        rowGap: 10,
    },
    cardImage:{
        width: 150,
    },
    card: {
        padding: "0",
        boxShadow: "0px 0px 11px 1px rgba(0,0,0,0.05)",
        overflow: "hidden",
        width: "60%",

    },
    container:{
        padding: 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "white",

    }
}