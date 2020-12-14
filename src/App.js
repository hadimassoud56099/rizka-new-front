import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/admin/login.component";
import BoardAdmin from "./components/admin/board-admin.component";
//import UploadFiles from "./components/admin/project/upload-files.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    console.log("logout");
    this.setState({
      currentUser: undefined,
      showAdminBoard: false
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        {/* <UploadFiles/> */}
       
       
       {showAdminBoard && (
             <BoardAdmin logout ={this.logOut}/>
            )}
            {!currentUser && (
             <Login/>
            )}

<Route exact path="/login" component={Login} />
         
        </div>
       
    );
    
  }
}

export default App;
