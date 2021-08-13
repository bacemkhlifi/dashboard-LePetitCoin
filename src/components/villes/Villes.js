import React,{Component} from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Button,TextField} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {TableBody,TableCell,TableRow,TableHead,Table,TableContainer,Collapse} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from '../dashboard/listItems';

import Deposits from '../dashboard/Deposits';
import Orders from '../dashboard/Orders';
import { render } from '@testing-library/react';
import { withStyles } from '@material-ui/core/styles';

const useRowStyles = makeStyles({
    root: {
      marginLeft:"20%",
     
    },
  });
  

 
 
  
 
  ///////////////////

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
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


class Villes extends Component {


componentDidMount() {

  
   axios.get("http://localhost:8089/v1/villes")
          .then((response) => this.setState({villes:response.data}));
        
}

  constructor() {
    super()
    this.state = {
       name:"",
       region:"",
        error: null,
        villes:[],
        loading: false
    };
}



 // Simple POST request with a JSON body using fetch

   



handleOnchange = e => this.setState({ [e.target.name]: e.target.value
});





handleAdd = event => {
  event.preventDefault()
  this.setState({ loading: true });
  const { name } = this.state;
  {
      const regesterData = {
         name:name
        
          
      };
      fetch ('http://localhost:8089/v1/new/ville', {
          method  : 'POST',
          headers : {'Content-Type': 'application/json' } , 
          body : JSON.stringify(regesterData),
      }).then(()=>{console.log('good')})
      console.log({regesterData})
      

      this.setState({
          name: "",
         
      });
      setTimeout(() => {
        
            
          
          this.setState({ loading: false })
      }, 2000)
      window.location.reload(); 
  }
};


  render(){
    const { classes } = this.props;
    const {villes}= this.state
  const {region} = this.state
    const { name } = this.state;
  

  return (
   <>
         <Drawer
        variant="permanent"
       
      >
        <div className={classes.toolbarIcon}>
          <IconButton >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
     
     <div style={{marginLeft:'19%'}}>
      <AppBar   >
        <Toolbar style={{marginLeft:'19%'}} className={classes.toolbar}>
       
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Tableau de bord LePetitCoin
          </Typography>
          
        </Toolbar>
      </AppBar>
   
      <main className={classes.content}>
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{"marginTop":"90px"}}>
        <TableHead>
          <TableRow>
            <TableCell  ><Typography variant="h6">Villes</Typography> </TableCell>
            <TableCell  > <Typography variant="h6">Région</Typography></TableCell>
            <TableCell  > <Typography variant="h6">Gérer</Typography></TableCell>
         
           
          </TableRow>
        </TableHead>
        <TableBody>
        {villes.map((row) => (
            <TableRow key={row.id_cat}>
              <TableCell>{row.name}</TableCell>
              
              <TableBody> 
               
        {row.region.map((row) => (
            <TableRow key={row.id_region}>
              <TableCell>{row.name}</TableCell>
              
            </TableRow>
            
            
            
          ))} 
         </TableBody>
         <div>
             <form onSubmit={ ()=>{
          axios.post('http://localhost:8089/v1/new/region/'+row.id_ville,{
            "name":this.state.region
          })
        .then(response => console.log(response.data))
        window.location.reload(); 
        }}>
         <TextField   onChange={this.handleOnchange}
                name="region"
                value={region} id="outlined-basic"
              label="Région" 
  /> 
           <Button color='primary'  type="submit" variant="contained" 
           >Ajouter</Button> 
        
        </form>
        </div>
            </TableRow>
            
          ))} 
         
             
        </TableBody>
      </Table>
     </TableContainer>
     <div>
   
              
        
            
     <form  onSubmit={this.handleAdd}>
  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Ajouter une nouvelle ville</Typography>
 <TextField   onChange={this.handleOnchange}
  name="name"
  value={name} id="outlined-basic" 
 label="Ville" variant="outlined"
  /> 
 <Button type="submit" color='primary'  variant="contained">Ajouter</Button>
 </form>


 </div>
    
    </main>
      
    </div>
    </>
  );
}}
export default withStyles(useStyles) (Villes);