import React from 'react';
import SignIn from "../SignIn/SignIn";
import s from "./LoginPage.module.css";

export const LoginPage = () => {
    return (
        <div className={s.main_block_login_page}>
            <SignIn/>
        </div>
    );
};
