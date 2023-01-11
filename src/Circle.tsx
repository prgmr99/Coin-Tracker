import { useState } from 'react';
import styled from 'styled-components';

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}
const Container = styled.div<CircleProps>`
    width: 200px;
    height: 200px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 10px solid ${props => props.borderColor};
`;

function Circle( {bgColor, borderColor, text = "default text"}:CircleProps ) {
    const [counter, setCounter] = useState(1);
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor }>
        {text}
        </Container>
}

export default Circle;