import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Card,
  Box,
  Chip,
  Typography,
  ListItemButton,
  Grid,
  Avatar,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import FiberManualRecordTwoToneIcon from "@mui/icons-material/FiberManualRecordTwoTone";

const CustomTaskList = ({
  tasks,
  iconColor,
  onClick,
  listTitle,
  listSubtitle,
}) => {
  return (
    <div>
      <Box
        component={Paper}
        p={1}
        border={1}
        borderColor="#e0e0e0"
        backgroundColor="#eceff1"
        className="paper-container"
        elevation={5}
      >
        <List>
          <Typography variant="subtitle2" display="flex">
            <FiberManualRecordTwoToneIcon sx={{ color: iconColor }} />
            <Typography variant="subtitle2">
              {listTitle}{" "}
              <Avatar
                style={{
                  fontSize: "12px",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: grey[400],
                  height: "20px",
                  width: "20px",
                }}
              >
                {tasks.length}
              </Avatar>
            </Typography>
          </Typography>
          {tasks.length == 0 ? (
            <Typography variant="body2">{listSubtitle}</Typography>
          ) : null}
          {tasks.map((task) => (
            <Card
              className="task-card"
              elevation={6}
              style={{ borderRadius: "20px" }}
            >
              <ListItem key={task.id} className="task-list-container">
                <ListItemButton
                  onClick={() => onClick(task)}
                  className="list-item-button"
                >
                  <ListItemText
                    className="list-item-text"
                    primary={task.title}
                    secondary={
                      <React.Fragment>
                        <div>
                          <Typography
                            sx={{ display: "inline", paragraph: "true" }}
                            variant="body2"
                          >
                            {task.descp}
                          </Typography>
                        </div>

                        <Grid
                          container
                          spacing={1}
                          style={{ position: "absolute", bottom: "0px" }}
                        >
                          {task.assignees.map((assignee, index) => (
                            <Grid item key={index}>
                              <Chip
                                label={assignee}
                                size="small"
                                color="info"
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Card>
          ))}
        </List>
      </Box>
    </div>
  );
};
export default CustomTaskList;
