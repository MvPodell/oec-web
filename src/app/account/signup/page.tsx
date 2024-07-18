import React from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { SignUpForm } from "../../ui/forms/SignUpForm";


const Signup = () => {
    return (
        <div className={styles.formShell}>
            <SignUpForm />
        </div>
    )
};

export default Signup