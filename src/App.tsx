import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist/Todolist';
import {AddItemForm} from './Components/AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodolistDomainType} from './Redux/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Redux/store';
import {TaskType} from './api/todolists-api';
import {createTodolistTC, getTodolistsTC} from "./Thunk/Todolist-thunk";
import {initialStateAuthorizationType} from "./Redux/Authorization-reducer";
import SignIn from "./Components/SignIn/SignIn";
import {AuthMeTC, LogOutTC} from "./Thunk/Auth-thunk";
import {Button, Typography} from "@mui/material";
import {LoginPage} from "./Components/LoginPage/LoginPage";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const stateAuth = useSelector<AppRootStateType, initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthMeTC())
        dispatch(getTodolistsTC())
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, [dispatch]);

    const onClickHandler = () => dispatch(LogOutTC());



    if (!stateAuth.isAuth) return <LoginPage />

    return (
        <div className="App">
            <AppBar position={"static"} color={"secondary"} style={{height: "100px"}}>
                <Toolbar>
                    <div className={"AddItem"}>
                        <AddItemForm addItem={addTodolist} color={"info"} />
                    </div>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={"global_todo_title"}>
                        Todolist for your business
                    </Typography>

                    <h3 className={"Login_name"}>{stateAuth.login}</h3>
                    <Button onClick={onClickHandler} color="error" variant="contained">LogOut</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                </Grid>
                <Grid container spacing={7}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper elevation={3}
                                       style={{
                                           padding: '20px',
                                           borderRadius: "10px",
                                           backgroundColor: "#ffffffa6"
                                       }}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
