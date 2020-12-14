import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import Alert from '@material-ui/lab/Alert';

import { styles } from "../../../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.getAdmin = this.getAdmin.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateAdmin = this.updateAdmin.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);

        this.state = {
            currentAdmin: {
                id: null,
                username:"",
                email: "",
                password: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getAdmin(this.props.match.params.id);
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAdmin: {
                    ...prevState.currentAdmin,
                    email: email
                }
            };
        });
    }

    onChangePassword(e) {
        const password = e.target.value;

        this.setState(prevState => ({
            currentAdmin: {
                ...prevState.currentAdmin,
                password: password
            }
        }));
    }

    getAdmin(id) {
        AuthService.get(id)
            .then(response => {
                this.setState({
                    currentAdmin: response.data
                });
                console.log(response.data);
                
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentAdmin._id,
            username:this.state.currentAdmin.username,
            email: this.state.currentAdmin.email,
            password: this.state.currentAdmin.password,
            published: status
        };

        AuthService.update(this.state.currentAdmin._id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentAdmin: {
                        ...prevState.currentAdmin,
                        published: status
                    }
                }));
                this.props.history.push('/admins/'+ this.state.currentAdmin._id)
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAdmin() {
        AuthService.update(
            this.state.currentAdmin._id,
            this.state.currentAdmin
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The admin was updated successfully!"
                });
                this.props.history.push('/admins/'+ this.state.currentAdmin._id)
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteAdmin() {
        AuthService.delete(this.state.currentAdmin._id)
            .then(response => {
               // console.log(response.data);
                this.props.history.push('/admins/')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentAdmin } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentAdmin ? (
                    <div className={classes.form}>
                        <h2>Change info of {currentAdmin.username}</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Email"
                                    name="email"
                                    value={currentAdmin.email}
                                    onChange={this.onChangeEmail}
                                    required
                                />
                            </div>
                            <div>
                            <Alert severity="info" className={classes.alertMessage} >You can reset the password here:</Alert>
                                <TextField
                                    className={classes.textField}
                                    label="Type new password"
                                    name="password"
                                   
                                    onChange={this.onChangePassword}
                                   
                                   
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status: </strong>
                                </label>
                                {currentAdmin.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            {currentAdmin.published ? (
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
                                onClick={this.deleteAdmin}
                            >
                                Delete
            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateAdmin}
                            >
                                Update
            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Admin...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Admin)