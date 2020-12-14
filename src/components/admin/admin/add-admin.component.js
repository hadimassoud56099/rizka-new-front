import React, { Component } from "react";
import AuthService from "../../../services/auth.service";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../../../css-common"
import Alert from '@material-ui/lab/Alert';
class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveAdmin = this.saveAdmin.bind(this);
        this.newAdmin = this.newAdmin.bind(this);

        this.state = {
            id: null,
            username: "",
            password: "",
            email:"",
            published: false,
            message:"",

            submitted: false
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    saveAdmin() {
        var data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            published:1
        };

        AuthService.register(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    password: response.data.password,
                    published: response.data.published,
                    message: response.data.message,
                    submitted: true
                });
                this.props.history.push('/admins/')
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    message:"Duplicate username or email"
                
                });
            });
    }

    newAdmin() {
        this.setState({
            id: null,
            username: "",
            email:"",
            password: "",
            published: false,
            message:"",
            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <Alert severity="success">You submitted successfully!</Alert>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newAdmin}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                             {this.state.message ? (
                            <Alert severity="error">{this.state.message}</Alert>):('')}  
                            <div className={classes.textField}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    required
                                />
                            </div>
                            <div className={classes.textField}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveAdmin}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddAdmin)