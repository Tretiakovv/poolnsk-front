"use client"

import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {useStore} from "@/store/store";
import {useShallow} from "zustand/react/shallow";
import axios from "axios";
import {api} from "@/api/api";

const AuthorizationPage = () => {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [login, refresh] = useStore(useShallow(
        state => [state.auth, state.refresh]
    ))

    const handleLogin = () => login(username, password)
    const handleGetEssentials = async () => {
        const response = await api.get("profile/order-history")
        console.log(response)
    }

    return (
        <section className={"w-full flex flex-col gap-7"}>
            <HeaderRow header={"Войти"}/>
            <section className={"w-full grid grid-cols-2 gap-5"}>
                <TextInput
                    placeholder={"Имя пользователя"}
                    onChange={setUsername}
                    value={username}
                />
                <TextInput
                    placeholder={"Пароль"}
                    onChange={setPassword}
                    value={password}
                />
            </section>
            <section className={"flex flex-row items-center gap-5"}>
                <Button
                    className={"w-[200px] h-[60px]"}
                    buttonText={"Войти"}
                    onClick={handleLogin}
                />
                <Button
                    className={"w-[300px] h-[60px]"}
                    buttonText={"Получить данные"}
                    onClick={handleGetEssentials}
                />
            </section>
        </section>
    );

};

export default AuthorizationPage;