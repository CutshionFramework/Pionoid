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

import RunMovementFormDialog from './run-movement-form-dialog';
import ModifyFormDialog from './modify-form-dialog';
import {
  deleteMove,
  updateMove,
  copyMove,
  getRobotMovements,
  updateMoveOrder,
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
      const response = await getRobotMovements();
      console.log(response);

      const formattedData = Object.keys(response).map((key) => {
        const item = response[key];
        return {
          id: key,
          move_name: item.move_name || 'N/A',
          x: item.x || 0,
          y: item.y || 0,
          z: item.z || 0,
          rx: item.RX || 0,
          ry: item.RY || 0,
          rz: item.RZ || 0,
        };
      });

      setData(formattedData);
      console.log('formattedData: ', formattedData);
    } catch (error) {
      console.error('Failed to load data from server:', error);
    }
  };

  const handleRobotMovementListButtonClick = () => {
    loadDataFromServer();
    toggleList();
  };

  const handleCopy = () => {
    if (contextMenu && contextMenu.item) {
      const originalName = contextMenu.item.move_name;
      const copiedItem = { ...contextMenu.item };
      copiedItem.move_name = `${copiedItem.move_name}_copy`;

      const updatedData = [...data, copiedItem];

      setData(updatedData);

      saveCopiedItemToServer(originalName);
    }

    setContextMenu(null);
  };

  const saveCopiedItemToServer = async (originalName) => {
    try {
      await copyMove(originalName);
      console.log('Copied item saved successfully');
    } catch (error) {
      console.error('Failed to save copied item to server:', error);
    }
  };
  const handleModify = () => {
    if (contextMenu && contextMenu.item) {
      setSelectedItem(contextMenu.item);
    }
    setContextMenu(null);
  };

  const handleSave = async (modifiedItem) => {
    const existingData = data;

    const updatedData = existingData.map((item) => {
      if (item.move_name === modifiedItem.originalName) {
        return { ...modifiedItem, originalName: undefined };
      }
      return item;
    });

    setData(updatedData);

    try {
      console.log('수정할 거 : ', modifiedItem.originalName, modifiedItem);
      await updateMove(modifiedItem.originalName, modifiedItem);
      console.log('Position updated successfully');
    } catch (error) {
      console.error('Failed to update position:', error);
    }
  };

  const handleDelete = () => {
    if (contextMenu && contextMenu.item) {
      const nameToDelete = contextMenu.item.move_name;
      const filteredData = data.filter(
        (item) => item.move_name !== nameToDelete
      );
      setData(filteredData);
      deleteFromServer(nameToDelete);
    }
    setContextMenu(null);
  };

  const deleteFromServer = async (nameToDelete) => {
    try {
      console.log(nameToDelete);
      const response = await deleteMove(nameToDelete);
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

    sendReorderedDataToServer(movedItem.move_name, dropIndex);

    setDraggedOverIndex(null);
  };

  const sendReorderedDataToServer = async (moveName, newIndex) => {
    try {
      await updateMoveOrder(moveName, newIndex);
      console.log(`Move name ${moveName} reordered to index ${newIndex}`);
    } catch (error) {
      console.error('Failed to update position order on server:', error);
    }
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
                  key={`${item.id}-${index}`}
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
                  <TableCell>{item.move_name}</TableCell>
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
          <RunMovementFormDialog />
        </Box>
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
