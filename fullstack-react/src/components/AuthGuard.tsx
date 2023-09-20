import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthGuard = ({component}:{component:any}) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Auth Guard");
        let authToken=localStorage.getItem("Authorization");
        console.log(authToken);
        if(authToken===undefined || authToken===null){
            navigate("/login");
        }
    }, []);

    return <React.Fragment>{component}</React.Fragment>
}

export default AuthGuard;