import React, { useState } from "react";
import { Stack, IconButton, styled, Grid, Chip } from "@mui/material";

import { green, purple, orange, grey } from "@mui/material/colors";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import CloseIcon from "@mui/icons-material/Close";
import CustomTaskList from "./CustomTaskList";
import { TaskDetailsPopUp } from "./TaskDetailsPopUp";

export const TaskList = ({ tasks, updatedTask, addTask }) => {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  //handle functions for dialog

  const handleEditTaskOpen = (task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
    setIsEditMode(true);
  };
  const handleAddTaskOpen = () => {
    setIsDialogOpen(true);
    setIsEditMode(false);
    setTaskToEdit(null);
  };
  const handleClickOpen = (task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
    setIsEditMode(false);
    console.log(task);
  };
  const handleClickClose = () => {
    setTaskToEdit(null);
    setIsDialogOpen(false);
  };

  //Filtered Status
  const unStartedTasks = tasks.filter((task) => task.status === "ToDo's");
  const inProgessTasks = tasks.filter((task) => task.status === "InProgress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div>
      <Grid container spacing={2} className="grid-container">
        <Grid item>
          <IconButton aria-label="addNewTask" className="add-task-button">
            <Chip
              icon={
                <AddTaskRoundedIcon
                  color="success"
                  onClick={handleAddTaskOpen}
                />
              }
              label="Add New Task"
            />
          </IconButton>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 3 }}
        useFlexGap
        className="task-list-container"
      >
        <CustomTaskList
          tasks={unStartedTasks}
          iconColor={green[500]}
          onClick={handleEditTaskOpen}
          listTitle={"ToDo's"}
          listSubtitle={"  This item hasn't been started"}
        />
        <CustomTaskList
          tasks={inProgessTasks}
          iconColor={orange[500]}
          onClick={handleEditTaskOpen}
          listTitle={"InProgress"}
          listSubtitle={"    This is actively being worked on"}
        />
        <CustomTaskList
          tasks={completedTasks}
          iconColor={purple[500]}
          onClick={handleEditTaskOpen}
          listTitle={"Completed"}
          listSubtitle={"    This has been completed"}
        />
      </Stack>

      <div>
        {/* <CustomDialog open={isDialogOpen} onClose={handleClickClose}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {taskToEdit ? taskToEdit.title : ""}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                //onClick={handleClickClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            <ListItemButton>
              <ListItemText
                primary={taskToEdit ? taskToEdit.status : ""}
                secondary={taskToEdit ? taskToEdit.descp : ""}
              />
            </ListItemButton>
          </List>
          {/* <DialogContent dividers>
            <Typography gutterBottom>
              {selectedListItem ? selectedListItem.descp : ""}
            </Typography>
            <Typography>
              {selectedListItem ? selectedListItem.status : ""}
            </Typography>
          </DialogContent> */}
        {/* <DialogActions>
            <Button onClick={handleClickClose} autoFocus>
              Save Changes
            </Button>
          </DialogActions>
        </CustomDialog> */}
      </div>
      <div>
        <TaskDetailsPopUp
          isOpen={isDialogOpen}
          onClose={handleClickClose}
          isEditMode={isEditMode}
          taskToEdit={taskToEdit}
          addTask={addTask}
          onEditTaskSubmit={updatedTask}
        />
      </div>
    </div>
  );
};
