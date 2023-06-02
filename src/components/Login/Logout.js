import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import Notify from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from "../../context/appAction";


const Logout = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if(error){
            Notify({message: error, type:"error"});
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            dispatch(logout());
            Notify({message: "Logout sucessfully", type: "success"});
            navigate("/login");
        }else{
            Notify({message: "Already logged out", type: "info"});
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <></>
    );
}

export default Logout;