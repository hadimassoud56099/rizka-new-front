import React, { Component } from "react";
import ProjectDataService from "../../../services/project.service";
import { Link } from "react-router-dom";

import { styles } from "../../../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.removeAllProjects = this.removeAllProjects.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      projects: [],
      currentProject: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveProjects() {
    ProjectDataService.getAll()
      .then(response => {
        this.setState({
          projects: response.data
        });

      

         })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProjects();
    this.setState({
      currentProject: null,
      currentIndex: -1
    });
  }

  setActiveProject(project, index) {
    this.setState({
      currentProject: project,
      currentIndex: index
    });
    
  }

  removeAllProjects() {
    ProjectDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    ProjectDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          projects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { searchTitle, projects, currentProject, currentIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
              label="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchTitle}>
              Search
            </Button>
          </Grid>
          <Grid item md={4}>
            <h2>Projects List</h2>

            <div className="list-group">
              {projects &&
                projects.map((project, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveProject(project, index)}
                    divider
                    button	
                    key={index}>
                    {project.title}
                  </ListItem>
                ))}
            </div>

            {/* <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllProjects}
            >
              Remove All
          </Button> */}
          </Grid>
          <Grid item md={8}>
              {currentProject ? (
              <div className={classes.project}>
                <h4>Project</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentProject.title}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Needed Budget:</strong>
                  </label>{" "}
                  {currentProject.amount}$
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Type of investment:</strong>
                  </label>{" "}
                  {currentProject.projectType.title}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Stage:</strong>
                  </label>{" "}
                  {currentProject.projectStage}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Land:</strong>
                  </label>{" "}
                  {currentProject.land.title}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentProject.description}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentProject.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/projects/" + currentProject.id}
                  className={classes.edit}
                >
                  Edit
              </Link>
              <Link
                  to={"/UploadFiles/" + currentProject.id}
                  className={classes.edit}
                >
                  Upload images
              </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.project}>Please click on a Project...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProjectsList)