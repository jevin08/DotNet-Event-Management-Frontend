import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Register/Register.css";
import Notify from "../../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";

const eventInit = {
    Name: "Event",
    Description: "It is an event.",
    StartTime: "2023-02-24T17:42",
    EndTime: "2023-02-24T17:42",
    Venue: "DDIT Nadiad",
    Speaker: {
        firstname: "Jevin",
        surname: "Sutariya",
        age: 20,
        email: "jevin@gmail.com",
        mobileNumber: "1234569821",
        gender: "Male",
        studyLevel: "12"
    },
    Fees: 20
};

const UpdateEvent = () => {
    const {id} = useParams();
    const [state, setState] = useState(eventInit);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => (state.Name.length > 2  && state.Venue.length>5 && state.Speaker != null);

    const updateState = (par) => setState({ ...state, ...par });

    const updateUser = (par) => {
        const speaker = { ...(state.Speaker), ...par};
        setState({ ...state, Speaker:speaker }); 
    }

    useEffect(() => {
        async function getEvent(id){
            if(!localStorage.getItem('token')){
                Notify({message: `Please login first.`,type: "info"});
                navigate("/login");
            }else{
                axios.get(`https://localhost:7283/api/Event/${id}`,
                {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(res => {
                        const len = res.data.StartTime.length;
                        res.data.StartTime = res.data.StartTime.substr(0,len-4);
                        res.data.EndTime = res.data.EndTime.substr(0,len-4);
                        setState(res.data);
                });
            }
        }
        getEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios.put(`https://localhost:7283/api/Event/Update/${id}`,
            state,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                const evnt = response.data;
                console.dir(evnt);
                let dely = Notify({message: `${evnt.Name} is updated successfully.`,
                type: "success"});
                setIsLoading(true);
                setTimeout(()=>{
                    setIsLoading(false);
                    setState(eventInit);
                }, dely);
                //redirect user to event home page
                navigate("/admin/events");
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    console.log('Something went wrong');
                }
            });
        setIsLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="myForm border border-primary rounded">
                <div className="form-group">
                    <label labelfor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" autoFocus value={state.Name} onChange={(e) => updateState({ Name: e.target.value })} required />
                    <small id="nameHelp" className="form-text text-muted">Atleast 3 character.</small>
                </div>
                <div className="form-group">
                    <label labelfor="description">Description</label>
                    <input type="text" className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" autoFocus value={state.Description} onChange={(e) => updateState({ Description: e.target.value })} />
                    <small id="descriptionHelp" className="form-text text-muted">Add description.</small>
                </div>
                <div className="form-group">
                    <label labelfor="starttime">Starting time</label>
                    <input type="datetime-local" className="form-control" id="starttime" aria-describedby="starttimeHelp" placeholder="Enter start time" autoFocus value={state.StartTime} onChange={(e) =>{ updateState({ StartTime: e.target.value }); console.log(e.target.value);}} required />
                    <small id="starttimeHelp" className="form-text text-muted">Starting time of an event.</small>
                </div>
                <div className="form-group">
                    <label labelfor="endtime">Ending time</label>
                    <input type="datetime-local" className="form-control" id="endtime" aria-describedby="endtimeHelp" placeholder="Enter end time" autoFocus min={state.StartTime} value={state.EndTime} onChange={(e) => updateState({ EndTime: e.target.value })} required />
                    <small id="endtimeHelp" className="form-text text-muted">Ending time of an event.</small>
                </div>
                <div className="form-group">
                    <label labelfor="venue">Venue</label>
                    <input type="text" className="form-control" id="venue" aria-describedby="venueHelp" placeholder="Enter address" autoFocus value={state.Venue} onChange={(e) => updateState({ Venue: e.target.value })} required />
                    <small id="venueHelp" className="form-text text-muted">Address of an event.</small>
                </div>
                <div className="form-group">
                    <label labelfor="fee">Fees</label>
                    <input type="number" className="form-control" id="fee" aria-describedby="feeHelp" min={0} max={100000} placeholder="Fees" value={state.Fees} onChange={(e) => updateState({ Fees : e.target.value })} />
                    <small id="feeHelp" className="form-text text-muted">Max fees could be 100000.</small>
                </div>

                <hr/>
                <label labelfor="Speaker">Enter details of speaker</label>

                <div className="form-group">
                    <label labelfor="firstname">First name</label>
                    <input type="text" className="form-control" id="firstname" aria-describedby="firstnameHelp" placeholder="Enter first name" autoFocus value={state.Speaker.firstname} onChange={(e) => updateUser({ firstname: e.target.value })} required />
                    <small id="firstnameHelp" className="form-text text-muted">Atleast 3 character.</small>
                </div>
                <div className="form-group">
                    <label labelfor="surname">Surname</label>
                    <input type="text" className="form-control" id="surname" aria-describedby="lastnameHelp" placeholder="Enter surname" autoFocus value={state.Speaker.surname} onChange={(e) => updateUser({ surname: e.target.value })} required />
                    <small id="lastnameHelp" className="form-text text-muted">Atleast 3 character.</small>
                </div>
                <div className="form-group">
                    <label labelfor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" autoFocus value={state.Speaker.email} onChange={(e) => updateUser({ email: e.target.value })} required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label labelfor="age">Age</label>
                    <input type="number" className="form-control" id="age" aria-describedby="ageHelp" min={5} max={150} placeholder="Age" value={state.Speaker.age} onChange={(e) => updateUser({ age : e.target.value })} />
                    <small id="ageHelp" className="form-text text-muted">Age limit is 5 to 150.</small>
                </div>
                <div className="form-group">
                    <label labelfor="mobileno">Mobile Number</label>
                    <input type="number" className="form-control" id="mobileNumber" aria-describedby="mobileHelp" minLength={10} maxLength={10} min={1000000000} max={9999999999} placeholder="Mobile no" value={state.Speaker.mobileNumber} onChange={(e) => updateUser({ mobileNumber: e.target.value })} />
                    <small id="mobileHelp" className="form-text text-muted">Valid 10 digit mobile no.</small>
                </div>
                <div className="form-group">
                    <label labelfor="gender">Gender</label>
                    <br/>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value={"Male"} checked={state.Speaker.gender === "Male"} onChange={(e)=>updateUser({gender:e.target.value})} required />
                        <label className="form-check-label" labelfor="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value={"Female"} checked={state.Speaker.gender === "Female"} onChange={(e)=>updateUser({gender:e.target.value})} />
                        <label className="form-check-label" labelfor="flexRadioDefault1">
                            Female
                        </label>
                    </div>            <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value={"Other"} checked={state.Speaker.gender === "Other"} onChange={(e)=>updateUser({gender:e.target.value})} />
                        <label className="form-check-label" labelfor="flexRadioDefault1">
                            Other
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label labelfor="studyLevel">Level of study</label>
                    <input type="text" className="form-control" id="studylevel" aria-describedby="studyLevelHelp" placeholder="Enter level of study" autoFocus value={state.Speaker.studyLevel} onChange={(e) => updateUser({ studyLevel: e.target.value })} required />
                    <small id="studyLevelHelp" className="form-text text-muted">Ph.D</small>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-3" disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Update'}</button>
            </form>
        </>
    );
}

export default UpdateEvent;