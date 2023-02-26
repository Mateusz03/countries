import axios from "axios";
import { useContext, useState } from "react";
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
  background-color: ${(props) => props.bg};
  visibility: ${(props) => props.visibility};
`;
const Country = styled.div`
  text-align: center;
  font-weight: 600;
  font-family: poppins;
`;
const Code = styled.div`
  font-weight: 700;
  font-family: poppins;
`;

const ListItem = (props) => {
  const { selectedRates, setRates, click, setClick } =
    useContext(GlobalContext);
  const [bg, setBg] = useState("#FFFFFF");
  const [visibility, setVisibility] = useState("block");

  const selectItem = (cl) => {
    let localRates = selectedRates;

    if (cl === 1) {
      if (!Object.values(selectedRates.currency[1]).includes(props.code)) {
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
      }
    } else if (cl === 2) {
      if (!Object.values(selectedRates.currency[0]).includes(props.code)) {
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
    }
    if (typeof selectedRates !== "undefined") {
      (async () => {
        const local = process.env.REACT_APP_LOCAL;
        const url = process.env.REACT_APP_CONVERSION;
        const url_server = process.env.REACT_APP_CONVERSION_SERVER;

        const res = await axios.post(local ? url : url_server, {
          body: [
            { curr: localRates.currency[0].code },
            { curr: localRates.currency[1].code },
          ],
        });
        setRates(res.data);
      })();
    }
  };
  return (
    <Container
      onClick={() => {
        selectItem(click);
        setClick(0);
      }}
    >
      <Flag
        crossOrigin={"anonymous"}
        src={props.flag}
        bg={bg}
        visibility={visibility}
        onError={({ currentTarget }) => {
          if (currentTarget.onerror === null) {
            setVisibility("hidden");
          }
        }}
        onLoad={() => {
          setBg("rgba(24, 24, 35, 0.2)");
        }}
      />
      <Country>{props.country}</Country>
      <Code>{props.code}</Code>
    </Container>
  );
};

export default ListItem;
