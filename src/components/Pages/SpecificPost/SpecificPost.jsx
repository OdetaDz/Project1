import { useEffect, useContext, useState } from "react";
import PostsContext from "../../../context/PostContext";
import { useParams, useNavigate } from "react-router-dom";
import UsersContext from "../../../context/UserContext";
import styled from "styled-components";

const StyledPost = styled.main`
    min-height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    background-color: #EDF2FB;

    > div{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;

        > div{
            display: grid;
            grid-template-columns: 1fr 2fr;

            > img{
                width: 400px;
            }
            > div.details{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;

                > div > p{
                    > span{
                        color: #ABC4FF;
                        text-decoration: underline;
                    }
                }

                > div.buttons{
                    display: flex;
                    gap: 50px;

                    > button{
                        background-color: #E2EAFC;
                        border: 1px solid #ABC4FF;
                        border-radius: 10px;
                        padding: 5px 10px;

                        &:hover{
                            cursor: pointer;
                            background-color: #B6CCFE;
                        }
                    }
                }
            }
        }
    }
`
const SpecificPost = () => {

    const { id } = useParams();
    const [post, setPost] = useState('');
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UsersContext);
    const { setPosts, PostsActionTypes } = useContext(PostsContext);

    useEffect(() => {
        fetch(`http://localhost:8081/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                if(!data.name){
                    navigate('/');
                }
                setPost(data)
            })
    }, []);

    return ( 
        <StyledPost>
            <div>
                <h1>{post.name}</h1>
                <div>
                    <img src={post.image} alt={`${post.name} picture`}/>
                    <div className="details">
                        <div>
                            <p>Product description: {post.description}</p>
                            <p>Available colors: {post.colors}</p>
                            <p>Cost depends on size, contact <span>{post.userEmail}</span> for detailed price.</p>
                        </div>
                        <div className="buttons">
                            {
                                loggedInUser.id === post.userId ?
                                <>
                                    <button onClick={() => {navigate(`/Posts/Edit/${post.id}`)}}>Edit</button>
                                    <button onClick={() => {
                                        setPosts({
                                            type: PostsActionTypes.delete, id: id});
                                            navigate('/Posts/All')
                                    }}
                                    >Delete</button>
                                </>
                                :
                                ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </StyledPost>
     );
}
 
export default SpecificPost;