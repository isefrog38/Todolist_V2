import React from 'react';
import {Button} from "@mui/material";
import {FilterValuesType} from "../../state/todolists-reducer";

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    activeButton: FilterValuesType
}

export const  CleanButton = ({title, onClickHandler, activeButton}: ButtonPropsType) => {
    return (
        <Button
            color={activeButton === title ? "secondary" : "secondary"}
            variant={activeButton === title ? "contained" : "outlined"}
            onClick={onClickHandler}>
            {title}
        </Button>
    )
}