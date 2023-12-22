import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import PostsContext from "../../../context/PostContext";
import UsersContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledAddNew = styled.main`
    min-height: calc(100vh - 200px);
    background-color: #EDF2FB;
    display: flex;
    flex-direction: column;
    align-items: center;

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
                
                >textarea{
                    border-radius: 5px;
                    height: 50px;
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

const AddNewPost = () => {

    const { setPosts, PostsActionTypes } = useContext(PostsContext);
    const { loggedInUser } = useContext(UsersContext);
    const navigate = useNavigate();

    const values = {
        image: '',
        name: '',
        description: '',
        colors: ''
    };

    const validationSchema = Yup.object({
        image: Yup.string()
            .url('Add valid url link')
            .required('This field must be filled')
            .trim(),
        name: Yup.string()
            .min(3, 'Name must be at least 3 symbols long')
            .max(30, "Name can't be longer then 30 symbols")
            .required("This field must be filled")
            .trim(),
        description: Yup.string()
            .min(3, "Description must be at least 3 symbold long")
            .max(500, "Description can't be longer then 500 symbols")
            .required("This field must be filled")
            .trim(),
        colors: Yup.string()
            .min(5, 'Colors must be at least 5 symbols long')
            .max(100, "Name can't be longer then 100 symbols")
            .required("This field must be filled")
            .trim()
    });

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const finalValues = {
                id: uuid(),
                userId: loggedInUser.id,
                userName: loggedInUser.userNam,
                userEmai: loggedInUser.email,
                ...values,
                created: new Date().toISOString().slice(0,10),
                edited: false,
                editedDate: ''
            }
            setPosts({
                type: PostsActionTypes.add,
                data: finalValues
            });
            navigate('/Posts/All');
        }
    })

    return ( 
        <StyledAddNew>
            <h1>Add new post</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="image">Image:</label>
                        <input 
                            type="url"
                            name="image"
                            id="image"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter image url..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.image && formik.errors.image &&
                            <p style={{ color: "red"}}>{formik.errors.image}</p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter product name..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.name && formik.errors.name &&
                            <p style={{ color: "red"}}>{formik.errors.name}</p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea 
                            name="description"
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter product description..."
                        ></textarea>
                    </div>
                    <div>
                        {
                            formik.touched.description && formik.errors.description &&
                            <p style={{ color: "red"}}>{formik.errors.description}</p>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="colors">Colors:</label>
                        <input 
                            type="text"
                            name="colors"
                            id="colors"
                            value={formik.values.colors}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter available colors..."
                        />
                    </div>
                    <div>
                        {
                            formik.touched.colors && formik.errors.colors &&
                            <p style={{ color: "red"}}>{formik.errors.colors}</p>
                        }
                    </div>
                </div>
                <button type="submit">Add new</button>
            </form>
        </StyledAddNew>
     );
}
 
export default AddNewPost;