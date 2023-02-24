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
`;

const Button = (props) => {
  const { selectedRates, inputValue, setInputValue } =
    useContext(GlobalContext);

  const onClick = () => {
    (async () => {
      const res = await axios.post(
        process.env.REACT_APP_LOCAL === true
          ? process.env.REACT_APP_CALCULATION
          : process.env.REACT_APP_CALCULATION_SERVER,
        {
          body: { price: selectedRates.currency[1].price, inputs: inputValue },
        },
      );

      setInputValue(res.data.inputs);
    })();
  };

  return (
    <Butt
      onClick={() => {
        onClick();
      }}
    >
      {props.value}
    </Butt>
  );
};

export default Button;
