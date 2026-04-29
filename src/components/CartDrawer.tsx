import {Avatar, Badge, Button, Divider, Drawer, Empty, Flex, Spin} from "antd";
import {LuShoppingCart} from "react-icons/lu";
import {useState} from "react";
import {useCartByUserQuery} from "../api/cartApiSlice.ts";
import {ProductCartDrawerCard} from "./ProductCartDrawerCard.tsx";
import Text from "antd/es/typography/Text";
import {Link} from "react-router";
import {cartTotalProductQuantityAdapter} from "../features/adapters/cartAdapter.ts";

export const CartDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data: cart, isLoading: cartIsLoading} = useCartByUserQuery()

    const footer = (
        <Flex vertical style={{marginBottom: 10}}>
            <Flex justify="space-between">
                <Text>Sub Total:</Text>
                <Text>$ {cart?.totalPrice}</Text>
            </Flex>
            <Flex justify="space-between" style={{padding:'10px'}}>
                <Link to={"/cart"}>
                    <Button style={{width: 150}}>View Cart</Button>
                </Link>
                <Link to={"/checkout"} >
                    <Button type="primary" style={{width: 150}}>Checkout</Button>
                </Link>
            </Flex>
        </Flex>
    )

    return (
        <>
            <Badge count={cartTotalProductQuantityAdapter(cart?.items ?? [])} size="small" style={{fontSize: 10, marginTop: 10, marginRight: 6}} onClick={() => setIsOpen(true)}>
                <Avatar shape="circle" size="medium" icon={<LuShoppingCart color="black"/>}
                        style={{backgroundColor: "white"}}/>
            </Badge>
            <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title="Added to Cart"
                footer={footer}
            >
                {cartIsLoading ? (<Spin />)
                : (<>
                        {cart && cart.items?.length == 0 ? <Empty /> : cart?.items.map((cart, i) => (
                            <>
                                <ProductCartDrawerCard key={i} cart={cart}/>
                                <Divider />
                            </>
                        ))}
                    </>)
                }

            </Drawer>
        </>
    )
}