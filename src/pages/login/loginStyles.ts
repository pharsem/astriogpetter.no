import styled from 'styled-components';

type WrapperProps = {
  bgImage: string;
  opacity: number;
};

export const Wrapper = styled.div<WrapperProps>`
  height: 100vh;
  background: url(${props => props.bgImage}) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s;
  opacity: ${props => props.opacity};
`;

export const Form = styled.form`
  background: rgba(255, 255, 255, 0.8); // this gives a slight white transparency to make text readable
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #0050c3;
  }
`;