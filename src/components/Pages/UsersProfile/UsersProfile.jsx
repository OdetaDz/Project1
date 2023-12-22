import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersContext from "../../../context/UserContext";
import styled from "styled-components";

const StyledProfile = styled.main`
    min-height: calc(100vh - 200px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    background-color: #EDF2FB;

    > div.picture{
        display: flex;
        justify-content: center;
        align-items: center;

        > img{
            height: 60%;
            border-radius: 50%;
            border: 1px solid #53545468;
        }
    }

    > div.info{
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }
`;

const UsersProfile = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [ user, setUser ] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8081/users/${id}`)
            .then(res => res.json())
            .then(data => {
                if(!data.userName){
                    navigate('/');
                }
                setUser(data);
            })
    }, []);

    return ( 
        <StyledProfile>
            <div className="picture">
                <img src={user.image} alt={`${user.userName} profile picture`}/>
            </div>
            <div className="info">
                <h2>My username: {user.userName}</h2>
                <h4>My email: {user.email}</h4>
                <p>Registered: {user.registerDate}</p>
            </div>
        </StyledProfile>
     );
}
 
export default UsersProfile;