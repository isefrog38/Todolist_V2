import React from 'react';
import s from "./Loading.module.css";

export const Loading = () => {
    return (
        <div className={s.main_loading}>
            <div className={s.loader}>
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
        </div>
    );
};