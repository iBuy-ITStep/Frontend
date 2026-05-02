import {Button, Input} from "antd";
import {FiSearch} from "react-icons/fi";
import {type CSSProperties, useState} from "react";
import {useNavigate} from "react-router";

export const IbuySearch = ({styles}:{styles?:CSSProperties} ) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();
    const onSearch = () => {
        if(searchValue.length <= 1) return;
        navigate("/search?searchValue=" + searchValue);
    }

    return (
        <Input
                   style={{borderRadius: 50,padding: 4, paddingLeft: 20, ...styles}}
                    placeholder="Search from 300M+ Premium Around the World"
                    allowClear
                    size="small"
                   value={searchValue}
                   onChange={(e) => setSearchValue(e.target.value)}
        // style={{width: 400, padding: 1, paddingLeft: 10, borderRadius: 50}}
        suffix={<Button shape="circle" icon={<FiSearch color={"white"} onClick={() => onSearch()} />} style={{backgroundColor: "orange"}}/>}
    />
    )}