import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    transform: rotate(0deg);
    border-radius: 0px;
    background-color: teal;
  }
  to {
    transform: rotate(360deg);
    border-radius: 100px;
    background-color: tomato;
  }
`;

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${animation} 1s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 40px;
    }
  }
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal">
        <span>🌝</span>
      </Box>
    </Father>
  );
}

export default App;
