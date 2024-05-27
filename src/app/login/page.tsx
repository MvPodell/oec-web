'use client';
import { useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { NextApiRequest, NextApiResponse } from "next";
import styles from "@/app/login/login.module.scss";

const Login = () => {
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
        <div className={styles.loginContainer}>
            <div className={styles.loginModule}>
                <div className={styles.formHeaderContainer}>
                    <div className={styles.formBackContainer}>
                        <Link className={styles.formBackButton} href="/dashboard">Back to dashboard</Link>
                    </div>
                    <div className={styles.formHeader}>
                        Login
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
                            <button type="submit" className={styles.formSubmit} onClick={(e) => loginWithUsernameAndPassword(e)}>Submit</button>
                        </div>
                        <div className="">
                            <span>Need to sign up for an account? <Link href="/signup">Click here.</Link></span>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
};

export default Login;