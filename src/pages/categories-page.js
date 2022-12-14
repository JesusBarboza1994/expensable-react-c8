import styled from "@emotion/styled";
import { format, getMonth, getYear } from "date-fns";
import Categories from "../components/Categories/categories";
import MonthPicker from "../components/MonthPicker";
import { typography } from "../styles";
import { useParams, useSearchParams } from "react-router-dom";
import React from "react";
import { useSearchParamsWithLocal } from "../hooks";
import SelectedTypes from "../components/SelectedTypes/selected-types";

const Title = styled.h1`
  ${typography.head.sm}
  font-weight: 600;
`;

const initialValue = {
  year: getYear(new Date()),
  month: getMonth(new Date()),
};

function CategoriesPage() {
  let params = useParams();
  const [searchParams, setSearchParams] = useSearchParamsWithLocal(
    initialValue,
    "expensable_date"
  );

  let type = params.type || "expense";
  sessionStorage.setItem("type", type);

  const date = {
    year: +searchParams.get("year"),
    month: +searchParams.get("month"),
  };

  const handleRightClick = () => {
    const newMonth = date.month + 1;
    if (newMonth > 11) {
      setSearchParams({ year: date.year + 1, month: 0 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
    }
  };

  const handleLeftClick = () => {
    const newMonth = date.month - 1;
    if (newMonth < 0) {
      setSearchParams({ year: date.year - 1, month: 11 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
    }
  };

  const handleTypeClick = () => {
    // history.push('/income');
  }

  return (
    <div>
      <Title>Categories</Title>
      <SelectedTypes type={type} onTypeClick={handleTypeClick}/>
      <MonthPicker
        label={format(new Date(date.year, date.month), "MMMM yyyy")}
        onRightClick={handleRightClick}
        onLeftClick={handleLeftClick}
      />
      <Categories {...{ date, type }} />
    </div>
  );
}

export default CategoriesPage;
