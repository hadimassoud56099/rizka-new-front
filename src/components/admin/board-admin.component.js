import React from "react";
        import { Switch, Route, Link } from "react-router-dom";
        import AppBar from '@material-ui/core/AppBar';
        import CssBaseline from '@material-ui/core/CssBaseline';
        import Divider from '@material-ui/core/Divider';
        import Drawer from '@material-ui/core/Drawer';
        import Hidden from '@material-ui/core/Hidden';
        import IconButton from '@material-ui/core/IconButton';
        // import InboxIcon from '@material-ui/icons/MoveToInbox';
        import List from '@material-ui/core/List';
        import ListItem from '@material-ui/core/ListItem';
        // import ListItemIcon from '@material-ui/core/ListItemIcon';
        // import ListItemText from '@material-ui/core/ListItemText';
        // import MailIcon from '@material-ui/icons/Mail';
        import MenuIcon from '@material-ui/icons/Menu';
        import Toolbar from '@material-ui/core/Toolbar';
        import Typography from '@material-ui/core/Typography';
        import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
        
      //  import AuthService from "../../services/auth.service";
        
                  
        // Tutorial COMPONENTS
        // import AddTutorial from "../add-tutorial.component";
        // import Tutorial from "../tutorial.component";
        // import TutorialsList from "../tutorials-list.component";
        
        // investment types components
        import AddTypeProject from "./typeProject/add-typeProject.component";
        import TypeProject from "./typeProject/typeProject.component";
        import TypeProjectsList from "./typeProject/typeProjects-list.component";
        
        // project components
        import AddProject from "./project/add-project.component";
        import ProjectsList from "./project/projects-list.component";
        import UploadFiles from "./project/upload-files.component";
        import Project from "./project/project.component";

        // Land COMPONENTS
        import AddLand from "./land/add-land.component";
        import Land from "./land/land.component";
        import LandsList from "./land/lands-list.component";

        
        // Admins components
        import AddAdmin from "./admin/add-admin.component";
        import Admin from "./admin/admin.component";
        import AdminsList from "./admin/admins-list.component";

        const drawerWidth = 240;
        
        const useStyles = makeStyles((theme: Theme) =>
          createStyles({
            root: {
              display: 'flex',
            },
            drawer: {
              [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
              },
            },
            appBar: {
              [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
              },
            },
            menuButton: {
              marginRight: theme.spacing(2),
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            },
            // necessary for content to be below app bar
            toolbar: theme.mixins.toolbar,
            drawerPaper: {
              width: drawerWidth,
            },
            content: {
              flexGrow: 1,
              padding: theme.spacing(3),
            },
          }),
        );
        
        interface Props {
          /**
           * Injected by the documentation to work in an iframe.
           * You won't need it on your project.
           */
          window?: () => Window;
        }
        
        export default function BoardAdmin(props: Props) {
          const { window } = props;
          const classes = useStyles();
          const theme = useTheme();
          const [mobileOpen, setMobileOpen] = React.useState(false);
        
          const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen);
          };
        
        
        
          const drawer = (
            <div>
              <div className={classes.toolbar} />
              <Divider />
              <List>
              {/* <ListItem button component={Link} to="/tutorials"><Typography>Tutorial</Typography></ListItem>
              <Divider />
              <ListItem button component={Link} to="/add"><Typography>Add</Typography></ListItem>
              <Divider /> */}
                <ListItem button component={Link} to="/lands"><Typography>Lands</Typography></ListItem>
                {/* <ListItem button component={Link} to="/addLand"><Typography>Add land</Typography></ListItem> */}

              <Divider />
              <ListItem button component={Link} to="/projects"><Typography>List of projects</Typography></ListItem>
                <Divider />
              <ListItem button component={Link} to="/typeProjects"><Typography>List type of projects</Typography></ListItem>
              <ListItem button component={Link} to="/addtypeProject"><Typography>Add type of project</Typography></ListItem>
         
              <Divider />

              
                <Divider />
              <ListItem button component={Link} to="/admins"><Typography>List of Admins</Typography></ListItem>
              
              <ListItem button component={Link} to="/addAdmin"><Typography>Add Admin User</Typography></ListItem>
              <Divider />

              <ListItem button onClick={props.logout}>
              <Typography>LogOut
                
</Typography></ListItem>
 
              </List>
              
            </div>
          );
        
          const container = window !== undefined ? () => window().document.body : undefined;
        
          return (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                   RIZKA DASHBOARD 
                  </Typography>
                </Toolbar>
              </AppBar>
             
              <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                  <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
              </nav>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  {/* tutorials */}
                    {/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
                    <Route exact path="/add" component={AddTutorial} />
                    <Route path="/tutorials/:id" component={Tutorial} /> */}
                  {/* Investments */}
                    <Route exact path={["/", "/typeProjects"]} component={TypeProjectsList} />
                    <Route exact path="/addtypeProject" component={AddTypeProject} />
                    <Route path="/typeProjects/:id" component={TypeProject} />
                    {/* project */}
                    <Route exact path="/addproject/:id" component={AddProject} />
                    <Route exact path={["/projects"]} component={ProjectsList} />
                    <Route exact path={["/UploadFiles/:id"]} component={UploadFiles} />
                    <Route path="/projects/:id" component={Project} />
                    {/* lands */}
                    <Route exact path={["/", "/lands"]} component={LandsList} />
                    <Route exact path="/addLand" component={AddLand} />
                    <Route path="/lands/:id" component={Land} /> 

                    {/* admin */}
                    <Route exact path={["/", "/admins"]} component={AdminsList} />
                    <Route exact path="/addAdmin" component={AddAdmin} />
                    <Route path="/admins/:id" component={Admin} />
                  
                  </Switch>
              </main>
            </div>
        
        );
        }
        
  
  
