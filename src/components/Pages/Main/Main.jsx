import styled from "styled-components";
import { Carousel } from "../../UI/Carousel/Carousel";
import sewing1 from "../../../images/sewing1.jpg";
import sewing2 from "../../../images/sewing2.jpg";
import sewing3 from "../../../images/sewing3.jpg";
import sewing4 from "../../../images/sewing4.jpg";
import sewing5 from "../../../images/sewing5.jpg";

const StyledMain = styled.main`
    min-height: calc(100vh - 200px);
`;

const Main = () => {

    const slides = [
        {
            src: sewing1,
            alt: "Image 1 for carousel"
        },
        {
            src: sewing2,
            alt: "Image 2 for carousel"
        },
        {
            src: sewing3,
            alt: "Image 3 for carousel"
        },
        {
            src: sewing4,
            alt: "Image 4 for carousel"
        },
        {
            src: sewing5,
            alt: "Image 5 for carousel"
        }
      ];
    return ( 
        <StyledMain>
            <Carousel data={slides} />
        </StyledMain>
     );
}
 
export default Main;