import React, { Component } from "react";
import AuthService from "../../../services/auth.service";

import { Link } from "react-router-dom";

import { styles } from "../../../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class AdminsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAdmins = this.retrieveAdmins.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAdmin = this.setActiveAdmin.bind(this);
    this.removeAllAdmins = this.removeAllAdmins.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      admins: [],
      currentAdmin: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveAdmins();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveAdmins() {
    AuthService.getAll()
      .then(response => {
        this.setState({
          admins: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAdmins();
    this.setState({
      currentAdmin: null,
      currentIndex: -1
    });
  }

  setActiveAdmin(admin, index) {
    this.setState({
      currentAdmin: admin,
      currentIndex: index
    });
  }

  removeAllAdmins() {
    AuthService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    AuthService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          admins: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props
    const { searchTitle, admins, currentAdmin, currentIndex } = this.state;

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
            <h2>Admins List</h2>

            <div className="list-group">
              {admins &&
                admins.map((admin, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveAdmin(admin, index)}
                    divider
                    button	
                    key={index}>
                    {admin.username}
                  </ListItem>
                ))}
            </div>

            {/* <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllAdmins}
            >
              Remove All
          </Button> */}
          </Grid>
          <Grid item md={8}>
            {currentAdmin ? (
              <div className={classes.admin}>
                <h4>Admin</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Username:</strong>
                  </label>{" "}
                  {currentAdmin.username}
                </div>
               
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentAdmin.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/admins/" + currentAdmin._id}
                  className={classes.edit}
                >
                  Edit
              </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.admin}>Please click on a Admin...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AdminsList)