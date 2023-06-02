import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Register/Register.css";
import Notify from "../../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";

const roles = ['Admin', 'Mentor'];

const userInit = {
    firstname: "Jevin",
    surname: "Sutariya",
    age: 20,
    email: "jevin@gmail.com",
    password:"12345678",
    confirmPassword:"12345678",
    mobileNumber: "1234569821",
    gender: "Male",
    studyLevel: "12",
    role: "",
};

const UpdateAppUser = () => {
    const { id } = useParams();
    const [state, setState] = useState(userInit);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => (state.firstname.length > 2 && state.surname.length > 2 && state.email.length > 5 && state.studyLevel.length > 2);

    const updateState = (par) => setState({ ...state, ...par });

    useEffect(() => {
        async function getUser(id) {
            if (!localStorage.getItem('token')) {
                Notify({ message: `Please login first.`, type: "info" });
                navigate("/login");
            } else {
                axios.get(`https://localhost:7283/api/AppUser/${id}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(res => {
                        setState(res.data);
                    }).catch(err=>{
                        Notify({ message: `Something went wrong.You can register instead.`, type: "error" });
                        navigate("/admin/register");
                    });
            }
        }
        getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios.put(`https://localhost:7283/api/AppUser/Update/${id}`,
            state,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                const user = response.data;
                Notify({
                    message: `${user.firstname} ${user.surname} is updated successfully.`,
                    type: "success"
                });
                //redirect user to event home page
                navigate(`/admin/appuser/${user.id}`);
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
                    <label labelfor="firstname">First name</label>
                    <input type="text" className="form-control" id="firstname" aria-describedby="firstnameHelp" placeholder="Enter first name" autoFocus value={state.firstname} onChange={(e) => updateState({ firstname: e.target.value })} required />
                    <small id="firstnameHelp" className="form-text text-muted">Atleast 3 character.</small>
                </div>
                <div className="form-group">
                    <label labelfor="surname">Surname</label>
                    <input type="text" className="form-control" id="surname" aria-describedby="lastnameHelp" placeholder="Enter surname" autoFocus value={state.surname} onChange={(e) => updateState({ surname: e.target.value })} required />
                    <small id="lastnameHelp" className="form-text text-muted">Atleast 3 character.</small>
                </div>
                <div className="form-group">
                    <label labelfor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" autoFocus value={state.email} onChange={(e) => updateState({ email: e.target.value })} required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label labelfor="age">Age</label>
                    <input type="number" className="form-control" id="age" aria-describedby="ageHelp" min={5} max={150} placeholder="Age" value={state.age} onChange={(e) => updateState({ age: e.target.value })} />
                    <small id="ageHelp" className="form-text text-muted">Age limit is 5 to 150.</small>
                </div>
                <div className="form-group">
                    <label labelfor="mobileno">Mobile Number</label>
                    <input type="number" className="form-control" id="mobileNumber" aria-describedby="mobileHelp" minLength={10} maxLength={10} min={1000000000} max={9999999999} placeholder="Mobile no" value={state.mobileNumber} onChange={(e) => updateState({ mobileNumber: e.target.value })} />
                    <small id="mobileHelp" className="form-text text-muted">Valid 10 digit mobile no.</small>
                </div>
                <div className="form-group">
                    <label labelfor="gender">Gender</label>
                    <br />
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value={"Male"} checked={state.gender === "Male"} onChange={(e) => updateState({ gender: e.target.value })} required />
                        <label className="form-check-label" labelfor="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value={"Female"} checked={state.gender === "Female"} onChange={(e) => updateState({ gender: e.target.value })} />
                        <label className="form-check-label" labelfor="flexRadioDefault1">
                            Female
                        </label>
                    </div>            <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value={"Other"} checked={state.gender === "Other"} onChange={(e) => updateState({ gender: e.target.value })} />
                        <label className="form-check-label" labelfor="flexRadioDefault1">
                            Other
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label labelfor="studyLevel">Level of study</label>
                    <input type="text" className="form-control" id="studylevel" aria-describedby="studyLevelHelp" placeholder="Enter level of study" autoFocus value={state.studyLevel} onChange={(e) => updateState({ studyLevel: e.target.value })} required />
                    <small id="studyLevelHelp" className="form-text text-muted">Ph.D</small>
                </div>
                <div className="form-group">
                    <label labelfor="age">Role</label>
                    <select id="inputState" className="form-control" defaultValue={""} onChange={(e)=>updateState({ role: e.target.value })}>
                        <option value={""} >Choose...</option>
                        {
                            roles.map(role => <option key={role} value={role} selected={role===state.role}>{role}</option>)
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-3" disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Update'}</button>
            </form>
        </>
    );
}

export default UpdateAppUser;