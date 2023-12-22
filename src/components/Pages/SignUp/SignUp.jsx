import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import UsersContext from "../../../context/UserContext";
import styled from "styled-components";

const StyledSignUp = styled.main`
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

const SignUp = () => {

    const navigate = useNavigate();
    const { users, setUsers, UsersActionTypes, setLoggedInUser } = useContext(UsersContext);
    const [failedToRegister, setFailedToRegister] = useState({
        email: '',
        name: ''
    });

    const formValues = {
        userName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        image: ''
    };

    const validationSchema = Yup.object({
        userName: Yup.string()
            .min(3, "Username must be at least 3 symbols long")
            .max(20, "Username can't be longer than 20 symbols")
            .required("Field mus be filled")
            .trim(),
        email: Yup.string()
            .email("You must enter your valid email")
            .required("Field mus be filled")
            .trim(),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
                "Password must be 8-20 length, contain at least one uppercase, one lowercase, one number and one special symbol")
            .required("Field must be filled")
            .trim(),
        passwordRepeat: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Field mus be filled")
            .trim(),
        image: Yup.string()
            .url("Field must be filled with valid URL")
            .required("Field mus be filled")
            .trim()
    });
    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (users.find(user => user.userName === values.userName)) {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        name: 'User with this username already exists'
                    }
                });
            } else {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        name: ''
                    }
                });
            }
            if (users.find(user => user.email === values.email)) {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        email: 'User with this email already exists'
                    }
                });
            } else {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        email: ''
                    }
                });
            }

            if (!users.find(user => user.userName === values.userName) && !users.find(user => user.email === values.email)) {
                const workingUser = {
                    id: uuid(),
                    userName: values.userName,
                    email: values.email,
                    notHashedPassword: values.password,
                    password: bcrypt.hashSync(values.password, 8),
                    image: values.image,
                    registerDate: new Date().toISOString().slice(0, 10)
                };
                setUsers({
                    type: UsersActionTypes.add,
                    data: workingUser
                });
                setLoggedInUser(workingUser);
                navigate('/');
            }
        }
    });

    return (
        <StyledSignUp>
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="userName">User name:</label>
                        <input 
                            type="text"
                            name="userName"
                            id="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Create your username..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.userName && formik.errors.userName &&
                            <p style={{ color:"red" }}>{formik.errors.userName}</p>
                        }
                    </div>
                </div>
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
                            placeholder="Create your password..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.password && formik.errors.password &&
                            <p style={{ color:"red" }}>{formik.errors.password}</p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="passwordRepeat">Repeat password:</label>
                        <input 
                            type="password"
                            name="passwordRepeat"
                            id="passwordRepeat"
                            value={formik.values.passwordRepeat}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Repeat your password"
                        />
                    </div>
                    <div>
                        {
                            formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
                            <p style={{ color:"red" }}>{formik.errors.passwordRepeat}</p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="image">Image URL</label>
                        <input 
                            type="url"
                            name="image"
                            id="image"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter valid URl for image..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.image && formik.errors.image &&
                            <p style={{ color:"red" }}>{formik.errors.image}</p>
                        }
                    </div>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {
                failedToRegister.userName && <p>{failedToRegister.userName}</p>
            }
            {
                failedToRegister.email && <p>{failedToRegister.email}</p>
            }
        </StyledSignUp>
    );
}

export default SignUp;