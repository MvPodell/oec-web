import React from "react";
import styles from "@/app/login/login.module.scss";
import { LoginForm } from "../ui/login/LoginForm";

const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>
    )
};

export default Login;