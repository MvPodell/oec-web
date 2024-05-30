'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { addDocToFirestore } from "@/config/firestore";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";


interface SignUpFormProps {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
}

export const SignUpForm = () => {
    const [userDetails, setUserDetails] = useState<SignUpFormProps>({
        firstName: "",
        lastName: "",
        username: "",
        email: ""
    });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const signupWithUsernameAndPassword = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (password === confirmPassword) {
            try {
                try {
                    const userDetails: SignUpFormProps = {
                        firstName,
                        lastName,
                        username,
                        email
                      };
                    const credential = await createUserWithEmailAndPassword(auth, email, password);
                    const uid = credential.user.uid;
                    // console.log("inputs inside try: ", username, credential.user.uid);
                    await addDocToFirestore(username, firstName, lastName, email, uid);
                    router.push('/dashboard');
                } catch (error) {
                    setNotice("issue adding username")
                    console.log(error);
                }
            } catch {
                setNotice("Sorry, something went wrong. Please try again.");
            }
        } else {
            setNotice("Passwords don't match. Please try again.");
        }
    };


    return (
        <div className={styles.formModule}>
            <div className={styles.formHeaderContainer}>
                <div className={styles.formBackContainer}>
                    <Link className={styles.formBackButton} href="/form/login">Back to Login</Link>
                </div>
                <div className={styles.formHeader}>
                    Sign Up
                </div>
            </div>
            <div className={styles.formFieldsContainer}>
                <form className={styles.formFields}>
                    {"" !== notice &&
                        <div className="alert alert-warning" role="alert">
                            {notice}
                        </div>
                    }
                    <div className={styles.formInputContainer}>
                        <label htmlFor="signupFirstName" className={styles.formLabel}>Enter your First Name</label>
                        <input id="signupFirstName" type="" className={styles.formInput} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="signupLastName" className={styles.formLabel}>Enter your Last Name</label>
                        <input id="signupLastName" type="" className={styles.formInput} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="signupEmail" className={styles.formLabel}>Enter a username</label>
                        <input id="signupUsername" type="username" className={styles.formInput} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="signupEmail" className={styles.formLabel}>Enter an email address</label>
                        <input id="signupEmail" type="email" className={styles.formInput} aria-describedby="emailHelp" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="signupPassword" className={styles.formLabel}>Password</label>
                        <input id="signupPassword" type="password" className={styles.formInput} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className={styles.formInputContainer}>
                        <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                        <input id="confirmPassword" type="password" className={styles.formInput} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>
                    <div className={styles.formSubmitContainer}>
                        <button type="submit" className={styles.formSubmit} onClick={(e) => signupWithUsernameAndPassword(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


