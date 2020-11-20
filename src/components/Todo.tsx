import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CheckBox } from "./CheckBox";

const Container = styled.div`
  max-width: 620px;
  margin: 0 auto;
  min-height: 100vh;
  font-family: Montserrat;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: Raleway;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  letter-spacing: -0.045em;
  color: #333333;
`;

const Tabs = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  margin-top: 60px;
`;

type TabLinkType = { active: boolean };

const TabLink = styled.button<TabLinkType>`
  width: 33.3333%;
  background: none;
  border: none;
  outline: none;
  font-family: Montserrat;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 15px;
  text-align: center;
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    background: ${(props: TabLinkType) =>
      props.active ? "#2f80ed" : "transparent"};
    border-radius: 4px 4px 0px 0px;
    height: 4px;
    width: 90px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ControlsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
`;

const Input = styled.input.attrs(() => ({ type: "text" }))`
  outline: none;
  border: 1px solid #bdbdbd;
  border-radius: 12px;
  flex: 1;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  padding: 20px 12px;
  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    color: #828282;
  }
  &:focus {
    border: 1px solid #2f80ed;
  }
`;

const AddButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-family: Montserrat;
  background: #2f80ed;
  box-shadow: 0px 2px 6px rgba(127, 177, 243, 0.4);
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  padding: 20px 40px;
  margin-left: 25px;
  cursor: pointer;
`;

const Task = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

type TaskTextType = {
  completed: boolean;
};
const TaskText = styled.span<TaskTextType>`
  font-weight: 500;
  font-size: 18px;
  text-decoration: ${(props: TaskTextType) =>
    props.completed ? "line-through" : "none"};
  color: ${(props: TaskTextType) => (props.completed ? "#333333" : "#000000")};
`;

const DeleteButton = styled.button.attrs(() => ({
  className: " material-icons",
  children: "delete_outlined",
}))`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: auto;
  font-size: 24px;
  color: #bdbdbd;
  transition: color 0.2s;
  &:hover {
    color: #333333;
  }
`;

const Footer = styled.footer`
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #a9a9a9;
  margin-top: auto;
  padding-top: 100px;
  padding-bottom: 20px;
`;

type TodoType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

type TodosType = TodoType[];

export const Todo: React.FC = (): React.ReactElement => {
  const [todos, setTodos] = useState<TodosType>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodosType>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  const onCheckBoxClicked = (todo: TodoType) => {
    setTodos((prev) => {
      return prev.map((item) =>
        todo.id === item.id ? { ...item, isCompleted: !item.isCompleted } : item
      );
    });
  };

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onAddBtnClicked = () => {
    if (inputValue) {
      setTodos((prev) => {
        return [
          ...prev,
          {
            id: Math.random().toString(16).slice(-6),
            name: inputValue,
            isCompleted: false,
          },
        ];
      });
      setInputValue("");
    }
  };

  const onTabClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFilter(e.currentTarget.value);
  };

  const onDeleteButtonClicked = (todo: TodoType) => {
    setTodos((prev) => prev.filter((item) => item.id !== todo.id));
  };

  useEffect(() => {
    let lsData = localStorage.getItem("todos");
    if (lsData === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(lsData));
    }
  }, []);

  useEffect(() => {
    const filterTasks = () => {
      switch (filter) {
        case "Active":
          setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
          break;
        case "Completed":
          setFilteredTodos(todos.filter((todo) => todo.isCompleted));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filterTasks();
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [filter, todos]);

  return (
    <Container>
      <Title>#todo</Title>
      <Tabs>
        <TabLink active={filter === "All"} onClick={onTabClicked} value="All">
          All
        </TabLink>
        <TabLink
          active={filter === "Active"}
          onClick={onTabClicked}
          value="Active"
        >
          Active
        </TabLink>
        <TabLink
          active={filter === "Completed"}
          onClick={onTabClicked}
          value="Completed"
        >
          Completed
        </TabLink>
      </Tabs>
      <ControlsWrapper>
        <Input
          placeholder="add details"
          value={inputValue}
          onChange={onInputChanged}
        />
        <AddButton onClick={onAddBtnClicked}>Add</AddButton>
      </ControlsWrapper>
      {filteredTodos.map((todo) => (
        <Task key={todo.id}>
          <CheckBox
            id={`cb-${todo.id}`}
            checked={todo.isCompleted}
            onChange={() => onCheckBoxClicked(todo)}
          />
          <TaskText completed={todo.isCompleted}>{todo.name}</TaskText>
          {filter === "Completed" ? (
            <DeleteButton onClick={() => onDeleteButtonClicked(todo)} />
          ) : null}
        </Task>
      ))}
      <Footer>mahtishavaev @ DevChallenges.io</Footer>
    </Container>
  );
};
