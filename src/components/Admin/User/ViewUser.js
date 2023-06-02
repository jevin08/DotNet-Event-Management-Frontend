import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notify from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../../context/appAction";

function ViewUser() {
	const dispatch = useDispatch();
	const [state, setState] = useState({});
	const [keyword, setKeyword] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams();
	const { events } = useSelector(
		(state) => state.events
	);
	const [eventList, setEventList] = useState([]);

	useEffect(() => {
		async function getUser(id) {
			if (!localStorage.getItem('token')) {
				Notify({ message: `Please login first.`, type: "info" });
				navigate("/login");
			} else {
				axios.get(`https://localhost:7283/api/User/${id}`,
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
						setIsLoading(false);
					});
				}
			}
			getUser(id);
			dispatch(getEvents());
			setEventList(events);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSearch = (event) => {
		event.preventDefault();
		setEventList(
			events.filter(
				evnt => evnt.Name.toLowerCase().includes(keyword)
			).map(evnt => evnt));
	}

	useEffect(() => {
	}, [eventList]);

	const removeUser = () => {
		if (!localStorage.getItem('token')) {
			Notify({ message: `Please login first.`, type: "info" });
			navigate("/login");
		} else {
			axios.delete(`https://localhost:7283/api/User/Delete/${id}`,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				})
				.then(res => {
					Notify({ message: `User removed successfully.`, type: "success" });
					navigate("/admin/users");
				});
		}
	}

	const updateUser = () => {
		console.log(state);
		axios.put(`https://localhost:7283/api/User/Update/${state.id}`, state,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => {
			Notify({
				message: `Event enrolled successfully.`,
				type: "success"
			});
		})
		.catch(err => {
			console.log(err);
			if (err.response.status === 401) {
				console.log('Something went wrong');
			}
		});
	}
	const updateEvent = (evnt) => {
		console.log(evnt);
		axios.put(`https://localhost:7283/api/Event/Update/${evnt.id}`, evnt,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => {
			dispatch(getEvents());
		})
		.catch(err => {
			console.log(err);
			if (err.response.status === 401) {
				console.log('Something went wrong');
			}
		});
	}

	const removeEvent = (evt) => {
		let usr = state;
		usr.events = usr.events.filter(e=>e.id!==evt.id);
		setState(usr);
		updateUser();

		evt.users = evt.users.filter(u=>u.id!==usr.id);
		updateEvent(evt);
	}
 	const enrollEvent = (evt) => {
		let e = state.events.filter(e=>e.id===evt.id);
		if(e.length===0){
			let usr = state;
			evt.users = [...evt.users, usr];
			updateEvent(evt);

			usr.events = [...usr.events, evt];
			setState(usr);
			updateUser();
		}
	}

	return (
		<>
			{!isLoading ?
				<div className="row">
					<div className="container col-lg-5 col-md-6 d-flex align-items-center justify-content-center mt-5">
						<div className="card mb-4 ml-5 box-shadow " style={{ width: "24rem" }}>
							<div className="text-center">
								<img className="card-img-top rounded-circle mt-4" src={"https://th.bing.com/th/id/OIP.6g046R8XK5hclI-YnpjDnwHaHa"} alt="something" style={{ width: "200px", height: "200px" }} />
							</div>
							<div className="card-body">
								<h5 className="card-title pl-4">{`${state.gender === 'Male' ? 'Mr.' : (state.gender === 'Female' ? 'Ms.' : '')} ${state.firstname} ${state.surname}`}</h5>
								<h6 className="card-subtitle mb-2 pl-4 text-muted">{state.email}</h6>
								<ul className="list-group list-group-flush">
									<li className="list-group-item"><strong>Age</strong> : {state.age}</li>
									<li className="list-group-item"><strong>Mobile</strong> : {state.mobileNumber}</li>
									<li className="list-group-item"><strong>Study level</strong> : {state.studyLevel}</li>
								</ul>
								<br />
								<div className="nav justify-content-around">
									<button type="button" className="btn btn-primary mr-1" onClick={() => navigate(`/admin/user/update/${id}`)}>Update &nbsp;
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
											<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
											<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
										</svg>
									</button>
									<button type="button" className="btn btn-danger mr-1" onClick={removeUser}> Remove &nbsp;
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
											<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 p-0">
						<form className="form-inline mt-5 pt-2" onSubmit={(e)	=>handleSearch(e)}>
							<div className="form-row d-flex justify-content-around">
								<div className="col-8">
									<input className="form-control mr-sm-2" type="search" placeholder="Search" value={keyword} aria-label="Search" onChange={(e) =>setKeyword(e.target.value.toLowerCase())} />
								</div>
								<div className="col-2">
									<button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
								</div>
							</div>
						</form>

						<div className="table-responsive px-4">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Speaker</th>
										<th scope="col">Date</th>
										<th scope="col">Fees</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody>
									{eventList && eventList.map(evnt =>
										<tr key={evnt.id}>
											<th scope="row" className="text-primary" onClick={() => navigate(`/admin/event/${evnt.id}`)} style={{ cursor: "pointer" }}>{evnt.Name}</th>
											<td>{`${evnt.Speaker.firstname} ${evnt.Speaker.surname}`}</td>
											<td>{new Date(evnt.StartTime).toDateString()}</td>
											<td>{evnt.Fees}</td>
											<td>{
												(evnt.users.filter(u=>u.id===state.id)).length ? <button className="btn btn-small btn-danger" onClick={()=>removeEvent(evnt)}>Remove</button> :<button className="btn btn-small btn-success" onClick={()=>enrollEvent(evnt)}>Enroll</button>
												}</td>
										</tr>)
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				: <></>
			}
		</>
	);
}

export default ViewUser;