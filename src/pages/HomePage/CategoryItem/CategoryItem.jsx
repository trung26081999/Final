import styled from "styled-components";

const Container = styled.div`
    width: 500px;
    margin: 3px;
    height: 300px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Info = styled.div`
    position: absolute;

`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    font-size: 15px;
`;



const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
            </Info>
        </Container>
    );
};

export default CategoryItem;
