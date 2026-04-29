import {Flex} from "antd";
import { FaMobileAlt } from "react-icons/fa";
import Text from "antd/es/typography/Text";
export const DownloadApp = () => {
    return (<Flex align="center" style={{backgroundColor:'black', color:'white', padding:8, borderRadius:5}}>
            <FaMobileAlt/>
            <Text style={{color:"white", fontSize: 12}}>Download Our App</Text>
    </Flex>)
}