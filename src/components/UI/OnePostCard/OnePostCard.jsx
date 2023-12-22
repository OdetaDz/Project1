import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledCard = styled.div`
    min-height: 400px;
    width: 300px;
    border: 1px solid #53545468;
    border-radius: 10px;
    background-color: #ffffff69;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    > img{
        width: 100%;
    }
    > span.user{
        align-self: flex-end;
    }
    > span.more{
        color: #4d4b4bd1;
        &:hover{
            cursor: pointer;
            color: #B6CCFE;
        }
    }
    
`;
const OnePostCard = ({ data }) => {
    
    const navigate = useNavigate();

    return ( 
        <StyledCard>
            <img src={data.image} alt={`${data.name} picture`}/>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <span className="user">{data.userName}</span>
            <span className="more" onClick={() => {navigate(`/Posts/${data.id}`)}}>More...</span>
        </StyledCard>
     );
}
 
export default OnePostCard;