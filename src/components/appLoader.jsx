import styled from "styled-components";

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;
const Dots = styled.div`
  width: 16px;
  height: 16px;
  margin: 3px 6px;
  border-radius: 50%;
  background-color: #a3a1a1;
  opacity: 1;
  animation: bouncing-loader 0.6s infinite alternate;
  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translateY(-16px);
    }
  }
  ${Loader}:nth-child(2) {
    animation-delay: 0.2s;
  }
  ${Loader}:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
const AppLoader = () => {
  return (
    <Loader className="bouncing-loader">
      <Dots></Dots>
      <Dots></Dots>
      <Dots></Dots>
    </Loader>
  );
};

export default AppLoader;
