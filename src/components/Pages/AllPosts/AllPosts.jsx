import { useContext, useState } from "react";
import PostsContext from "../../../context/PostContext";
import OnePostCard from "../../UI/OnePostCard/OnePostCard";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledPosts = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EDF2FB;

    > button{
        align-self: flex-end;
        margin: 0 40px 20px 0;
        background-color: #E2EAFC;
        border: 1px solid #ABC4FF;
        border-radius: 10px;
        padding: 5px 10px;

        &:hover{
            cursor: pointer;
            background-color: #B6CCFE;
        }
    }
    > div.all{
        display: flex;
        justify-content: space-evenly;
        gap: 20px;
        flex-wrap: wrap;
        padding-bottom: 20px;
    }
`;

const AllPosts = () => {

    const { posts } = useContext(PostsContext);
    const navigate = useNavigate();
    return ( 
        <StyledPosts>
            <h1>All posts</h1>
            
                <button onClick={() => {
                    navigate('/Posts/AddNew');
                }}>Add new</button>
            
            <div className="all">
                {
                    posts.map(post => {
                        return <OnePostCard  
                            key={post.id}
                            data={post}
                        />
                    })
                }
            </div>
        </StyledPosts>
     );
}
 
export default AllPosts;