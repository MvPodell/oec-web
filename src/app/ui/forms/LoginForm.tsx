'use client';
import React, {useState} from "react";
import styles from "@/app/ui/forms/forms.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const router = useRouter();

    const loginWithUsernameAndPassword = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful!")
            router.push('/dashboard');
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    };

    return (
        <div className={styles.loginModule}>
                <div className={styles.formHeaderContainer}>
                    <div className={styles.formHeader}>
                        Login
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
                            <label
                                htmlFor="exampleInputEmail1"
                                className={styles.formLabel}
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className={styles.formInput}
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>

                        </div>
                        <div className={styles.formInputContainer}>
                            <label
                                htmlFor="exampleInputPassword1"
                                className={styles.formLabel}>
                                Password
                            </label>
                            <input
                                type="password"
                                className={styles.formInput}
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div className={styles.formSubmitContainer}>
                            <button type="submit" className={styles.ButtonBlue} onClick={(e) => loginWithUsernameAndPassword(e)}>Login</button>
                        </div>
                            <span>Need to sign up? <Link href="/account/signup">Click here.</Link></span>
                        <div>Forgot your password? <Link href="/account/password-reset">Click here.</Link></div>
                    </form>
                </div>
            </div>
    );
} 