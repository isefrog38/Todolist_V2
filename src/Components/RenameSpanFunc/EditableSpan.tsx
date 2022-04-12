import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    disabled?: boolean
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function ({value, onChange, disabled}: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
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
        ? <TextField
            disabled={disabled}
            onKeyPress={onKeyPressHandler}
            inputProps={{ maxLength: 20 }}
            value={title}
            onChange={changeTitle}
            autoFocus onBlur={activateViewMode}
            variant={"standard"}/>

        : <span onDoubleClick={activateEditMode}>{value}</span>
});
