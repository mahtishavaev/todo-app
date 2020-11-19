import React from "react";
import styled from "styled-components";

const HiddenCheckBox = styled.input.attrs(() => ({ type: "checkbox" }))`
  display: none;
`;

const Label = styled.label.attrs(() => ({
  className: "material-icons",
  children: "check",
}))`
  width: 24px;
  height: 24px;
  font-size: 22px;
  margin-right: 10px;
  color: #fff;
  border: ${(props) =>
    props.checked ? "1px solid transparent" : "1px solid #828282"};
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? "#2F80ED" : "#fff")};
`;

export const CheckBox = ({ checked, onChange, id }) => (
  <>
    <Label htmlFor={id} checked={checked} />
    <HiddenCheckBox id={id} checked={checked} onChange={onChange} />
  </>
);
