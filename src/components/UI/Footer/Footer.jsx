import styled from "styled-components";

const StyledFooter = styled.footer`
    height: 100px;
    box-sizing: border-box;
    border-top: 1px solid black;
    background-color: #CCDBFD;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <p>Copyright &copy; {new Date().getFullYear()} by Odeta Džiugytė</p>
        </StyledFooter>
     );
}
 
export default Footer;