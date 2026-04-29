import type {CssObjectType} from "../../types/CssObjectType.ts";

export const dealMediumBannerStyles: CssObjectType = {
    container: {
        backgroundImage: `url(https://d2ati23fc66y9j.cloudfront.net/home-v1/banners/deals/daily-deals-offer.jpg.webp)`,
        padding: 20,
        borderRadius: 10,
        height: "100%",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
    },
    title: {
        fontSize: 24,
        color: "#fff",
        fontWeight: 600,
    },
    offer: {
        fontSize: 14,
        color: "orange",
    },
    button: {
        width: "20%",
        backgroundColor: "orange",
        color: "white",
        marginTop: 10
    },
    innerContainer:{
        paddingLeft: 40,
        paddingBottom: 40,
    }
}