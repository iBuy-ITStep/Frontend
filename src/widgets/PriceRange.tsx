import { Flex, Input, Slider } from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaMinus } from "react-icons/fa6";
import type { CSSProperties } from "react";

type Props = {
    min: number;
    max: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    styles?: CSSProperties;
};

export const PriceRange = ({
                               min,
                               max,
                               value,
                               onChange,
                               styles,
                           }: Props) => {
    return (
        <Flex vertical style={styles}>
            <Slider
                range
                min={min}
                max={max}
                step={100}
                value={value}
                onChange={(val) => onChange(val as [number, number])}
            />

            <Flex align="center" justify="space-between">
                <BsCurrencyDollar size={20} />

                {/* MIN */}
                <Input
                    style={{ width: "40%" }}
                    value={value[0]}
                />

                <FaMinus size={20} />

                {/* MAX */}
                <Input
                    style={{ width: "40%" }}
                    value={value[1]}
                />
            </Flex>
        </Flex>
    );
};