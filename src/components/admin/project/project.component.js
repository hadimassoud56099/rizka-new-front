import React, { Component } from "react";
import ProjectDataService from "../../../services/project.service";
import TypeProjectDataService from "../../../services/typeProject.service";

import { styles } from "../../../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


class Project extends Component {
    constructor(props) {
        super(props);
        this.props.history.push('/projects/'+ this.props.match.params.id)
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeProjectType = this.onChangeProjectType.bind(this);
        this.onChangeStage = this.onChangeStage.bind(this);

        this.getProject = this.getProject.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
      
        this.state = {
            currentProject: {
                id: null,
                title: "",
                description: "",
                published: false,
                amount:"",
                projectType:0,
                typeProjectSelect:[],
                projectStage:"",
                land:this.props.match.params.id,
                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
       
        this.getProject(this.props.match.params.id);
       this.retrieveTypeProjects();
    }
    
    
    // GET THE LIST OF PREDEFINED TYPES OF PROJECTS
    retrieveTypeProjects() {
        TypeProjectDataService.getAll()
          .then(response => {

            this.setState(function (prevState) {
                return {
                    currentProject: {
                        ...prevState.currentProject,
                        typeProjectSelect: response.data
                    }
                };
            });

               })
          .catch(e => {
            console.log(e);
          });
      }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentProject: {
                    ...prevState.currentProject,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                description: description
            }
        }));
    }

    onChangeAmount(e) {
        const amount = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                amount: amount
            }
        }));
    }

    onChangeProjectType(e) {
        const projectType = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                projectType: projectType
            }
        }));
    }

    onChangeStage(e) {
        const projectStage = e.target.value;

        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                projectStage: projectStage
            }
        }));
    }

  

    getProject(id) {
        ProjectDataService.get(id)
            .then(response => {
                this.setState({
                    currentProject: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
            this.retrieveTypeProjects();

    }

    updatePublished(status) {
        var data = {
            id: this.state.currentProject.id,
            published: status
        };

        ProjectDataService.update(this.state.currentProject.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentProject: {
                        ...prevState.currentProject,
                        published: status
                    }
                }));
                this.props.history.push('/projects/'+ this.state.currentProject.id)
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateProject() {
        ProjectDataService.update(
            this.state.currentProject.id,
            this.state.currentProject
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The project was updated successfully!"
                });
                this.props.history.push('/projects/'+ this.state.currentProject.id)
            })
            .catch(e => {
                console.log(e);
            });
    }
   

    deleteProject() {
        ProjectDataService.delete(this.state.currentProject.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/projects')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentProject } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentProject ? (
                    <div className={classes.form}>
                        <h2>Project</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    name="title"
                                    value={currentProject.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>
                            <div>
                            <TextareaAutosize 
                            name="description"
                            value={currentProject.description}
                            onChange={this.onChangeDescription}
                            required
                            aria-label="minimum height" 
                            rowsMin={7}
                            colsMin={30}
                            placeholder= "Description"/>

                            </div>
                            <div>
                            <TextField
                                label="Needed Budget ($)"
                                name="amount"
                                value={currentProject.amount}
                                onChange={this.onChangeAmount}
                                required
                            />
                            </div>
                            <div className={classes.textField}>
                            
                            <div className="list-group">
                            <label>
                                    <strong>Type of project*: </strong><br></br>
                                </label>
                            <FormControl className={classes.formControl}>
                              
                                <Select
                               
                                native
                                value={currentProject.projectType._id}
                                onChange={this.onChangeProjectType}
                                inputProps={{
                                    name: 'projectType',
                                    id: 'projectType-native-simple',
                                }}
                                >
                                   
                                 <option aria-label="None" value="" />
                                        {currentProject.typeProjectSelect &&
                                        (currentProject.typeProjectSelect).map((typeSelectvalues, index) => (
                                        <option value={typeSelectvalues.id}>{typeSelectvalues.title}</option>
                                        ))}
                        
                            
                                </Select>
                            </FormControl>
            </div>
            
            </div>
           
                            
                        <div className={classes.textField}>
                            
                            <div className="list-group">
                            <label>
                                    <strong>Stage*: </strong><br></br>
                                </label>
                            <FormControl className={classes.formControl}>
                               
                                <Select
                                native
                                value={currentProject.projectStage}
                                onChange={this.onChangeStage}
                                inputProps={{
                                    name: 'projectStage',
                                    id: 'projectStage-native-simple',
                                }}
                                >
                                    <option aria-label="None" value="" /> 
                                    <option value="On going">On going</option>
                                    <option value="Executing">Executing</option>
                                    <option value="Finished">Finished</option>
                        
                            
                                </Select>
                            </FormControl>
            </div>
            
            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status: </strong>
                                </label>
                                {currentProject.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            {currentProject.published ? (
                                <Button
                                    className={`${classes.publish} ${classes.button}`}
                                    onClick={() => this.updatePublished(false)}
                                >
                                    UnPublish
              </Button>
                            ) : (
                                    <Button
                                        className={`${classes.publish} ${classes.button}`}
                                        onClick={() => this.updatePublished(true)}
                                    >
                                        Publish
              </Button>
                                )}
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteProject}
                            >
                                Delete
            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateProject}
                            >
                                Update
            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Project...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Project)