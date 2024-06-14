import React from "react";
import { StaffForm } from "@/app/ui/forms/StaffForm";
import styles from "@/app/ui/forms/forms.module.scss";


export default function Page() {
    return (
        <div className={styles.formShell}>
            <StaffForm />
        </div>
        
    );
}