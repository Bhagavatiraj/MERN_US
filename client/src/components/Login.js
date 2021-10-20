import React, { Component, useState } from 'react';
import "../components/signUp/signUp.css";
import signIn from "../assets/signIn.png";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";


export default function Login() {

    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });

    }

    const PostData = async (e) => {
        e.preventDefault();
        const { email, password } = user;

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        if (res.status === 400) {
            window.alert("Invalid credentials");
            console.log("Invalid credentials");
        }
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            window.alert("Invalid credentials");
            console.log("Invalid credentials");
        } else {
            window.alert("Login Successfull");
            console.log("Successful login");
            history.push("/about");
        }
    }




    return (
        <div >
            <div className="float-start">
                <form className="bhags1">
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"
                            value={user.email}
                            onChange={handleInputs}
                        />

                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password"
                            value={user.password}
                            onChange={handleInputs}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={PostData}>Submit</button>
                </form>
            </div>
            <div className="float-end">
                <img src={signIn} alt="SignUp" style={{ width: "1000px", height: "700px" }} />
            </div>
        </div>
    )
}
