'use client';
import React, { useState, useEffect } from "react";
import { auth } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import {addDocToFirestore} from "@/config/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

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


    return(
        <div className = "">
            <div className = "">
                <form className = "">
                    { "" !== notice &&
                        <div className = "" role = "alert">
                            { notice }    
                        </div>
                    }
                     <div className = "">
                        <input id = "signupUsername" type = "username" className = "form-control" placeholder = "username" value = { username } onChange = { (e) => setUsername(e.target.value) }></input>
                        <label htmlFor = "signupEmail" className = "form-label">Enter a username</label>
                    </div>
                    <div className = "">
                        <input id = "signupEmail" type = "email" className = "form-control" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                        <label htmlFor = "signupEmail" className = "form-label">Enter an email address</label>
                    </div>
                    <div className = "">
                        <input id = "signupPassword" type = "password" className = "form-control" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                        <label htmlFor = "signupPassword" className = "form-label">Password</label>
                    </div>
                    <div className = "">
                        <input id = "confirmPassword" type = "password" className = "form-control" placeholder = "Confirm Password" value = { confirmPassword } onChange = { (e) => setConfirmPassword(e.target.value) }></input>
                        <label htmlFor = "confirmPassword" className = "form-label">Confirm Password</label>
                    </div>                    
                    <div className = "">
                        <button type = "submit" className = "" onClick = {(e) => handleSubmit(e)}>Signup</button>
                    </div>
                    <div className = "mt-3 text-center">
                        <span>Go back to login? <Link href= "/login">Click here.</Link></span>
                    </div>                    
                </form>
            </div>
        </div>
    )
}

export default Signup