import React, { Component } from "react";
import ProjectDataService from "../../../services/project.service";
import TypeProjectDataService from "../../../services/typeProject.service";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { TextField, withStyles } from "@material-ui/core"
import { styles } from "../../../css-common"

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeProjectType = this.onChangeProjectType.bind(this);
        this.onChangeStage = this.onChangeStage.bind(this);
        
        this.saveProject = this.saveProject.bind(this);
       // this.newProject = this.newProject.bind(this);

      

        this.state = {
            id: null,
            title: "",
            description: "",
            amount:"",
            published: false,
            projectType:0,
            typeProjectSelect:[],
            projectStage:"",
            land:this.props.match.params.id,
            submitted: false
        };
    }
    componentDidMount() {
        this.retrieveTypeProjects();
      }
    
      retrieveTypeProjects() {
        TypeProjectDataService.getAll()
          .then(response => {

            this.setState({typeProjectSelect: response.data});
               })
          .catch(e => {
            console.log(e);
          });
      }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }
    onChangeProjectType(e) {
        this.setState({
            projectType: e.target.value
        });
    }
    onChangeStage(e) {
        this.setState({
            projectStage: e.target.value
        });
    }
    saveProject() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            amount:this.state.amount,
            projectType:this.state.projectType,
            projectStage:this.state.projectStage,
            land:this.state.land,
            published:1
        };

        ProjectDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    amount: response.data.amount,
                    published: response.data.published,
                    projectType: response.data.projectType,
                    projectStage: response.data.projectStage,
                    land:this.state.land,
                    submitted: true
                });
                //console.log(response.data);
                this.props.history.push('/projects')
            })
            .catch(e => {
                console.log(e);
            });
    }

    // newProject() {
    //     this.setState({
    //         id: null,
    //         title: "",
    //         description: "",
    //         amount:0,
    //         published: false,
    //         projectType:0,
    //         projectStage:"",
    //         land:"",
    //         submitted: false
    //     });
    // }

    render() {
        const { classes } = this.props
     
        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newProject}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                            <TextareaAutosize 
                            label="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            required
                            aria-label="minimum height" 
                            rowsMin={7}
                            colsMin={30} />
                               
                            </div> 
                            <div className={classes.textField}>
                                <TextField
                                    label="Needed Budget ($)"
                                    name="amount"
                                    value={this.state.amount}
                                    onChange={this.onChangeAmount}
                                    required
                                />
                            </div>
                            <div className={classes.textField}>
                            
                            <div className="list-group">
                           
                            <FormControl className={classes.formControl}>
                            <label>
                                    <strong>Type of Project*: </strong><br></br>
                                </label>
                                    <Select
                                native
                                value={this.state.projectType}
                                onChange={this.onChangeProjectType}
                                inputProps={{
                                    name: 'projectType',
                                    id: 'typeProject-native-simple',
                                }}
                                >
                                    <option aria-label="None" value="" /> 
                                
                                        {this.state.typeProjectSelect &&
                                        (this.state.typeProjectSelect).map((typeSelectvalues, index) => (
                                        <option value={typeSelectvalues.id}>{typeSelectvalues.title}</option>
                                        ))}
                        
                            
                                </Select>
                            </FormControl>
            
            </div>
            </div>
            <div className={classes.textField}>
                            
                            <div className="list-group">
                           
                            <FormControl className={classes.formControl}>
                            <label>
                                    <strong>Stage*: </strong><br></br>
                                </label>
                                 <Select
                                native
                                value={this.state.projectStage}
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
                        
                      
                          
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveProject}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddProject)