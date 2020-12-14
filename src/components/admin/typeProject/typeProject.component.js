import React, { Component } from "react";
import TypeProjectDataService from "../../../services/typeProject.service";

import { styles } from "../../../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class TypeProject extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.getTypeProject = this.getTypeProject.bind(this);
        this.updateTypeProject = this.updateTypeProject.bind(this);
        this.deleteTypeProject = this.deleteTypeProject.bind(this);

        this.state = {
            currentTypeProject: {
                id: null,
                title: "",
               hasProject:false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTypeProject(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTypeProject: {
                    ...prevState.currentTypeProject,
                    title: title
                }
            };
        });
    }

    

    getTypeProject(id) {
        TypeProjectDataService.get(id)
            .then(response => {
                this.setState({
                    currentTypeProject: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            }); 
        
        
    }

    
    updateTypeProject() {
        TypeProjectDataService.update(
            this.state.currentTypeProject.id,
            this.state.currentTypeProject
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The type of investment was updated successfully!"
                });
                this.props.history.push('/typeProjects/'+this.state.currentTypeProject.id)
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteTypeProject() {
        TypeProjectDataService.delete(this.state.currentTypeProject.id)
            .then(response => {
              //  console.log(response.data);
                this.props.history.push('/typeProjects')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentTypeProject } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentTypeProject ? (
                    <div className={classes.form}>
                        <h2>TypeProject</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    name="title"
                                    value={currentTypeProject.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>
                          

                          
                        </form>
                        <div className={classes.buttonWrapper}>
                            {/* delete button appears only if the current type investment doesn't have projects */}
                            {currentTypeProject.hasprojects ? '' : (
                                <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteTypeProject}
                            >
                                Delete
            </Button>
                                )}
                           

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateTypeProject}
                            >
                                Update
            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a TypeProject...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(TypeProject)