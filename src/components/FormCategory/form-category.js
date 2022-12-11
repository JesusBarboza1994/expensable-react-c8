import styled from "@emotion/styled";
import { colors, typography } from "../../styles";
import { BsFillCartFill } from "react-icons/bs";
import { RiBankFill, RiBillFill } from "react-icons/ri";
import { GiHealthNormal } from "react-icons/gi";
import { FaGraduationCap, FaGamepad } from "react-icons/fa";
import { AiFillCar, AiFillGift } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import apiFetch from "../../services/api-fetch";
const categoryColors = {
  red: colors.red[500],
  orange: colors.orange[500],
  yellow: colors.yellow[500],
  green: colors.green[500],
  teal: colors.teal[500],
  cyan: colors.cyan[500],
  "light-blue": colors.lightBlue[500],
  blue: colors.blue[500],
};

const categoryIcons = {
  bank: RiBankFill,
  cart: BsFillCartFill,
  health: GiHealthNormal,
  game: FaGamepad,
  bill: RiBillFill,
  education: FaGraduationCap,
  car: AiFillCar,
  gift: AiFillGift,
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap:1rem;
  background-color: ${colors.white};
  padding: 1rem;
  border-radius: 0.5rem;
`;

const ColorIconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 40px);
  grid-gap: 20px;
  grid-auto-rows: repeat(2, 1fr);
`;

const IconInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.white};
  cursor: pointer;
  &:hover {
    background-color: ${colors.gray[400]};
  }
`;

const PartContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap: 0.25rem;
`;

const ContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LabelTitle = styled.p`
  ${typography.head.sm}
  font-weight: 600;
`;

const LabelSubtitle = styled.p`
  ${typography.text.xs}}
  margin-bottom: 0.25rem;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background: #DB2777;
  border-radius: 8px;
  color: ${colors.white};
  border:none;

`;
const ColorInput = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({color}) => categoryColors[color]};
  cursor: pointer;
  &:hover {
    outline: 2px solid ${({color}) => categoryColors[color]};
    outline-offset: 2px;
  }

`;

function FormCategory({onClickCloseModal, onSubmit}){
  const [isColor, setIsColor] = useState(null);
  const [isIcon, setIsIcon] = useState(null);
  const [data, setData] = useState({
    name:"",
    color: "",
    transaction_type: sessionStorage.getItem("type")
  });

  function HandleData(event){
    setData({...data, 
      [event.target.name] : event.target.value})
  }

  function handleClickColor(event){
    setData({...data, 
      color : event.target.id})
    setIsColor(event.target.id);
  }

  function handleClickIcon(event){
    setData({...data,
      icon: Object.keys(categoryIcons)[+event.target.id]})
    setIsIcon(+event.target.id);
    console.log(isIcon)
    console.log(+event.target.id)
  }

  return(
      <FormContainer onSubmit={(e)=>onSubmit(data,e)}>
        <ContainerTitle>
          <LabelTitle>New Category</LabelTitle>
            <AiOutlineClose style={{
            cursor: "pointer",
            height: "24px",
            width: "24px",
          }}
          onClick={onClickCloseModal} />
        </ContainerTitle>
        <PartContainer>
          <LabelSubtitle htmlFor="name">NAME</LabelSubtitle>
          <input type="text" id="name" name="name" onChange={HandleData}/>
        </PartContainer>
        <PartContainer>
          <LabelSubtitle>COLOR</LabelSubtitle>
          <ColorIconContainer>
            {Object.keys(categoryColors).map((color, index) => {
            return <ColorInput style={{outline: isColor === color ? (`2px solid ${categoryColors[color]}`) : "",
            outlineOffset: isColor === color ? "2px" : ""}}
            key={index} 
            id={color} 
            color={color} 
            onClick={handleClickColor}> 
            </ColorInput>
            })}
          </ColorIconContainer>
        </PartContainer>
        <PartContainer>
          <LabelSubtitle>ICON</LabelSubtitle>
          <ColorIconContainer>
            {Object.values(categoryIcons).map((Icon, index) => {

            return(
              <IconInput style={{backgroundColor: isIcon === index ? `${colors.gray[400]}` : ""}} onClick={handleClickIcon} id={index}>
                <Icon />
              </IconInput>            
            )
            })}
          </ColorIconContainer>
        </PartContainer>
        <Button type="submit" >Create</Button>
      </FormContainer>

  )
}

export default FormCategory;