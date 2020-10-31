import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import differenceInMinutes from "date-fns/differenceInMinutes";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    transition: ".3s",
    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #4564E4"
    }
  },
  companyName: {
    fontSize: "13.5px",
    fontWeight: 600,
    background: theme.palette.primary.main,
    display: "inline-block",
    borderRadius: "5px",
    padding: theme.spacing(0.75)
  },
  skillChip: {
    margin: theme.spacing(0.75),
    padding: theme.spacing(0.5),
    fontSize: "14.5px",
    borderRadius: "5px",
    background: theme.palette.secondary.main,
    color: "#fff",
    fontWeight: 600
  }
}));

const JobCard = (props) => {
  const classes = useStyles();
  return (
    <Box p={2} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography className={classes.companyName} variant="subtitle1">
            {props.companyName}
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid className={classes.skillChip} key={skill} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container xs direction="column" alignItems="flex-end">
          <Grid item>
            <Typography variant="caption">
              {differenceInMinutes(new Date(), props.postedOn)} min ago ||{" "}
              {props.type}| {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button variant="outlined" onClick={props.open}>
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobCard;
