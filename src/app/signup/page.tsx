import React from "react";
import styles from "@/app/login/login.module.scss";
import { SignUpForm } from "../ui/signup/SignUpForm";

export interface Profile {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
}

const Signup = () => {
    
    return (
        <div className={styles.loginContainer}>
            <SignUpForm />
        </div>
    )
};

export default Signup