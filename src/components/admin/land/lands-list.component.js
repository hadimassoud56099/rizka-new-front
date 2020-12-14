import React, { Component } from "react";
import LandDataService from "../../../services/land.service";
import ProjectDataService from "../../../services/project.service";

import { Link } from "react-router-dom";

import { styles } from "../../../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class LandsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveLands = this.retrieveLands.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLand = this.setActiveLand.bind(this);
    this.removeAllLands = this.removeAllLands.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      lands: [],
      currentLand: null,
      currentIndex: -1,
      searchTitle: "",
      projectAdded:[]
    };
  }

  componentDidMount() {
    this.retrieveLands();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveLands() {
    LandDataService.getAll()
      .then(response => {
        this.setState({
          lands: response.data
        });
       
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveLands();
    this.setState({
      currentLand: null,
      currentIndex: -1,
      projectAdded:[]
    });
  }

  setActiveLand(land, index) {
    
    this.setState({
      currentLand: land,
      currentIndex: index,
      projectAdded:[]
    })

    // check if the crrentland has projects 
    // cz we can't add more than one project to a land
    ProjectDataService.findByLand(land.id)
      .then(response => {
      
        response.data.map((data, key) => {
          this.setState({
            projectAdded: data.id
           
          })
        })
       })
      .catch(e => {
        console.log(e);
      });
   
  }

  removeAllLands() {
    LandDataService.deleteAll()
      .then(response => {
 //       console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    LandDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          lands: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

 

  render() {
    const { classes } = this.props
    const { searchTitle, lands, currentLand, currentIndex,projectAdded } = this.state;

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
            <h2>Lands List</h2>

            <div className="list-group">
              {lands &&
                lands.map((land, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveLand(land, index)}
                    divider
                    button	
                    key={index}>
                    {land.title}
                  </ListItem>
                ))}
            </div>

            {/* <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllLands}
            >
              Remove All
          </Button> */}
          </Grid>
          <Grid item md={8}>
            {currentLand ? (
              <div className={classes.land}>
                <h4>Land</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentLand.title}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentLand.description}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentLand.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/lands/" + currentLand.id}
                  className={classes.edit}
                >
                  Edit
              </Link>
              
              
              {projectAdded.length >0 ?(
               <Link
               to={"/projects/" + projectAdded}
               className={classes.view}
             >
               View Project
           </Link>
              ):(
                <Link
                to={"/addproject/" + currentLand.id}
                className={classes.add}
              >
                Add to project
            </Link>  
              
              )
  }
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.land}>Please click on a Land...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LandsList)