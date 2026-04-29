import {Divider, Flex, Space, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import type {AnyObject} from "antd/es/_util/type";
import { PiWarningCircle, PiCreditCard, PiShoppingBagOpenLight } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { BiSupport } from "react-icons/bi";
import { FaCcVisa,FaCcMastercard,FaCcApplePay, FaCcPaypal,FaBoxes,FaShippingFast,FaFacebookF,FaInstagram } from "react-icons/fa";
import { LiaBoxSolid } from "react-icons/lia";
import Text from "antd/es/typography/Text";
import type {ReactElement} from "react";
import {Link} from "react-router";
import styles from "./css/footer.module.css"
const ColumnElement = ({title, icon}: { title:string, icon: ReactElement }) => {
    return (
        <Flex vertical>
            <Flex gap={8}>
                {icon}
                <Text>{title}</Text>
             </Flex>
            {/*<Divider/>*/}
        </Flex>
    )}

const columns: ColumnsType<AnyObject>  = [
    {
        title: <ColumnElement title="QUICK LINKS" icon={<PiWarningCircle size={20} />} />,
        dataIndex: "links",
        key: "links"
    },
    {
        title: <ColumnElement title="UBUY" icon={<PiShoppingBagOpenLight size={20}/>}/>,
        dataIndex: "ibuy",
        key: "ibuy",
    },
    {
        title: <ColumnElement title="PAYMENT" icon={<PiCreditCard size={20}/>}/>,
        dataIndex: "payment",
        key: "payment",
    },
    {
        title: <ColumnElement title="SHIPPING" icon={<FaBoxes size={20}/>}/>,
        dataIndex: "shipping",
        key: "shipping",
    },
 {
        title: <ColumnElement title="CITIES COVERED" icon={<SlLocationPin size={20}/>}/>,
        dataIndex: "cities",
        key: "cities",
    },
 {
        title: <ColumnElement title="24/7 Support" icon={<BiSupport size={20}/>}/>,
        dataIndex: "support",
        key: "support",
    },

]
const dataSource = [
    {
        key: '1',
        links: <Link to="/about">About Us</Link>,
        ibuy: <Link to="/mobile-app">Download App</Link>,
        payment: <Flex gap={8}>
                <FaCcVisa size={20} />
                <Text>Visa</Text>
                </Flex>,
        shipping: <Flex gap={8} align="center">
            <FaShippingFast size={23} color="orange" />
            <Flex vertical>
                <Text>Express Shipping</Text>
                <Text style={{fontSize:12, color: "gray"}}>Fast Delivery</Text>
            </Flex>
        </Flex>,
        cities: <Text>Odesa</Text>,
        support: <Flex gap={0} vertical>
            <Text>Customer Services</Text>
            <Flex gap={8} align="center">
                <BiSupport color="orange" size={15} />
                <Text>+380123456789</Text>
            </Flex>
        </Flex>
    },
    {
        key: '2',
        links: <Link to="/contant">Contact Us</Link>,
        payment: <Flex gap={8}>
            <FaCcMastercard size={20} />
            <Text>Mastercard</Text>
        </Flex>,
        shipping: <Flex gap={8} align="center">
            <LiaBoxSolid size={25} color="gray"/>
            <Flex vertical>
                <Text>Standard Shipping</Text>
                <Text style={{fontSize:12, color: "gray"}}>10+ Business Days</Text>
            </Flex>
        </Flex>,
        cities: <Text>Kyiv</Text>
    },
    {
        key: '3',
        payment: <Flex gap={8}>
            <FaCcApplePay size={20} />
            <Text>Apple Pay</Text>
        </Flex>,
    },
    {
        key: '3',
        payment: <Flex gap={8}>
            <FaCcPaypal size={20} />
            <Text>Paypal</Text>
        </Flex>,
    }
]
export const Footer = () => {
    return (<>
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered={false} className={styles.cleanTable}
            style={{marginTop: 30}}
        />
        <Divider style={{margin:0}} />
        <Flex justify="space-between" style={{padding: "0px 20px 0px 20px", fontSize: 12}}>
            <Text style={{fontSize: 12}}>Copyright © 2026 iBuy Co. All rights reserved.</Text>
            <Space>
                <Link to="/about">About Us</Link>
                <Link to="/contanct">Contact Us</Link>
            </Space>
            <Space>
                <Text>Follow Us</Text>
                <FaFacebookF color="blue" />
                <FaInstagram color="red"/>
            </Space>
        </Flex>
    </>)
}