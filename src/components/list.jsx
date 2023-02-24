import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../App";
import { ReactComponent as Loop } from "../svg/loop.svg";
import ListItem from "./listItem";

const Container = styled.div`
  position: absolute;
  z-index: 2;
  top: 6rem;
  right: -5px;
  width: 18rem;
  height: 300px;
  background-color: white;
  box-shadow: 0px 0px 4px 0px #181823;
  align-self: flex-end;

  border-radius: 5px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid #181823;
`;

const Input = styled.input`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  width: 80%;
  height: 30px;
  padding: 0px 16px 0px 16px;
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 0px 5px 0px 0px;
`;

const ItemsContainer = styled.div`
  margin-top: 10px;
  position: relative;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow-y: scroll;
`;

const List = () => {
  const { table } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [filtered, setFiltered] = useState(table);
  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    setFiltered(table);

    if (name !== "") {
      const res = table.filter((item) => {
        if (item.currency.toLocaleLowerCase().startsWith(name)) {
          return item.currency.toLocaleLowerCase().startsWith(name);
        }
        if (item.code.toLocaleLowerCase().startsWith(name)) {
          return item.code.toLocaleLowerCase().startsWith(name);
        }
      });
      setFiltered(res);
    }
  }, [name, table]);

  return (
    <Container>
      <InputContainer>
        <Loop
          style={{
            cursor: "pointer",
            transform: "scale(0.7)",
            width: "20%",
            height: "30px",
          }}
        />
        <Input placeholder="Enter a currency" onChange={handleChange} />
      </InputContainer>
      <ItemsContainer>
        {filtered.map((e, i) => {
          return (
            <ListItem
              key={i}
              country={e.currency}
              code={e.code}
              flag={e.flagURL}
              price={e.price}
            />
          );
        })}
      </ItemsContainer>
    </Container>
  );
};

export default List;
