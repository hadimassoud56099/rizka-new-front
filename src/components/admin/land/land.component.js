import React, { Component } from "react";
import LandDataService from "../../../services/land.service";

import { styles } from "../../../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Land extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getLand = this.getLand.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateLand = this.updateLand.bind(this);
        this.deleteLand = this.deleteLand.bind(this);

        this.state = {
            currentLand: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getLand(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLand: {
                    ...prevState.currentLand,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentLand: {
                ...prevState.currentLand,
                description: description
            }
        }));
    }

    getLand(id) {
        LandDataService.get(id)
            .then(response => {
                this.setState({
                    currentLand: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentLand.id,
            title: this.state.currentLand.title,
            description: this.state.currentLand.description,
            published: status
        };

        LandDataService.update(this.state.currentLand.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentLand: {
                        ...prevState.currentLand,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateLand() {
        LandDataService.update(
            this.state.currentLand.id,
            this.state.currentLand
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The land was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteLand() {
        LandDataService.delete(this.state.currentLand.id)
            .then(response => {
                //console.log(response.data);
                this.props.history.push('/lands')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentLand } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentLand ? (
                    <div className={classes.form}>
                        <h2>Land</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Title"
                                    name="title"
                                    value={currentLand.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Description"
                                    name="description"
                                    value={currentLand.description}
                                    onChange={this.onChangeDescription}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status: </strong>
                                </label>
                                {currentLand.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            {currentLand.published ? (
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
                            {/* <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteLand}
                            >
                                Delete
            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateLand}
                            >
                                Update
            </Button> */}
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Land...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(Land)