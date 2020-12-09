import React, { useState } from "react";
import AppUserDataService from "../services/AppUserService";

const AddUser = () => {
    const initialUserState = {
        id: null,
        username: "",
        mail: "",
        password: ""
    };
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveAppUser = () => {
        var data = {
            username: user.username,
            mail: user.mail,
            password: user.password
        };

        AppUserDataService.create(data)
            .then(response => {
                setUser({
                    id: response.data.id,
                    username: response.data.username,
                    mail: response.data.mail,
                    password: response.data.password
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="UserName">UserName</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={user.username}
                            onChange={handleInputChange}
                            name="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Mail">Mail</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mail"
                            required
                            value={user.mail}
                            onChange={handleInputChange}
                            name="mail"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            value={user.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </div>

                    <button onClick={saveAppUser} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddUser;