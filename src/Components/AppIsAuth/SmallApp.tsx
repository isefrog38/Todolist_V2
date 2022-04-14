import React, {useCallback, useEffect} from 'react';
import './SmallApp.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useDispatch} from 'react-redux';
import {useAppSelector} from "../../Redux-Store/store";
import {TodolistDomainType} from "../../Redux-Store/todolists-reducer";
import {TasksStateType} from "../../Redux-Store/tasks-reducer";
import {initialStateAuthorizationType} from "../../Redux-Store/Authorization-reducer";
import {AppInitialStateType} from "../../Redux-Store/App-reducer";
import {createTodolistTC, getTodolistsTC} from "../../Thunk/Todolist-thunk";
import {LogOutTC} from "../../Thunk/Auth-thunk";
import {ProgressBar} from "../ProgressBar/ProgressBar";
import {Snackbars} from "../SnackBar/SnackBar";
import {Header} from "../Header/Header";
import {Todolist} from "../Todolist/Todolist";

export const SmallApp = () => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const { login } = useAppSelector<initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const { status } = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, []);

    const addTodolist = useCallback((title: string) => {dispatch(createTodolistTC(title))}, [dispatch]);
    const onClickHandler = () => dispatch(LogOutTC());

    return (
        <div className="App">
            <Header login={login} addTodolist={addTodolist} onClickHandler={onClickHandler} status={status}/>

            {/*Tools*/}
            <div className="progress_bar_padding">{status === 'loading' && <ProgressBar />}</div>
            <Snackbars typeError={'error'}/>

            <div className={"MainContainer"}>
                <Grid container style={{width: "100%", padding: '40px'}}>
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
                                            entityStatus={tl.entityStatus}
                                        />
                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

