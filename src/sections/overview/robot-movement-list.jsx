/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import RunMovementFormDialog from './run-movement-form-dialog';
import ModifyFormDialog from './modify-form-dialog';
import { deletePosition, updatePosition } from '../../apis/apis';

const useDraggableInPortal = () => {
  const element = useRef(document.createElement('div')).current;

  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, [element]);

  return (render) => (provided, snapshot) => {
    const result = render(provided, snapshot);
    const style = provided.draggableProps.style;

    if (style && style.position === 'fixed') {
      return createPortal(result, element);
    }

    return result;
  };
};

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

const tableHeaderStyles = css`
  background-color: #f0f0f0;
  font-weight: bold;
`;

const tableStyles = css`
  min-width: 650px;
`;

const RobotMovementList = ({ showList, toggleList, onItemClick }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

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

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  const handleRobotMovementListButtonClick = () => {
    loadDataFromLocalStorage();
    toggleList();
  };

  const handleCopy = () => {
    console.log('Copy buton clicked');
  };

  const handleModify = () => {
    if (contextMenu && contextMenu.item) {
      setSelectedItem(contextMenu.item);
    }
    setContextMenu(null); // 메뉴 닫기
  };

  const handleSave = async (modifiedItem) => {
    const existingData = JSON.parse(localStorage.getItem('positions')) || [];

    const updatedData = existingData.map((item) => {
      if (item.name === modifiedItem.originalName) {
        return { ...modifiedItem, originalName: undefined };
      }
      return item;
    });

    localStorage.setItem('positions', JSON.stringify(updatedData));
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
    setContextMenu(null); // 메뉴 닫기
  };

  const deleteFromLocalStorage = (nameToDelete) => {
    const existingData = JSON.parse(localStorage.getItem('positions')) || [];
    const filteredData = existingData.filter(
      (item) => item.name !== nameToDelete
    );
    localStorage.setItem('positions', JSON.stringify(filteredData));
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

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside the list

    const reorderedData = Array.from(data);
    const [movedItem] = reorderedData.splice(source.index, 1);
    reorderedData.splice(destination.index, 0, movedItem);

    setData(reorderedData);

    localStorage.setItem('positions', JSON.stringify(reorderedData));
  };

  const renderDraggable = useDraggableInPortal();

  return (
    // <>
    //   <div
    //     className={`list-container ${showList ? 'show' : ''}`}
    //     css={listContainerStyles}
    //   >
    //     <TableContainer component={Paper}>
    //       <Table css={tableStyles} aria-label="robot movement table">
    //         <TableHead>
    //           <TableRow css={tableHeaderStyles}>
    //             <TableCell>Name</TableCell>
    //             <TableCell>X</TableCell>
    //             <TableCell>Y</TableCell>
    //             <TableCell>Z</TableCell>
    //             <TableCell>RX</TableCell>
    //             <TableCell>RY</TableCell>
    //             <TableCell>RZ</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {data.map((item, index) => (
    //             <TableRow
    //               key={index}
    //               hover
    //               onClick={() => handleItemClick(item.name)}
    //               onContextMenu={(event) => handleContextMenu(event, item)}
    //             >
    //               <TableCell>{item.name}</TableCell>
    //               <TableCell>{item.x}</TableCell>
    //               <TableCell>{item.y}</TableCell>
    //               <TableCell>{item.z}</TableCell>
    //               <TableCell>{item.rx}</TableCell>
    //               <TableCell>{item.ry}</TableCell>
    //               <TableCell>{item.rz}</TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //     <Box sx={{ mt: 2 }}>
    //       <RunMovementFormDialog />
    //     </Box>
    //     <Box sx={{ mt: 2 }}>
    //       <ModifyFormDialog
    //         open={Boolean(selectedItem)}
    //         item={selectedItem}
    //         onClose={() => setSelectedItem(null)}
    //         onSave={handleSave}
    //       />
    //     </Box>
    //   </div>
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     css={buttonStyles}
    //     onClick={handleRobotMovementListButtonClick}
    //   >
    //     Robot Movement List
    //   </Button>
    //   <Menu
    //     keepMounted
    //     open={contextMenu !== null}
    //     onClose={handleCloseContextMenu}
    //     anchorReference="anchorPosition"
    //     anchorPosition={
    //       contextMenu !== null
    //         ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
    //         : undefined
    //     }
    //   >
    //     <MenuItem onClick={handleCopy}>Copy</MenuItem>
    //     <MenuItem onClick={handleModify}>Modify</MenuItem>
    //     <MenuItem onClick={handleDelete}>Delete</MenuItem>
    //   </Menu>
    // </>
    <>
      <div
        className={`list-container ${showList ? 'show' : ''}`}
        css={listContainerStyles}
      >
        <TableContainer component={Paper}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Table
                  css={tableStyles}
                  aria-label="robot movement table"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
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
                      <Draggable
                        key={item.name}
                        draggableId={item.name}
                        index={index}
                      >
                        {renderDraggable((provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            hover
                            onClick={() => handleItemClick(item.name)}
                            onContextMenu={(event) =>
                              handleContextMenu(event, item)
                            }
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: snapshot.isDragging
                                ? '#e0e0e0'
                                : 'transparent',
                              opacity: snapshot.isDragging ? 0.8 : 1,
                              zIndex: snapshot.isDragging ? 999999 : 'auto',
                              transition: 'background-color 0.2s ease',
                            }}
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
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              )}
            </Droppable>
          </DragDropContext>
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
      <Button
        variant="contained"
        color="primary"
        css={buttonStyles}
        onClick={handleRobotMovementListButtonClick}
      >
        Robot Movement List
      </Button>
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
        <MenuItem onClick={handleCopy}>Copy</MenuItem>
        <MenuItem onClick={handleModify}>Modify</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default RobotMovementList;
