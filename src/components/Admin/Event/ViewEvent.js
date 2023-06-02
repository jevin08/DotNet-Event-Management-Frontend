import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notify from "../../../utils/toast";

const printFee = (num) => {
  if (0 === num)
    return "No fees";
  else if (num < 100)
    return `${num}₹ only`;
  return `${num}₹`;
}

function ViewEvent() {
  const [state, setState] = useState({});
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const more = (str, len = 33) => {
    if (str.length > len - 3)
      str = `${str.substr(0, len - 3)}...`;
    return str;
  };

  useEffect(() => {
    async function getEvent(id) {
      if (!localStorage.getItem('token')) {
        Notify({ message: `Please login first.`, type: "info" });
        navigate("/login");
      } else {
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
            res.data.StartTime = res.data.StartTime.substr(0, len - 4);
            res.data.EndTime = res.data.EndTime.substr(0, len - 4);
            setState(res.data);
            setIsLoading(false);
            console.log(res.data);
          });
      }
    }
    getEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeEvent = () => {
    if (!localStorage.getItem('token')) {
      Notify({ message: `Please login first.`, type: "info" });
      navigate("/login");
    } else {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Are you sure to delete ${state.Name} event!`)) {
        axios.delete(`https://localhost:7283/api/Event/Delete/${id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(res => {
            Notify({ message: `Event removed successfully.`, type: "success" });
            navigate("/admin/users");
          });
      }
    }
  }


  const handleSearch = (evnt) => {
    setKeyword(evnt.value);
  }

  return (
    <>
      {!isLoading ?
        <div className="album bg-light mt-5">
          <div className="">
            <div className="row">
              <div className="col-lg-5 col-md-6 mt-5">
                <div className="card mb-4 ml-5 box-shadow" style={{ width: "24rem" }}>
                  <img className="card-img-top" src="https://static.neweuropetours.eu/wp-content/uploads/2018/10/karaoke-berlin-1600x900.jpg" alt="Card  cap" />
                  <div className="card-body">
                    <h5 className="card-title">{state.Name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{printFee(state.Fees)}</h6>
                    <p className="card-text">{state.Description}</p>
                    <p className="card-text">Start Time of event is {new Date(state.StartTime).toLocaleString()}</p>
                    <p className="card-text">End Time of event is {new Date(state.EndTime).toLocaleString()}</p>
                    <p className="card-text"><strong>Venue</strong> : {state.Venue}</p>
                  </div>
                </div>
                <div className="card mb-4 ml-5 box-shadow" style={{ width: "24rem" }}>
                  <h5 className="card-title px-4 pt-3">Speaker</h5>
                  <div className="text-center">
                    <img className="card-img-top rounded-circle mt-4" src="https://th.bing.com/th/id/OIP.6g046R8XK5hclI-YnpjDnwHaHa" alt="Card cap" style={{ width: "200px", height: "200px" }} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title pl-4">{`${state.Speaker && state.Speaker.gender === "Male" ? "Mr." : "Ms."} ${state.Speaker.firstname} ${state.Speaker.surname}`}</h5>
                    <h6 className="card-subtitle mb-2 pl-5 text-muted">{state.Speaker.email}</h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><strong>Age</strong> : {state.Speaker.age}</li>
                      <li className="list-group-item"><strong>Mobile</strong> : {state.Speaker.mobileNumber}</li>
                      <li className="list-group-item"><strong>Study level</strong> : {state.Speaker.studyLevel}</li>
                    </ul>
                  </div>
                </div>
                <div className=" mb-4 ml-5 box-shadow" style={{ width: "24rem" }}>
                  <ul className="nav justify-content-around">
                    <li className="nav-item">
                      <button type="button" className="btn btn-primary " onClick={() => navigate(`/admin/event/update/${id}`)}>Update &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button type="button" className="btn btn-danger mr-1" onClick={removeEvent}> Remove &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="form-inline pt-3">
                  <div className="form-row d-flex justify-content-around">
                    <div className="col-8">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" value={keyword} aria-label="Search" onChange={(e) => handleSearch(e)} />
                    </div>
                    <div className="col-2">
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </div>
                  </div>
                </form>

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
                      {state.users && state.users.filter(item => `${item.firstname} ${item.lastname}`.includes(keyword)).map((user) =>
                        <tr key={user.id}>
                          <th scope="row" className="text-primary" onClick={() => navigate(`/admin/${user.role ? 'app' : ''}user/${user.id}`)} style={{ cursor: "pointer" }}>{`${user.gender === 'Male' ? 'Mr.' : (user.gender === 'Female' ? 'Ms.' : '')} ${user.firstname} ${user.surname}`}</th>
                          <td>{user.email}</td>
                          <td>{user.age}</td>
                          <td>{more(user.studyLevel)}</td>
                          <td>{user.role ? user.role : ''}</td>
                        </tr>)
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <></>
      }
    </>
  );
}

export default ViewEvent;