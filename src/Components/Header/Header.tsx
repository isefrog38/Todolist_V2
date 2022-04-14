import React from 'react';
import '../AppIsAuth/SmallApp.css';
import Toolbar from "@mui/material/Toolbar";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Button, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {RequestStatusType} from "../../Redux-Store/App-reducer";

type HeaderType = {
    status: RequestStatusType
    addTodolist: (title: string) => void
    onClickHandler: () => void
    login: string | null
}

export const Header = ({ status, login, onClickHandler, addTodolist }: HeaderType) => {
    return (
        <AppBar position={"static"} color={"secondary"} style={{height: "100px"}}>
            <Toolbar>
                <div className={"AddItem"}>
                    <AddItemForm addItem={addTodolist} color={"info"} disabled={status === 'loading' && true}/>
                </div>

                <Typography variant="h6" component="div" sx={{flexGrow: 1}} className={"global_todo_title"}>
                    Todolist for your business
                </Typography>

                <h3 className={"Login_name"}>{login}</h3>
                <Button onClick={onClickHandler} color="error" variant="contained">LogOut</Button>
            </Toolbar>
        </AppBar>
    );
};
