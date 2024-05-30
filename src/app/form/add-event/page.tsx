import React from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import { EventForm } from "@/app/ui/forms/EventForm";

export default function Page() {
    return (
        <div className={styles.formShell}>
            <EventForm />
        </div>
    );
}