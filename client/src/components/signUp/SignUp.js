import React, { Component, useState } from 'react';
import register from "../../assets/register.png";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import "./signUp.css";
export default function SignUp() {

    const history = useHistory();
    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    })
    let name, value;
    const handleInputs = (e) =>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;

        setUser({...user, [name]:value});

    }

    const PostData = async (e) =>{
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        
        const data = await res.json();
        
        if(res.status === 422 || !data){
            window.alert("Invalid registration");
            console.log("Invalid registration");
        }
        else{
            window.alert("Registration Successfull");
            console.log("Successful resgistration");
            history.push("/signIn");
        }
    }
    return (
        <div>
            <div className="float-start" >
                <form method="POST" className="bhags1">
                    <div class="mb-2">
                        <label for="name" class="form-label">
                            <i class="zmdi zmdi-account material-icons-name zmdi-hc-2"/>
                            <span style={{marginLeft:"4px"}}>Name</span>
                        </label>
                        <input type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Name" 
                        value={user.name}
                        onChange={handleInputs}
                        />

                    </div>
                    <div class="mb-2">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email"
                        value={user.email}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-2">
                        <label for="phone" class="form-label">Mobile Number</label>
                        <input type="number" class="form-control" id="phone" name="phone" 
                        value={user.phone}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-2">
                        <label for="work" class="form-label">Profession</label>
                        <input type="text" class="form-control" id="work" name="work" 
                        value={user.work}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" 
                        value={user.password}
                        onChange={handleInputs}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="cpass" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="cpass" name="cpassword"
                        value={user.cpassword}
                        onChange={handleInputs}
                        />
                    </div>

                    <button type="submit" class="btn btn-primary" onClick={PostData}>Submit</button>
                </form>
            </div>
            <div className="float-end">
                <img src={register} alt="SignUp" style={{ width: "1000px", height: "700px" }} />
            </div>
        </div>
    )
}
