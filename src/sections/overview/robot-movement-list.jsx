/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import FormDialog from './app-form-dialogs';
import { deletePosition } from '../../apis/apis';

// 리스트 컨테이너 스타일
const listContainerStyles = css`
  position: fixed;
  bottom: 50px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.04);
  background-color: white;
  border-radius: 4px;
  color: #919eab;
  max-height: 50%;
  overflow-y: auto;
  transform: translateX(-50%);
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  opacity: 0;
  visibility: hidden;

  &.show {
    transform: translateX(-50%) translateY(0%);
    opacity: 1;
    visibility: visible;
  }

  @media (min-width: 1024px) {
    width: 700px;
    left: 57.5%;
  }

  @media (max-width: 1023px) {
    width: 700px;
    left: 51%;
  }

  @media (max-width: 767px) {
    left: 50%;
    width: 90%;
  }
`;

// 버튼 스타일
const buttonStyles = css`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 18px;
  color: #919eab;
  background-color: white;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.03);

  &:hover {
    background-color: #f0f0f0;
    border: none;
  }
`;

// 테이블 헤더 스타일
const tableHeaderStyles = css`
  background-color: #f0f0f0;
  font-weight: bold;
`;

// 테이블 스타일
const tableStyles = css`
  min-width: 650px;
`;

const RobotMovementMenuList = ({ showList, toggleList, onItemClick }) => {
  const [data, setData] = useState([]);

  // 로컬스토리지에서 데이터를 읽어오는 함수
  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('positions');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    if (showList) {
      loadDataFromLocalStorage();
    }
  }, [showList]);

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  const handleButtonClick = () => {
    loadDataFromLocalStorage();
    toggleList();
  };

  // 로컬스토리지에서 데이터를 삭제하는 함수
  const deleteFromLocalStorage = (nameToDelete) => {
    const existingData = JSON.parse(localStorage.getItem('positions')) || [];
    const filteredData = existingData.filter(
      (item) => item.name !== nameToDelete
    );
    localStorage.setItem('positions', JSON.stringify(filteredData));
    setData(filteredData);
  };

  // 서버에서 세션을 삭제하는 함수
  const deleteFromServer = async (nameToDelete) => {
    try {
      console.log(nameToDelete);
      const response = await deletePosition(nameToDelete);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete session from server:', error);
    }
  };

  const handleDelete = (name) => {
    deleteFromLocalStorage(name);
    deleteFromServer(name);
  };

  return (
    <>
      <div
        className={`list-container ${showList ? 'show' : ''}`}
        css={listContainerStyles}
      >
        <TableContainer component={Paper}>
          <Table css={tableStyles} aria-label="robot movement table">
            <TableHead>
              <TableRow css={tableHeaderStyles}>
                <TableCell>Name</TableCell>
                <TableCell>X</TableCell>
                <TableCell>Y</TableCell>
                <TableCell>Z</TableCell>
                <TableCell>RX</TableCell>
                <TableCell>RY</TableCell>
                <TableCell>RZ</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleItemClick(item.name)}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.x}</TableCell>
                  <TableCell>{item.y}</TableCell>
                  <TableCell>{item.z}</TableCell>
                  <TableCell>{item.rx}</TableCell>
                  <TableCell>{item.ry}</TableCell>
                  <TableCell>{item.rz}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(item.name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2 }}>
          <FormDialog />
        </Box>
      </div>
      <Button
        variant="contained"
        color="primary"
        css={buttonStyles}
        onClick={handleButtonClick}
      >
        Robot Movement List
      </Button>
    </>
  );
};

export default RobotMovementMenuList;
