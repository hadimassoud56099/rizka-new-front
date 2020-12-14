import React, { Component } from "react";
import TypeProjectDataService from "../../../services/typeProject.service";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../../../css-common"

class AddTypeProject extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.saveTypeProject = this.saveTypeProject.bind(this);
        this.newTypeProject = this.newTypeProject.bind(this);

        this.state = {    
            id: null,
            title: "",
            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    saveTypeProject() {
        var data = {
            title: this.state.title
        };

        TypeProjectDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTypeProject() {
        this.setState({
            id: null,
            title: "",
            

            submitted: false
        });
    }

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
                            onClick={this.newTypeProject}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>

            
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveTypeProject}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddTypeProject)