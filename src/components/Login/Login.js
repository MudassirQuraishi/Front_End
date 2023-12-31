import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Button/Input/Input";
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
const Login = () => {
    // const [enteredEmail, setEnteredEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    // const [enteredCollegeName, setEnteredCollegeName] = useState("");
    // const [collegeNameIsValid, setCollegeNameIsvalid] = useState("");
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducder, {
        value: "",
        isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passworReducer, {
        value: "",
        isValid: null,
    });
    const ctx = useContext(AuthContext);

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

    const emailChangeHandler = (value) => {
        console.log(value);
        dispatchEmail({ type: "USER_INPUT", val: value });

        setFormIsValid(emailState.isValid && passwordState.isValid);
    };

    const passwordChangeHandler = (value) => {
        dispatchPassword({ type: "USER_INPUT", val: value });

        setFormIsValid(emailState.isValid && passwordState.isValid);
    };
    // const collegeNameHandler = (value) => {
    //     setEnteredCollegeName(value);
    // };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR" });
    };
    // const validateCollegeNameHanlder = () => {
    //     setCollegeNameIsvalid(enteredCollegeName.trim().length > 0);
    // };

    const submitHandler = (event) => {
        event.preventDefault();
        ctx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    isValid={emailState.isValid}
                    type='email'
                    id='email'
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    label={"E-mail"}
                />
                {/* <div
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
                </div> */}
                <Input
                    isValid={passwordState.isValid}
                    type='password'
                    id='password'
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    label={"Password"}
                />
                {/* <div
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
                </div> */}
                {/* <div
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
                </div> */}
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
