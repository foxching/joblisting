import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  ThemeProvider,
  Grid,
  CssBaseline,
  CircularProgress,
  Box,
  Button
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Header from "./components/Header";
import Search from "./components/Search";
import JobCard from "./components/JobCard";
import NewJobModal from "./components/NewJobModal";
import ViewJobModal from "./components/ViewJobModal";
import theme from "./theme/theme";

import { firestore, app } from "./firebase/config";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openJobModal, setOpenJobModal] = useState(false);
  const [viewJob, setViewJob] = useState({});
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    setCustomSearch(false);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "asc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const searchCustomJobs = async (searchJobs) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "asc")
      .where("type", "==", searchJobs.type)
      .where("location", "==", searchJobs.location)
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const addJob = async (jobDetails) => {
    await firestore.collection("jobs").add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setOpenJobModal={setOpenJobModal} />
      <NewJobModal
        openJobModal={openJobModal}
        setOpenJobModal={setOpenJobModal}
        addJob={addJob}
      />
      <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />
      <Box my={2}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Search searchCustomJobs={searchCustomJobs} />
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {customSearch && (
                  <Box my={2} display="flex" justifyContent="flex-end">
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => (
                  <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
