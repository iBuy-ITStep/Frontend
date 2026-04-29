import type {CssObjectType} from "../../types/CssObjectType.ts";

export const homeStyles: CssObjectType = {
    carousel: {
        height: "18vh",
        backgroundColor: "#13377c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    search: {
        position: "relative",
        margin: "auto",
        width: "50%",
        top: -15,
        scale: 1.3
    },
    ribbonCard:{
        //height: "15vh",
    },
    anywhereText: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 26,
        textAlign: "center",
        fontWeight: 500
    },
    dailyTitles: {
        fontSize: 22,
        fontWeight: 600,
    },
    dailyContainer: {
        marginTop: 20,
        padding: "0 20px 0 20px"
    }

}