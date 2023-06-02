import React, { useEffect, useState } from "react";
import "./Register.css"
import Notify from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, getUserDetails, register } from "../../context/appAction";
import Loader from "../Loader";
import { APP_API } from "../../utils/auth";
import axios from "axios";

const userInit = {
    firstname: "",
    surname: "",
    email: "",
    age: 18,
    mobileNumber: "",
    gender: "Male",
    studyLevel: "",
    mentor: {},
};

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(userInit);
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );
    const {userDetails} = useSelector(
        (state)=>state.userDetails
    );

    function validateForm() {
        return user.firstname.length > 2 && user.surname.length > 2 && user.email.length > 4 && user.age > 5 && user.studyLevel.length > 1;
    }

    const updateUser = (par) => {
        setUser({ ...user, ...par });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(register(user, false));
        //redirect user to home page
        navigate("/users");

    };

    useEffect(() => {
        async function getMentor()  {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };
            const { data } = await axios.get(`${APP_API}/api/AppUser/${sessionStorage.getItem('user_id')}`, config);
            user.mentor = data;
        }
        getMentor();
    }, []);

    useEffect(() => {
        if (error) {
            Notify({ message: error, type: "error" });
            dispatch(clearErrors());
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <form onSubmit={handleSubmit} className="myForm border border-primary rounded">
                    <div className="form-group">
                        <label labelfor="firstname">First name</label>
                        <input type="text" className="form-control" id="firstname" aria-describedby="firstnameHelp" placeholder="Enter first name" autoFocus value={user.firstname} onChange={(e) => updateUser({ firstname: e.target.value })} required />
                        <small id="firstnameHelp" className="form-text text-muted">Atleast 3 character.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="surname">Surname</label>
                        <input type="text" className="form-control" id="surname" aria-describedby="lastnameHelp" placeholder="Enter surname" autoFocus value={user.surname} onChange={(e) => updateUser({ surname: e.target.value })} required />
                        <small id="lastnameHelp" className="form-text text-muted">Atleast 3 character.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" autoFocus value={user.email} onChange={(e) => updateUser({ email: e.target.value })} required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="age">Age</label>
                        <input type="number" className="form-control" id="age" aria-describedby="ageHelp" min={5} max={150} placeholder="Age" value={user.age} onChange={(e) => updateUser({ age: e.target.value })} />
                        <small id="ageHelp" className="form-text text-muted">Age limit is 5 to 150.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="mobileno">Mobile Number</label>
                        <input type="number" className="form-control" id="mobileNumber" aria-describedby="mobileHelp" minLength={10} maxLength={10} min={1000000000} max={9999999999} placeholder="Mobile no" value={user.mobileNumber} onChange={(e) => updateUser({ mobileNumber: e.target.value })} />
                        <small id="mobileHelp" className="form-text text-muted">Valid 10 digit mobile no.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="gender">Gender</label>
                        <br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" value={"Male"} checked={user.gender === "Male"} onChange={(e) => updateUser({ gender: e.target.value })} required />
                            <label className="form-check-label" labelfor="flexRadioDefault1">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" value={"Female"} checked={user.gender === "Female"} onChange={(e) => updateUser({ gender: e.target.value })} />
                            <label className="form-check-label" labelfor="flexRadioDefault1">
                                Female
                            </label>
                        </div>            <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" value={"Other"} checked={user.gender === "Other"} onChange={(e) => updateUser({ gender: e.target.value })} />
                            <label className="form-check-label" labelfor="flexRadioDefault1">
                                Other
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label labelfor="studyLevel">Level of study</label>
                        <input type="text" className="form-control" id="studylevel" aria-describedby="studyLevelHelp" placeholder="Enter level of study" autoFocus value={user.studyLevel} onChange={(e) => updateUser({ studyLevel: e.target.value })} required />
                        <small id="studyLevelHelp" className="form-text text-muted">Ex. 12th passout, B.Tech CE </small>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-3" disabled={!validateForm()}>Register user</button>
                </form>)}
        </>
    );
}

export default Register;