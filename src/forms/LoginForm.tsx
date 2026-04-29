import {useLoginMutation} from "../api/accountApiSlice.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {Alert, Button, Checkbox, Form, Input} from "antd";
import type { Result} from "../types/ApiResult.ts";
import {IoMailOutline} from "react-icons/io5";
import {IoLockClosedOutline} from "react-icons/io5";
import {useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router";
import type {LoginResultDto} from "../api/dto/LoginResultDto.ts";
import {setUser} from "../app/slices/userSlice.ts";
import type {LoginDto} from "../api/dto/LoginDto.ts";
import Text from "antd/es/typography/Text";

//TODO:
/*
* 1. Error handling: Unauthorized, invalid form
*
* */

export function LoginForm() {
    const [login, {isLoading}] = useLoginMutation();
    const [error, setError] = useState<string | undefined>()
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname ?? "/home";
    const onSubmit = async (data: LoginDto) => {
        const result: Result<LoginResultDto> = await login(data);
        console.log(result);
        if (result.data) {
            console.log(result);
            dispatch(setUser(result.data))
            const returnUrl = searchParams.get("returnUrl") ?? "/home";
            navigate(returnUrl, { replace: true });
        }
        if (result?.error) {
            setError("Invalid email or password.");
        }
    };

    return (
        <>
            {error && <Alert type="error" message={error}/>}
            <Form name="login" initialValues={{rememberMe: false}} onFinish={onSubmit}>
                <Form.Item<LoginDto>
                    name={"email"}
                    rules={[{required: true, message: "Email is required"}, {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },]}
                >
                    <Input prefix={<IoMailOutline/>} placeholder="Email"/>
                </Form.Item>

                <Form.Item<LoginDto>
                    name={"password"}
                    rules={[{required: true, message: "Password is required"}]}
                >
                    <Input.Password prefix={<IoLockClosedOutline/>} type="password" placeholder="Password"/>
                </Form.Item>
                <Text type="secondary">Forgot Your Password? <Link to={"/forgot-password"}>Reset</Link></Text>
                <Form.Item<LoginDto> name="rememberMe" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button style={{backgroundColor: "orange"}} type="primary" htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}