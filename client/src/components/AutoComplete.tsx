import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
    options: any[],
    optionLabel: string,
    onChange(event: object, value: any): void
    defaultValue: object
}

export default function AutoCompleteSelect({options, optionLabel, onChange, defaultValue}: Props) {
    return (
        <Autocomplete
            id={optionLabel}
            options={options}
            getOptionLabel={(option: any) => option[optionLabel]}
            style={{ width: 300 }}
            onChange={onChange}
            value={defaultValue}
            renderInput={(params: any) => <TextField {...params} label="Combo box" variant="standard" />}
        />
    );
}