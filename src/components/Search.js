import React, { useState } from "react";
import {
  Box,
  Select,
  Button,
  MenuItem,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    background: "#fff",
    boxShadows: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    display: "flex",
    "& > * ": {
      flex: 1,
      height: "45px",
      margin: "8px"
    }
  }
});

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "Full Time",
    location: "Remote"
  });
  const classes = useStyles();

  const handleChange = (e) => {
    e.persist();
    setJobSearch({ ...jobSearch, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    await props.searchCustomJobs(jobSearch);
    setLoading(false);
  };

  console.log(jobSearch);

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
      <Select
        name="type"
        value={jobSearch.type}
        onChange={handleChange}
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Full Time">Full Time</MenuItem>
        <MenuItem value="Part Time">Part Time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select
        name="location"
        value={jobSearch.location}
        onChange={handleChange}
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-Office">In-Office</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        disableElevation
        onClick={handleSearch}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};

export default Search;
