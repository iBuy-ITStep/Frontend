import {Button, Flex} from "antd";
import {dealMediumBannerStyles} from "./css/dealMediumBannerStyles.ts";
import { BsFire } from "react-icons/bs";
import {Link} from "react-router";
import Text from "antd/es/typography/Text";
export const DealMediumBanner = () => {
    return (
            <Link to={"/home"}>
                <Flex style={dealMediumBannerStyles.container} vertical justify="start">
                    <BsFire color="orange" size={40} />
                    <Flex vertical style={dealMediumBannerStyles.innerContainer} justify="space-around">
                        <Text style={dealMediumBannerStyles.title}>Daily Deals</Text>
                        <Text style={dealMediumBannerStyles.title}>Best Offers from IBUI</Text>
                        <Text style={dealMediumBannerStyles.offer}>Get Upto 15% off</Text>
                        <Text style={dealMediumBannerStyles.offer}>USE CODE: IBFIRST</Text>
                        <Button style={dealMediumBannerStyles.button}>Shop Now</Button>
                    </Flex>
                </Flex>
            </Link>
    )
}