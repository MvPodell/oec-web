'use client';
import React, { useState, useEffect } from "react";
import { auth } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { addDocToFirestore } from "@/config/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/app/login/login.module.scss";

export interface Profile {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
}

const Signup = () => {
    // const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");
    const router = useRouter();
    // const user = auth.currentUser;

    const signupWithUsernameAndPassword = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (password === confirmPassword) {
            try {
                try {
                    const credential = await createUserWithEmailAndPassword(auth, email, password);
                    const uid = credential.user.uid;
                    // console.log("inputs inside try: ", username, credential.user.uid);
                    await addDocToFirestore(username, uid);
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

    const handleSubmit = (e: React.MouseEvent) => {
        signupWithUsernameAndPassword(e);
    }


    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginModule}>
                <div className={styles.formHeaderContainer}>
                    <div className={styles.formBackContainer}>
                        <Link className={styles.formBackButton} href="/login">Back to Login</Link>
                    </div>
                    <div className={styles.formHeader}>
                        Sign Up
                    </div>
                </div>
                <div className={styles.loginFormContainer}>
                    <form className={styles.loginForm}>
                        {"" !== notice &&
                            <div className="alert alert-warning" role="alert">
                                {notice}
                            </div>
                        }
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

        </div>
    )
};

export default Signup