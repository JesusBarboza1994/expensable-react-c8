import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styled from "@emotion/styled";
import { colors, typography } from "../../styles";

const Option = styled.div`
  display: flex;
  justify-content: center;
  gap: 9.25px;
  border-bottom: 2px solid ${ ({type, label}) => type === label.toLocaleLowerCase() ? colors.pink[400] : colors.gray[500]};
  width: 101px;
  padding-bottom: 16px;
  ${typography.text.sm}
  font-weight: 500;
  color: ${ ({type, label}) => type === label.toLocaleLowerCase() ? colors.pink[400] : colors.gray[500]};
`;

function OptionType({type = "expense", label, onTypeClick}){
  return(
    <Option type={type} onClick={onTypeClick} label={label}>
      { label == "Expense" ? <AiOutlineMinusCircle/> : <AiOutlinePlusCircle/> }
      <p>{label}</p>
    </Option>
    
  )
}

export default OptionType;