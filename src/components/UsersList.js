import React, { useState, useEffect } from "react";
import AppUserDataService from "../services/AppUserService";
import { Link } from "react-router-dom";

const UsersList = () => {
    const [users, setUsers]= useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        AppUserDataService.getAll()
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setActiveUser = (user, index) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Users List</h4>

                <ul className="list-group">
                    {users &&
                    users.map((user, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveUser(user, index)}
                            key={index}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentUser ? (
                    <div>
                        <h4>Usuario</h4>
                        <div>
                            <label>
                                <strong>UserName:</strong>
                            </label>{" "}
                            {currentUser.username}
                        </div>
                        <div>
                            <label>
                                <strong>Mail:</strong>
                            </label>{" "}
                            {currentUser.mail}
                        </div>

                        <Link
                            to={"/users/" + currentUser.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;