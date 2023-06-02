import React, { useEffect, useState } from "react";
import "../../Register/Register.css"
import Notify from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import { clearErrors, register } from "../../../context/appAction";

const roles = ['Admin', 'Mentor'];

const userInit = {
    firstname: "Jevin",
    surname: "Sutariya",
    age: 20,
    email: "jevin@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    mobileNumber: "1234569821",
    gender: "Male",
    studyLevel: "12",
    role: "",
};

const Registeration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(userInit);
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    function validateForm() {
        return user.firstname.length > 2 && user.surname.length > 2 && user.email.length > 4 && user.age > 5 && user.studyLevel.length > 1 && user.password.length > 7 && user.password === user.confirmPassword;
    }

    const updateUser = (par) => {
        setUser({ ...user, ...par });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const usr = dispatch(register(user, true));
        Notify({
            message: `${usr.firstname} ${usr.surname} is registred successfully.`,
            type: "success"
        });
        //redirect user to home page
        navigate("/admin/users");
    };

    useEffect(() => {
        if (error) {
            Notify({message: error, type:"error"});
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
                        <input type="text" className="form-control" id="surname" aria-describedby="lastnameHelp" placeholder="Enter surname" value={user.surname} onChange={(e) => updateUser({ surname: e.target.value })} required />
                        <small id="lastnameHelp" className="form-text text-muted">Atleast 3 character.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={user.email} onChange={(e) => updateUser({ email: e.target.value })} required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="password">Password</label>
                        <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Enter password" value={user.password} onChange={(e) => updateUser({ password: e.target.value })} required />
                        <small id="passwordHelp" className="form-text text-muted">Digits of 8 length.</small>
                    </div>
                    <div className="form-group">
                        <label labelfor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Enter confirm password" value={user.confirmPassword} onChange={(e) => updateUser({ confirmPassword: e.target.value })} required />
                        <small id="confirmPasswordHelp" className="form-text text-muted">Password and confirm password should matched.</small>
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
                        <input type="text" className="form-control" id="studylevel" aria-describedby="studyLevelHelp" placeholder="Enter level of study" value={user.studyLevel} onChange={(e) => updateUser({ studyLevel: e.target.value })} required />
                        <small id="studyLevelHelp" className="form-text text-muted">Ex. 12th passout, B.Tech CE </small>
                    </div>
                    <div className="form-group">
                        <label labelfor="age">Role</label>
                        <select id="inputState" className="form-control" defaultValue={""} onChange={(e) => updateUser({ role: e.target.value })}>
                            <option value={""} >Choose...</option>
                            {
                                roles.map(role => <option key={role} value={role}>{role}</option>)
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-3" disabled={!validateForm()}>Register</button>
                </form>
            )}
        </>
    );
}

export default Registeration;