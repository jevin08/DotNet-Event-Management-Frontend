import axios from "axios";
import React, { useEffect, useState, } from "react";
import Notify from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

const Event = (props) => {
    const [events, setEvents] = useState([]);
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
                axios.get('https://localhost:7283/api/Event/All',
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(res => {
                        setEvents(res.data);
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
                        <th scope="col">Description</th>
                        <th scope="col">Speaker</th>
                        <th scope="col">Date</th>
                        <th scope="col">Venue</th>
                        <th scope="col">Fees</th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map(evnt =>
                        <tr key={evnt.id}>
                            <th scope="row" className="text-primary" onClick={() => navigate(`/admin/event/${evnt.id}`)} style={{cursor:"pointer"}}>{evnt.Name}</th>
                            <td>{more(evnt.Description)}</td>
                            <td>{`${evnt.Speaker.firstname} ${evnt.Speaker.surname}`}</td>
                            <td>{new Date(evnt.StartTime).toDateString()}</td>
                            <td>{more(evnt.Venue)}</td>
                            <td>{evnt.Fees}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Event;