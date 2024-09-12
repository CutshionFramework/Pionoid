/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';

import ModifyFormDialog from './modify-form-dialog';
import {
  deletePosition,
  updatePosition,
  getRobotSessions,
} from '../../apis/apis';

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
    width: 900px;
    left: 57.5%;
  }

  @media (max-width: 1023px) {
    width: 800px;
    left: 51%;
  }

  @media (max-width: 767px) {
    left: 50%;
    width: 90%;
  }
`;

const buttonStyles = css`
  width: 200px;
  height: 100%;
  border: none;
  font-size: 18px;
  color: white;
  background-color: rgb(160, 186, 237);
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.03);
  transition: background-color 0.3s ease;
  animation: bounce 2s;

  &:hover {
    background-color: #f0f0f0;
    color: black;
    border: none;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-40px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

const tableHeaderStyles = css`
  background-color: #f0f0f0;
  font-weight: bold;
`;

const tableStyles = css`
  min-width: 650px;
`;

const hoveredStyle = css`
  background-color: #f5f5f5;
`;

const defaultStyle = css`
  background-color: transparent;
  cursor: grab;

  &:hover {
    background-color: #f0f0f0;
    border: none;
  }
`;

const RobotMovementList = ({ showList, toggleList }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  useEffect(() => {
    if (showList) {
      loadDataFromServer();
    }
  }, [showList]);

  useEffect(() => {
    if (contextMenu) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.querySelector('header').style.paddingRight =
        `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    };
  }, [contextMenu]);

  const loadDataFromServer = async () => {
    try {
      const response = await getRobotSessions();
      setData(response);
    } catch (error) {
      console.error('Failed to load data from server:', error);
    }
  };

  // const handleCopyPosition = async () => {
  //   try {
  //     const response = await copyPosition();
  //     console.log('Data copy to server:', response);
  //   } catch (error) {
  //     console.error('Failed to load data. : ', error);
  //   }
  // };

  // const handleItemClick = (item) => {
  //   onItemClick(item);
  // };

  const handleRobotMovementListButtonClick = () => {
    loadDataFromServer();
    toggleList();
  };

  const handleCopy = () => {
    if (contextMenu && contextMenu.item) {
      const copiedItem = { ...contextMenu.item };
      copiedItem.name = `${copiedItem.name}_copy`;

      const updatedData = [...data, copiedItem];
      setData(updatedData);
      // handleCopyPosition(updatedData);
      // localStorage.setItem('positions', JSON.stringify(updatedData));
    }
    setContextMenu(null);
  };

  const handleModify = () => {
    if (contextMenu && contextMenu.item) {
      setSelectedItem(contextMenu.item);
    }
    setContextMenu(null);
  };

  const handleSave = async (modifiedItem) => {
    // const existingData = JSON.parse(localStorage.getItem('positions')) || [];
    const existingData = data;

    const updatedData = existingData.map((item) => {
      if (item.name === modifiedItem.originalName) {
        return { ...modifiedItem, originalName: undefined };
      }
      return item;
    });

    // localStorage.setItem('positions', JSON.stringify(updatedData));
    setData(updatedData);

    try {
      await updatePosition(modifiedItem.originalName, modifiedItem);
      console.log('Position updated successfully');
    } catch (error) {
      console.error('Failed to update position:', error);
    }
  };

  const handleDelete = () => {
    if (contextMenu && contextMenu.item) {
      deleteFromLocalStorage(contextMenu.item.name);
      deleteFromServer(contextMenu.item.name);
    }
    setContextMenu(null);
  };

  const deleteFromLocalStorage = (nameToDelete) => {
    // const existingData = JSON.parse(localStorage.getItem('positions')) || [];
    const existingData = data;

    const filteredData = existingData.filter(
      (item) => item.name !== nameToDelete
    );
    // localStorage.setItem('positions', JSON.stringify(filteredData));
    setData(filteredData);
  };

  const deleteFromServer = async (nameToDelete) => {
    try {
      console.log(nameToDelete);
      const response = await deletePosition(nameToDelete);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete session from server:', error);
    }
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            item: item,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    setDraggedOverIndex(index);
  };

  const onDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('text/plain');
    if (dragIndex === undefined) return;

    const reorderedData = Array.from(data);
    const [movedItem] = reorderedData.splice(dragIndex, 1);
    reorderedData.splice(dropIndex, 0, movedItem);

    setData(reorderedData);
    // localStorage.setItem('positions', JSON.stringify(reorderedData));

    setDraggedOverIndex(null);
  };

  const { t } = useTranslation();
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.name}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={(e) => onDragOver(e, index)}
                  onDrop={(e) => onDrop(e, index)}
                  onContextMenu={(event) => handleContextMenu(event, item)}
                  css={[
                    defaultStyle,
                    draggedOverIndex === index && hoveredStyle,
                  ]}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.x}</TableCell>
                  <TableCell>{item.y}</TableCell>
                  <TableCell>{item.z}</TableCell>
                  <TableCell>{item.rx}</TableCell>
                  <TableCell>{item.ry}</TableCell>
                  <TableCell>{item.rz}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2 }}>
          <ModifyFormDialog
            open={Boolean(selectedItem)}
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onSave={handleSave}
          />
        </Box>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          css={buttonStyles}
          onClick={handleRobotMovementListButtonClick}
        ></Button>
        <Menu
          keepMounted
          open={contextMenu !== null}
          onClose={handleCloseContextMenu}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleCopy}>{t('copy')}</MenuItem>
          <MenuItem onClick={handleModify}>{t('modify')}</MenuItem>
          <MenuItem onClick={handleDelete}>{t('delete')}</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default RobotMovementList;
