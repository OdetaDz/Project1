import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../../context/UserContext";
import styled from "styled-components";

const StyledHeader = styled.header`
    height: 100px;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    background-color: #CCDBFD;

    > div.logo{
        display: flex;
        flex-direction: column;
        /* padding-left: 40px; */
        align-items: center;
        justify-content: center;

        > img{
            height: 70px;
        }
    }
    
    a.active{
        text-decoration: underline;
    }
    > nav{
        > ul{
            display: flex;
            gap: 10px;
            list-style-type: none;
            padding-left: 0;
            align-items: center;
            justify-content: center;
            height: 100%;
            margin: 0;
            > li{
                > a{
                    text-decoration: none;
                    color: black;
                }
            }
        } 
    }
    > div.loginRegister{
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        /* padding-right: 40px; */

        > button{
            background-color: #E2EAFC;
            border: 1px solid #ABC4FF;
            border-radius: 10px;

            &:hover{
                background-color: #B6CCFE;
            }

            > a{
                text-decoration: none;
                color: black;
                padding: 3px 5px;

                
            }
        }
    }
    > div.user{
        display: flex;
        gap: 10px;
        align-items: center;
        /* padding-right: 40px; */

        > img{
            height: 50px;
            width: 50px;
            object-fit: cover;
            border-radius: 50%;
            border: 1px solid #53545468;

            &:hover{
                cursor: pointer;
            }
        }

        > span{

            &:hover{
                cursor: pointer;
            }
        }

        > button{
            background-color: #E2EAFC;
            border: 1px solid #ABC4FF;
            border-radius: 10px;
            padding: 3px 5px;

            &:hover{
                cursor: pointer;
                background-color: #B6CCFE;
            }
        }
    }
`;

const Header = () => {

    const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
    const navigate = useNavigate();

    return (
        <StyledHeader>
            <div className="logo" onClick={() => navigate('/')}>
                <img src="https://static.vecteezy.com/system/resources/previews/001/191/141/original/flower-logo-png.png" alt="Flower logo" />
                <span>Name</span>
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to="/Posts/All" className={({ isActive }) => isActive ? 'active' : ''}>Posts</NavLink></li>
                </ul>
            </nav>
            {!loggedInUser ?
                <div className="loginRegister">
                    <button><Link to="/Users/SignIn">Sign In</Link></button>
                    <button><Link to="/Users/SignUp">Sign Up</Link></button>
                </div>
                :
                <div className="user">
                    <img src={loggedInUser.image} alt={`${loggedInUser.userName} profile picture`} onClick={() => {navigate(`/Users/${loggedInUser.id}`)}}/>
                    <span onClick={() => {navigate(`/Users/${loggedInUser.id}`)}}>{loggedInUser.userName}</span>
                    <button onClick={() => {
                        setLoggedInUser('');
                        navigate('/');
                    }}>Log Out</button>
                </div>
            }
        </StyledHeader>
    );
}

export default Header;