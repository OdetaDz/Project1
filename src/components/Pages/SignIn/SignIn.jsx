import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import UsersContext from "../../../context/UserContext";
import styled from "styled-components";

const StyledSignIn = styled.main`
    min-height: calc(100vh - 200px);
    background-color: #EDF2FB;
    display: flex;
    flex-direction: column;
    align-items: center;

    > h1{
        margin: 0;
        padding: 10px;
    }

    > form{
        width: 40%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;

        > div {
            
            > div:nth-child(1){
            display: grid;
            grid-template-columns: 1fr 3fr;
            align-items: center;
                > input{
                    border-radius: 5px;
                    height: 25px;
                    border: 1px solid #3233325d;
                    background-color: #ccdbfd4f;
                }
            }
            > div:nth-child(2){
                display: flex;
               justify-content: center;
            }
        }

        > button{
            background-color: #D7E3FC;
            border: 1px solid #ABC4FF;
            border-radius: 10px;
            padding: 5px 7px;
            margin: 0 auto 20px auto;

            &:hover{
                cursor: pointer;
                background-color: #B6CCFE;
            }
        }
    }
`;
const SignIn = () => {

    const navigate = useNavigate();
    const { users, setLoggedInUser } = useContext(UsersContext);
    const [failesToLogIn, setFailedToLogIn] = useState(false);

    const formValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("You must enter your valid email")
            .required("Field mus be filled")
            .trim(),
        password: Yup.string()
            .required("Field must be filled")
            .trim()
    });

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const loggedInUser = users.find(user => user.email === values.email && bcrypt.compareSync(values.password, user.password)); 

            if(loggedInUser === undefined){
                setFailedToLogIn(true);
            } else {
                setLoggedInUser(loggedInUser);
                navigate('/');
            }
        }
      });

    return ( 
        <StyledSignIn>
            <h1>Sign In</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.email && formik.errors.email &&
                            <p style={{ color:"red" }}>{formik.errors.email}</p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your password..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.password && formik.errors.password &&
                            <p style={{ color:"red" }}>{formik.errors.password}</p>
                        }
                    </div>
                </div>
                <button type="submit">Sign In</button>
            </form>
            {
                failesToLogIn && <p>No user with such credentials</p>
            }
        </StyledSignIn>
     );
}
 
export default SignIn;