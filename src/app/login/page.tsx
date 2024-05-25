'use client';
import { useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");

    const loginWithUsernameAndPassword = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // navigate("/home");
        } catch {
            setNotice("You entered a wrong username or password.");
        }
    }

    return (
        <div className="loginContainer">
            <div className="loginModule">
                <div className="exitContainer">
                    <Link className="exitButton" href="/dashboard">X</Link>
                </div>
                <div className="loginContainer">
                    <form className="loginForm">
                        {"" !== notice &&
                            <div className="alert alert-warning" role="alert">
                                {notice}
                            </div>
                        }
                        <div className="">
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                        </div>
                        <div className="">
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label">
                                Password
                            </label>
                        </div>
                        <div className="">
                            <button type="submit" className="" onClick={(e) => loginWithUsernameAndPassword(e)}>Submit</button>
                        </div>
                        <div className="">
                            <span>Need to sign up for an account? <Link href="/signup">Click here.</Link></span>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login