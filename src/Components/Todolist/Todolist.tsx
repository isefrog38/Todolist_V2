import React, {memo, useCallback, useEffect} from 'react';
import s from "./Todolist.module.css";
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../RenameSpanFunc/EditableSpan';
import IconButton from '@mui/material/IconButton';
import {Delete} from '@mui/icons-material';
import {Task} from '../Task/Task';
import {FilterValuesType} from '../../Redux-Store/todolists-reducer';
import {Buttons} from "../Buttons/Buttons";
import {useDispatch} from "react-redux";
import {removeTodolistTC, updateTodolistTC} from "../../Thunk/Todolist-thunk";
import {createTaskTC, getTasksTC, removeTaskTC, updateTaskTC} from "../../Thunk/Task-thunk";
import {RequestStatusType} from "../../Redux-Store/App-reducer";
import {TaskTypeWithStatusEntity} from "../../Types/TaskType";
import {TaskStatuses} from "../../Types/TodolistTypes";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskTypeWithStatusEntity>
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Todolist = memo(function (props: PropsType) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [])

    let tasksForTodolist = props.tasks

    if (props.filter === 'Active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const removeTodolist = useCallback(function () {
        dispatch(removeTodolistTC(props.id));
    }, [dispatch, props.id]);

    const changeTodolistTitle = useCallback(function (title: string) {
        dispatch(updateTodolistTC(props.id, title));
    }, [dispatch, props.id]);

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, taskId));
    }, [dispatch]);

    const addTask = useCallback(function (title: string) {
        dispatch(createTaskTC(props.id, title));
    }, [dispatch, props.id]);

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(todolistId, taskId, {status}));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC(todolistId, taskId, {title: newTitle}));
    }, [dispatch]);

    return (
        <div className={s.main_paper_div}>
            <h3 className={s.block_name_and_delete}>
                <EditableSpan disabled={props.entityStatus === 'loading'} value={props.title}
                              onChange={changeTodolistTitle}/>
                <IconButton size={"large"} onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} color={'secondary'} disabled={props.entityStatus === 'loading'}/>

            <div className={s.tasks_block}>
                    {
                        tasksForTodolist.map(t => <Task key={t.id}
                                                        task={t}
                                                        todolistId={props.id}
                                                        removeTask={removeTask}
                                                        changeTaskTitle={changeTaskTitle}
                                                        changeTaskStatus={changeStatus}
                        />)
                    }
            </div>

            <Buttons todolistId={props.id} filterBS={props.filter}/>
        </div>
    )
})


