import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../App";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #181823;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
  user-select: none;
  cursor: pointer;
`;
const Flag = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: rgba(24, 24, 35, 0.2);
`;
const Country = styled.div`
  text-align: center;
  font-weight: 700;
`;
const Code = styled.div`
  font-weight: 700;
`;

const ListItem = (props) => {
  const { selectedRates, setRates, click } = useContext(GlobalContext);
  const selectItem = (cl) => {
    let localRates = selectedRates;

    if (cl === 1) {
      localRates = {
        currency: [
          {
            currency: props.country,
            code: props.code,
            flagURL: props.flag,
            price: props.price,
          },
          ...selectedRates.currency.slice(-1),
        ],
      };
    } else if (cl === 2) {
      localRates = {
        currency: [
          selectedRates.currency[0],
          {
            currency: props.country,
            code: props.code,
            flagURL: props.flag,
            price: props.price,
          },
        ],
      };
    }
    if (typeof selectedRates !== "undefined") {
      (async () => {
        const res = await axios.post(
          process.env.REACT_APP_LOCAL === true
            ? process.env.REACT_APP_CONVERSION
            : process.env.REACT_APP_CONVERSION_SERVER,
          {
            body: [
              { curr: localRates.currency[0].code },
              { curr: localRates.currency[1].code },
            ],
          },
        );
        setRates(res.data);
      })();
    }
  };
  return (
    <Container
      onClick={() => {
        selectItem(click);
      }}
    >
      <Flag crossOrigin={"anonymous"} src={props.flag} />
      <Country>{props.country}</Country>
      <Code>{props.code}</Code>
    </Container>
  );
};

export default ListItem;
