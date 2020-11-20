import React from "react";
import styled from "styled-components";

const HiddenCheckBox = styled.input.attrs(() => ({ type: "checkbox" }))`
  display: none;
`;

type LabelProps = {
  checked: boolean;
};

const Label = styled.label.attrs(() => ({
  className: "material-icons",
  children: "check",
}))<LabelProps>`
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

type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  id: string;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  id,
}: CheckBoxProps): React.ReactElement => (
  <>
    <Label htmlFor={id} checked={checked} />
    <HiddenCheckBox id={id} checked={checked} onChange={onChange} />
  </>
);
