import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../App";

const Butt = styled.div`
  padding: 10px 15px;
  background-color: #537fe7;
  color: white;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  box-shadow: 0px 4px 8px 1px #181823;
  border-radius: 5px;
  cursor: pointer;
  transition: 60ms;
  &:hover {
    transform: scale(1.1);
  }
`;

const Button = (props) => {
  const { selectedRates, inputValue, setInputValue, setInputLoader } =
    useContext(GlobalContext);

  const onClick = () => {
    (async () => {
      const local = process.env.REACT_APP_LOCAL;
      const url = process.env.REACT_APP_CALCULATION;
      const url_server = process.env.REACT_APP_CALCULATION_SERVER;
      const res = await axios.post(local ? url : url_server, {
        body: { price: selectedRates.currency[1].price, inputs: inputValue },
      });
      setInputLoader(0);
      setInputValue(res.data.inputs);
    })();
  };

  return (
    <Butt
      onClick={() => {
        if (inputValue[0].message !== "" || inputValue[1].message !== "") {
          onClick();
          setInputLoader(1);
        }
      }}
    >
      {props.value}
    </Butt>
  );
};

export default Button;
