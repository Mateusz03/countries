import { useEffect, useState, createContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Input from "./components/input";
import Button from "./components/button";
import axios from "axios";
import AppLoader from "./components/appLoader";

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
  font-weight: 700;
  font-family: poppins;
`;

function App() {
  const [table, setTable] = useState();
  const [selectedRates, setRates] = useState();
  const [click, setClick] = useState(0);
  const [inputValue, setInputValue] = useState([
    { message: "" },
    { message: "" },
  ]);
  const [inputLoader, setInputLoader] = useState(0);

  useEffect(() => {
    const local = process.env.REACT_APP_LOCAL;
    const url = process.env.REACT_APP_TABLEURL;
    const url_server = process.env.REACT_APP_TABLEURL_SERVER;

    (async () => {
      const res = await axios.post(local ? url : url_server);
      setTable(res.data);

      const curr1 = res.data.filter((currency) => currency.code === "PLN");
      const curr2 = res.data.filter((currency) => currency.code === "GBP");

      curr1[0].price = 1;
      curr2[0].price = curr1[0].price / curr2[0].price;
      setRates({ currency: [...curr1, ...curr2] });
    })();
  }, []);

  return (
    <Container>
      <GlobalStyle />
      {typeof table === "undefined" ? (
        <AppLoader />
      ) : (
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
            inputLoader,
            setInputLoader,
          }}
        >
          <Main>
            <Title>Exchange Rate</Title>
            <Input type="text" placeholder={"-"} title="You send" />
            <Input type="text" placeholder={"-"} title="They recive" />
            <Display>
              {typeof selectedRates !== "undefined"
                ? `${selectedRates.currency[0].code} ${parseFloat(
                    selectedRates.currency[0].price,
                  ).toPrecision(3)} - ${
                    selectedRates.currency[1].code
                  } ${parseFloat(selectedRates.currency[1].price).toPrecision(
                    3,
                  )}`
                : ""}
            </Display>
            {inputLoader === 0 ? <Button value="Continue" /> : <AppLoader />}
          </Main>
        </GlobalContext.Provider>
      )}
    </Container>
  );
}

export default App;
