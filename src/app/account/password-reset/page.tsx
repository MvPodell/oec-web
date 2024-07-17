import React from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { PasswordResetForm } from "../../ui/forms/PasswordResetForm";

export default function Page() {
    return (
        <div className={styles.formShell}>
            <PasswordResetForm />
        </div>
    )
};
