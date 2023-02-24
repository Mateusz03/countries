import styled from "styled-components";
import { ReactComponent as Arrow } from "../svg/inputArrow.svg";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../App";

import List from "./list";

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`;
const Flag = styled.img`
  user-select: none;
  padding: none;
  width: 2.5rem;
  margin-left: 32px;
  border: 1px solid #181823;
  border-radius: 5px;
`;
const Inp = styled.input`
  width: 10rem;
  font-family: "Poppins", sans-serif;
  font-size: 1.25rem;
  font-weight: bold;
  height: 100%;
  outline: none;
  border: none;
  box-sizing: border-box;
  padding: 0px 32px 0px 16px;
`;
const Code = styled.div`
  width: 5rem;
  font-family: "Poppins", sans-serif;
  height: 100%;
  background-color: #537fe7;
  border-radius: 0px 5px 5px 0px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
`;

const Title = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 600;
`;

const Display = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  box-shadow: 0 2px 6px 0 #181823;
  border-radius: 5px;
`;

const Input = (props) => {
  const { selectedRates, click, setClick, inputValue, setInputValue } =
    useContext(GlobalContext);
  const boxRef = useRef();

  const handleChange = (event) => {
    if (props.title === "You send") {
      setInputValue([
        { message: event.target.value },
        {
          message: typeof inputValue[1] !== "undefined" ? "" : "",
        },
      ]);
    } else {
      setInputValue([
        {
          message: typeof inputValue[0] !== "undefined" ? "" : "",
        },
        {
          message: event.target.value,
        },
      ]);
    }
  };
  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(boxRef.current) &&
        event.target !== boxRef.current
      ) {
        setClick(0);
      }
    };
  }, [setClick]);

  return (
    <Container>
      <Title
        onclick={() => {
          setClick(0);
        }}
      >
        {props.title}
      </Title>
      <Display>
        <Flag
          onClick={() => {
            setClick(0);
          }}
          crossOrigin={"anonymous"}
          src={
            typeof selectedRates !== "undefined"
              ? props.title === "You send"
                ? selectedRates.currency[0].flagURL
                : selectedRates.currency[1].flagURL
              : ""
          }
        />
        <Inp
          type={props.type}
          placeholder={props.placeholder}
          value={
            props.title === "You send"
              ? inputValue[0].message
              : inputValue[1].message
          }
          onChange={handleChange}
          onClick={() => {
            setClick(0);
          }}
        />
        <Code
          ref={boxRef}
          onClick={() => {
            if (props.title === "You send") setClick(1);
            else setClick(2);
          }}
        >
          {typeof selectedRates !== "undefined"
            ? props.title === "You send"
              ? selectedRates.currency[0].code
              : selectedRates.currency[1].code
            : ""}
          <Arrow style={{ transform: "scale(0.7)" }} />
        </Code>
      </Display>
      {props.title === "You send" ? (
        click === 1 ? (
          <List />
        ) : (
          ""
        )
      ) : click === 2 ? (
        <List />
      ) : (
        ""
      )}
    </Container>
  );
};

export default Input;
