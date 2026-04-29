import {Button, Empty, Flex} from "antd";
import Title from "antd/lib/typography/Title";
import {useCartByUserQuery} from "../api/cartApiSlice.ts";
import {Link} from "react-router";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Text from "antd/es/typography/Text";
import {CartProductCard} from "../components/CartProductCard.tsx";
import { FaLock } from "react-icons/fa";
export const CartPage = () => {
    const {data} = useCartByUserQuery()

    return (
        <Flex vertical>
            <Link to={"/home"} style={{backgroundColor: "white", fontSize: 22}}>
                <Flex align="center" gap={5} style={{paddingLeft: 50, paddingRight: 50}}>
                    <MdKeyboardArrowLeft />
                    <Text>Continue Shopping</Text>
                </Flex>
            </Link>
            {data ?
                <Flex style={{marginTop: 50,paddingLeft: 50, paddingRight: 50}} justify="space-between">
                    <Flex vertical style={{width: "70%"}}>
                        <Title level={2}>Shopping Cart ({data.items.length} items)</Title>
                        {data.items.map((p, i) => (
                            <CartProductCard cart={p} key={i} />
                        ))}
                    </Flex>
                    <Flex vertical
                          style={{padding: 10, border: "1px solid orange", borderRadius: 10, width: "25%", backgroundColor:"white"}}
                            justify={"space-between"}
                    >
                        <Title level={5}>Order Summary</Title>
                        <Flex justify="space-between">
                            <Text>Subtotal:</Text>
                            <Text type="secondary">${data.totalPrice}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Shipping Fee:</Text>
                            <Text type="secondary">Calculating at checkout</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Customs:</Text>
                            <Text type="secondary">Calculating at checkout</Text>
                        </Flex>
                        <Link to="/checkout" >
                            <Button type="primary" style={{width: "100%" }}>
                                <Flex align="center" gap={10} justify="center">
                                    <FaLock/>
                                    <Text>Proceed to Checkout</Text>
                                </Flex>
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            : <Empty />
            }
        </Flex>
    )
}