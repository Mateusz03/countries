import { useEffect, useState, createContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Input from "./components/input";
import Button from "./components/button";
import axios from "axios";

export const GlobalContext = createContext();

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

body{
  margin:0;
  padding:0;
  background-color: #e9f8f9;
  z-index:0;
}
`;

const Container = styled.div`
  z-index: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 4px 8px 1px #181823;
  @media screen and (min-width: 500px) {
    width: 500px;
    height: 500px;
    @media screen and (min-height: 730px) {
      height: 60%;
    }
  }
`;

const Title = styled.div`
  color: #537fe7;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  margin-bottom: 32px;
`;

const Display = styled.div`
  height: 2rem;
`;

function App() {
  const [table, setTable] = useState();
  const [selectedRates, setRates] = useState();
  const [click, setClick] = useState(0);
  const [inputValue, setInputValue] = useState([
    { message: "" },
    { message: "" },
  ]);

  useEffect(() => {
    (async () => {
      const res = await axios.post(
        process.env.REACT_APP_LOCAL === true
          ? process.env.REACT_APP_TABLEURL
          : process.env.REACT_APP_TABLEURL_SERVER,
      );
      setTable(res.data);

      const curr1 = res.data.filter((currency) => currency.code === "PLN");
      const curr2 = res.data.filter((currency) => currency.code === "GBP");

      curr1[0].price = 1;
      curr2[0].price = (curr1[0].price / curr2[0].price).toFixed(2);
      setRates({ currency: [...curr1, ...curr2] });
    })();
  }, []);

  return (
    <Container>
      <GlobalContext.Provider
        value={{
          selectedRates,
          setRates,
          table,
          setTable,
          click,
          setClick,
          inputValue,
          setInputValue,
        }}
      >
        <GlobalStyle />
        <Main>
          <Title>Exchange Rate</Title>
          <Input type="text" placeholder="-" title="You send" />
          <Input type="text" placeholder="-" title="They recive" />
          <Display>
            {typeof selectedRates !== "undefined"
              ? `${
                  selectedRates.currency[0].code
                } ${selectedRates.currency[0].price.toFixed(2)} - ${
                  selectedRates.currency[1].code
                } ${selectedRates.currency[1].price}`
              : ""}
          </Display>
          <Button value="Continue" />
        </Main>
      </GlobalContext.Provider>
    </Container>
  );
}

export default App;
