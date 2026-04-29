import {Button, Input} from "antd";
import {FiSearch} from "react-icons/fi";
import type {CSSProperties} from "react";

export const IbuySearch = ({styles}:{styles?:CSSProperties} ) => {
    return (
        <Input
                   style={{borderRadius: 50,padding: 4, paddingLeft: 20, ...styles}}
        placeholder="Search from 300M+ Premium Around the World"
        allowClear
        size="small"
        // style={{width: 400, padding: 1, paddingLeft: 10, borderRadius: 50}}
        suffix={<Button shape="circle" icon={<FiSearch color={"white"}/>} style={{backgroundColor: "orange"}}/>}
    />
    )}