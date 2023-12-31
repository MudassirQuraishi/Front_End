import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
    const changeHandler = (event) => {
        props.onChange(event.target.value);
    };
    const validateHandler = (event) => {
        props.onBlur(event.target.value);
    };

    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ""
            }`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={changeHandler}
                onBlur={validateHandler}
            />
        </div>
    );
};
export default Input;
