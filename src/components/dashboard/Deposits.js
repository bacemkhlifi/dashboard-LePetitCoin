import React, {useEffect,useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from 'axios'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});



export default function Deposits() {
  
 
  const classes = useStyles();
  const [nmbAds, setnmbAds] = useState(0)
   useEffect( () => {

    axios.get("http://localhost:8089/v1/annonces").then(res=>{
      setnmbAds(res.data.length)
      
    })

});

  return (
    <React.Fragment>
      <Title>Nombre d'annonces publiées</Title>
      <Typography component="p" variant="h4">
        {nmbAds}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      annonces
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
        Voir le solde échangés 
        </Link>
      </div>
    </React.Fragment>
  );
}