import OptionType from "../OptionType/option-type";
import * as Styled from "./styles"
import React from 'react';
import { Link } from 'react-router-dom';

function SelectedTypes({type, onTypeClick}){
  return (
    <Styled.Wrapper>
      <Link to="/categories/expense" style={{textDecoration:"none" }}>

        <OptionType onTypeClick={onTypeClick} type={type} label="Expense"/>
      </Link >
      <Link to="/categories/income" style={{textDecoration:"none" }}>
        <OptionType type={type} label="Income"/>
      </Link>
    </Styled.Wrapper>
  )
}
export default SelectedTypes;