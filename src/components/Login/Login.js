import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducder = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
};
const passworReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 7 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 7 };
    }
    return { value: "", isValid: false };
};
const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [enteredCollegeName, setEnteredCollegeName] = useState("");
    const [collegeNameIsValid, setCollegeNameIsvalid] = useState("");
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducder, {
        value: "",
        isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passworReducer, {
        value: "",
        isValid: null,
    });

    useEffect(() => {
        console.log("EFFECT RUNNING");

        return () => {
            console.log("EFFECT CLEANUP");
        };
    }, []);

    // useEffect(() => {
    //   const identifier = setTimeout(() => {
    //     console.log('Checking form validity!');
    //     setFormIsValid(
    //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //     );
    //   }, 500);

    //   return () => {
    //     console.log('CLEANUP');
    //     clearTimeout(identifier);
    //   };
    // }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });

        setFormIsValid(emailState.isValid && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });

        setFormIsValid(emailState.isValid && passwordState.isValid);
    };
    const collegeNameHandler = (event) => {
        setEnteredCollegeName(event.target.value);
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR" });
    };
    const validateCollegeNameHanlder = () => {
        setCollegeNameIsvalid(enteredCollegeName.trim().length > 0);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ""
                    }`}>
                    <label htmlFor='email'>E-Mail</label>
                    <input
                        type='email'
                        id='email'
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ""
                    }`}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        collegeNameIsValid === false ? classes.invalid : ""
                    }`}>
                    <label htmlFor='college-name'>College Name</label>
                    <input
                        type='text'
                        id='college-name'
                        value={enteredCollegeName}
                        onChange={collegeNameHandler}
                        onBlur={validateCollegeNameHanlder}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type='submit'
                        className={classes.btn}
                        disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
