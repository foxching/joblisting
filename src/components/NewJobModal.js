import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Select,
  MenuItem,
  FilledInput,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
  DialogActions,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const skills = [
  "Javascript",
  "React",
  "Node",
  "Vue",
  "Firebase",
  "MongoDB",
  "SQL"
];

const initialState = {
  title: "",
  type: "Full Time",
  location: "Remote",
  companyName: "",
  companyUrl: "",
  description: "",
  skills: [],
  link: ""
};

const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.75),
    padding: theme.spacing(0.5),
    fontSize: "14.5px",
    borderRadius: "5px",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    fontWeight: 600,
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.secondary.main,
      color: "#fff"
    }
  },
  included: {
    background: theme.palette.secondary.main,
    color: "#fff"
  }
}));

const NewJobModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(initialState);

  const handleChange = (e) => {
    e.persist();
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const addRemoveSkill = (skill) => {
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill)
        }))
      : setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill)
        }));
  };

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) {
        return;
      }
    }
    if (!jobDetails.skills.length) {
      return;
    }
    setLoading(true);
    await props.addJob(jobDetails);
    setLoading(false);
    closeModal();
  };

  const closeModal = () => {
    setJobDetails(initialState);
    setLoading(false);
    props.setOpenJobModal(false);
  };

  const classes = useStyles();
  return (
    <Dialog open={props.openJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              name="title"
              value={jobDetails.title}
              placeholder="Job Title *"
              fullWidth
              onChange={handleChange}
              autoComplete="false"
              disableUnderline
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="type"
              value={jobDetails.type}
              disableUnderline
              variant="filled"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              name="companyName"
              value={jobDetails.companyName}
              placeholder="Company Name *"
              fullWidth
              onChange={handleChange}
              autoComplete="false"
              disableUnderline
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              name="companyUrl"
              value={jobDetails.companyUrl}
              placeholder="Company Url *"
              fullWidth
              onChange={handleChange}
              autoComplete="off"
              disableUnderline
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              name="location"
              value={jobDetails.location}
              disableUnderline
              variant="filled"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-Office">In-Office</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              name="link"
              value={jobDetails.link}
              placeholder="Job Link*"
              fullWidth
              onChange={handleChange}
              autoComplete="false"
              disableUnderline
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              name="description"
              value={jobDetails.description}
              placeholder="Job Description*"
              autoComplete="false"
              fullWidth
              onChange={handleChange}
              disableUnderline
              multiline
              rows={4}
            />
          </Grid>
          <Box>
            <Typography>Skills</Typography>
            <Box display="flex">
              {skills.map((skill) => (
                <Box
                  onClick={() => addRemoveSkill(skill)}
                  className={`${classes.skillChip} ${
                    jobDetails.skills.includes(skill) && classes.included
                  }`}
                  key={skill}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">* Required Fields</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Jobs"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewJobModal;
