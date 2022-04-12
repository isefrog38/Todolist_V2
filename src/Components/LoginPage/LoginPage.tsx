import React from 'react';
import SignIn from "../SignIn/SignIn";
import s from "./LoginPage.module.css";
import {Snackbars} from "../SnackBar/SnackBar";

export const LoginPage = () => {
    return (
        <div className={s.background_block_login_page}>
            <div className={s.block_login_page}>
                <Snackbars typeError={'error'}/>
                <SignIn/>
            </div>
        </div>
    );
};
