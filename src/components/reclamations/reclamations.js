


import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import {Typography,ListItem,ListItemText,Card, CardContent} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from '../dashboard/listItems';
import axios from 'axios';
import { Link} from 'react-router-dom'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
      },
 
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


export default function Reclamations() {
 
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [reclamation, setreclamation] = useState([])
  const [message, setmessage] = useState({
      
  })
  useEffect(async() => {
    await  axios.get("http://localhost:8089/v1/reclamations").then((res)=>setreclamation(res.data))
   
  
    }, [reclamation])
    useEffect(async() => {
       await  axios.get("http://localhost:8089/v1/reclamation/"+selectedIndex).then((res)=>setmessage(res.data))
    
      
        }, [message])
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Tableau de bord LePetitCoin
          </Typography>
          <IconButton color="inherit"
          component={Link} to={"/reclamations"}
          >
            <Badge badgeContent={reclamation.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
         <Grid container>
            <Grid item lg={3} >
          
      <Divider />
      
      <List component="nav" aria-label="secondary mailbox folder">
       {reclamation.map((rec)=>( 
       <ListItem
          button
          selected={selectedIndex === rec.id_reclamation}
          onClick={(event) => handleListItemClick(event,rec.id_reclamation )}
        >
          <ListItemText primary={rec.email} />
        </ListItem>
        ))}
      </List>
                
                
                 </Grid>

            <Grid item  >
                <Card>
                    <CardContent  style={{  "minWidth": "750px",
                                            "minHeight":"70vh"}}>
                        <Typography variant="h6"
                        style={{}}
                        >Réclamation </Typography>
                            <p>Message : {message.message}</p>

                            <Typography variant="subtitle"
                        style={{}}
                        >Type réclamation : {message.type} </Typography>  
                         <Typography variant="subtitle"
                        style={{}}
                        >Téléphone : {message.phone} </Typography> 

                    </CardContent>

                </Card>
                
                
                </Grid>     
             
        </Grid> 
            
          
         
        </Container>
      </main>
    </div>
  );
}