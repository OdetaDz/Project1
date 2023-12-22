import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostsContext from "../../../context/PostContext";

const StyledEditPost = styled.main`
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

const EditPost = () => {

    const { setPosts, PostsActionTypes } = useContext(PostsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        image: '',
        name: '',
        description: '',
        colors: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8081/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                if (!data.name) {
                    navigate('/');
                }
                setFormValues({
                    ...data
                });
            })
    }, []);

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

    return (
        <StyledEditPost>
            <h1>Edit your post</h1>
            {
                formValues.name && <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const finalValues = {
                            ...values,
                            edited: true,
                            editedDate: new Date().toISOString().slice(0, 10)
                        };
                        setPosts({
                            type: PostsActionTypes.edit,
                            id: id,
                            data: finalValues
                        });
                        navigate(`/Posts/${id}`);
                    }}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <div>
                                <div>
                                    <label htmlFor="image">Image:</label>
                                    <input
                                        type="url"
                                        name="image"
                                        id="image"
                                        value={props.values.image}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Enter image url..."
                                    />
                                </div>
                                <div>
                                    {
                                        props.touched.image && props.errors.image &&
                                        <p style={{ color: "red" }}>{props.errors.image}</p>
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
                                        value={props.values.name}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Enter product name..."
                                    />
                                </div>
                                <div>
                                    {
                                        props.touched.name && props.errors.name &&
                                        <p style={{ color: "red" }}>{props.errors.name}</p>
                                    }
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        value={props.values.description}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Enter product description..."
                                    ></textarea>
                                </div>
                                <div>
                                    {
                                        props.touched.description && props.errors.description &&
                                        <p style={{ color: "red" }}>{props.errors.description}</p>
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
                                        value={props.values.colors}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Enter available colors..."
                                    />
                                </div>
                                <div>
                                    {
                                        props.touched.colors && props.errors.colors &&
                                        <p style={{ color: "red" }}>{props.errors.colors}</p>
                                    }
                                </div>
                            </div>
                            <button type="submit">Save edit</button>
                        </form>
                    )}
                </Formik>
            }
        </StyledEditPost>
    );
}

export default EditPost;