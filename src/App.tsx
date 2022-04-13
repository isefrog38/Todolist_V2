import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist/Todolist';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodolistDomainType} from './Redux-Store/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Redux-Store/store';
import {createTodolistTC, getTodolistsTC} from "./Thunk/Todolist-thunk";
import {initialStateAuthorizationType} from "./Redux-Store/Authorization-reducer";
import {AuthMeTC, LogOutTC} from "./Thunk/Auth-thunk";
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {Header} from "./Components/Header/Header";
import {ProgressBar} from "./Components/ProgressBar/ProgressBar";
import {Snackbars} from "./Components/SnackBar/SnackBar";
import {AppInitialStateType} from "./Redux-Store/App-reducer";
import {TasksStateType} from "./Redux-Store/tasks-reducer";

const App = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const { login , isAuth } = useSelector<AppRootStateType, initialStateAuthorizationType>(state => state.AuthorizationReducer);
    const { status } = useSelector<AppRootStateType, AppInitialStateType>(state => state.AppReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthMeTC())
        dispatch(getTodolistsTC())
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, [dispatch]);

    const onClickHandler = () => dispatch(LogOutTC());


    if (!isAuth) return <LoginPage/>;

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

export default App;
