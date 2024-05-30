import React from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { SignUpForm } from "../../ui/forms/SignUpForm";

export interface Profile {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
}

const Signup = () => {
    
    return (
        <div className={styles.formShell}>
            <SignUpForm />
        </div>
    )
};

export default Signup