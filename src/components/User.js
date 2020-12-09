import React, { useState, useEffect } from "react";
import AppUserDataService from "../services/AppUserService";

const User = props => {
    const initialUserState = {
        id: null,
        username: "",
        mail: "",
        password: ""
    };

    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");

    const getUser = id => {
        AppUserDataService.get(id)
            .then(response => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentUser.id,
            username: currentUser.username,
            mail: currentUser.mail,
            password: currentUser.password
        };

        AppUserDataService.update(currentUser.id, data)
            .then(response => {
                setCurrentUser({ ...currentUser, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateUser = () => {
        AppUserDataService.update(currentUser.id, currentUser)
            .then(response => {
                console.log(response.data);
                setMessage("The User was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        AppUserDataService.remove(currentUser.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h4>User</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">UserName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={currentUser.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mail">Mail</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mail"
                                name="mail"
                                value={currentUser.mail}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentUser.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentUser.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteUser}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateUser}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            )}
        </div>
    );
};

export default User;