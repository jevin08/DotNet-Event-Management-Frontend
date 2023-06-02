import axios from "axios";
import React, { useEffect, useState, } from "react";
import Notify from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

const User = (props) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const more = (str, len = 33) => {
      if (str.length > len - 3)
          str = `${str.substr(0, len - 3)}...`;
      return str;
    };
    useEffect(() => {
        function refershList() {
            if (!localStorage.getItem('token')) {
                Notify({ message: `Please login first.`, type: "info" });
                navigate("/login");
            } else {
                axios.get('https://localhost:7283/api/User/All',
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(res => {
                      let currUser = res.data;
                      axios.get('https://localhost:7283/api/AppUser/All',
                      {
                          headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Access-Control-Allow-Origin': '*',
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                          }
                      })
                      .then(res => {
                        // console.log(res.data);
                        currUser = [...currUser, ...res.data];
                        setUsers(currUser);
                      });
                    });
                }
        }
        refershList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Study</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <th scope="row" className="text-primary" onClick={() => navigate(`/admin/${user.role?'app':''}user/${user.id}`)} style={{cursor:"pointer"}}>{`${user.gender==='Male'?'Mr.':(user.gender==='Female'?'Ms.':'')} ${user.firstname} ${user.surname}`}</th>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{more(user.studyLevel)}</td>
                            <td>{user.role?user.role:''}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default User;