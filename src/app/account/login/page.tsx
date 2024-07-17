import React from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { LoginForm } from "../../ui/forms/LoginForm";

const Login = () => {
    return (
        <div className={styles.formShell}>
            <LoginForm />
        </div>
    )
};

export default Login;