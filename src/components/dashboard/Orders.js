import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data




function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [nmbAds, setnmbAds] = useState([])
   useEffect( () => {

    axios.get("http://localhost:8089/v1/annonces").then(res=>{
      setnmbAds(res.data)

     
    })

},[]);
console.log(nmbAds)
  return (
    <React.Fragment>
      <Title>Dernières annonces</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            
            <TableCell>Titre</TableCell>
            <TableCell>Emplacement</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell align="center">Décision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nmbAds.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.emplacement}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="center"><Button color='primary' variant="contained">valider</Button>
              <Button onClick={() => axios.post("http://localhost:8089/v1/annonce/delete/"+row.id)} 
              color='secondary' variant="contained">supprimer</Button>
              <Button  variant="contained">voir</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          voir plus 
        </Link>
      </div>
    </React.Fragment>
  );
}