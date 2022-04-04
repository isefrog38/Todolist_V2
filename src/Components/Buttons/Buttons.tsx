import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {CleanButton} from "./Button";
import {changeTodolistFilterAC, FilterValuesType} from "../../state/todolists-reducer";

type ButtonsType = {
    todolistId: string
    filterBS: FilterValuesType
}

export const Buttons = ({filterBS, todolistId}: ButtonsType) => {

    const dispatch = useDispatch();

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolistId, 'All')),[dispatch, todolistId]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolistId, 'Active')),[dispatch, todolistId]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolistId, 'Completed')),[dispatch, todolistId]);


    return (
        <div>
            <CleanButton
                activeButton={filterBS}
                onClickHandler={onAllClickHandler}
                title={'All'}
            />
            <CleanButton
                activeButton={filterBS}
                onClickHandler={onActiveClickHandler}
                title={'Active'}
            />
            <CleanButton
                activeButton={filterBS}
                onClickHandler={onCompletedClickHandler}
                title={'Completed'}
            />
        </div>
    );
};