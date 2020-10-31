import React from "react";
import { Box, Grid, Typography, Button } from "@material-ui/core";

const Header = ({ setOpenJobModal }) => (
  <Box py={10} bgcolor="secondary.main" color="white">
    <Grid container justify="center">
      <Grid item xs={10}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4">Job Listing</Typography>
          <Button
            onClick={() => setOpenJobModal(true)}
            variant="contained"
            color="primary"
            disableElevation
          >
            Post a job
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Header;
