import React from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { EditUserForm } from "@/app/ui/forms/EditUserForm";

export default function Page() {

    return (
        <div className={styles.formShell}>
            <EditUserForm />
        </div>
    )
};
