import React, { Component } from "react";
import TypeProjectDataService from "../../../services/typeProject.service";
import { Link } from "react-router-dom";

import { styles } from "../../../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class TypeProjectsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTypeProjects = this.retrieveTypeProjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTypeProject = this.setActiveTypeProject.bind(this);
    this.removeAllTypeProjects = this.removeAllTypeProjects.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      typeProjects: [],
      currentTypeProject: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTypeProjects();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTypeProjects() {
    TypeProjectDataService.getAll()
      .then(response => {
        this.setState({
          typeProjects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTypeProjects();
    this.setState({
      currentTypeProject: null,
      currentIndex: -1
    });
  }

  setActiveTypeProject(typeProject, index) {
    this.setState({
      currentTypeProject: typeProject,
      currentIndex: index
    });
  }

  removeAllTypeProjects() {
    TypeProjectDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TypeProjectDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          typeProjects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { searchTitle, typeProjects, currentTypeProject, currentIndex } = this.state;

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
            <h2>TypeProjects List</h2>

            <div className="list-group">
              {typeProjects &&
                typeProjects.map((typeProject, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveTypeProject(typeProject, index)}
                    divider
                    button	
                    key={index}>
                    {typeProject.title}
                  </ListItem>
                ))}
            </div>

            <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllTypeProjects}
            >
              Remove All
          </Button>
          </Grid>
          <Grid item md={8}>
            {currentTypeProject ? (
              <div className={classes.typeProject}>
                <h4>TypeProject</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTypeProject.title}
                </div>
               
               

                <Link
                  to={"/typeProjects/" + currentTypeProject.id}
                  className={classes.edit}
                >
                  Edit
              </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.typeProject}>Please click on a TypeProject...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TypeProjectsList)