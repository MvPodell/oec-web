import React from "react"
import { TripForm } from "@/app/ui/forms/TripForm";
import styles from "@/app/ui/forms/forms.module.scss";

export default function Page() {
    return (
        <div className={styles.formShell}>
            <TripForm />
        </div>
    )
}