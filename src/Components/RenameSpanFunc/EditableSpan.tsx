import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode();
        }
    }

    return editMode
        ? <TextField onKeyPress={onKeyPressHandler} inputProps={{ maxLength: 20 }} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} variant={"standard"}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
