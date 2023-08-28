import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const OtherInformations = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const [relatives, setRelatives] = useState(allData.relatives || "");
    const [previously_worked, setPreviously_worked] = useState(
      allData.previously_worked || ""
    );
    const [court_cases, setCourt_cases] = useState(allData.court_cases || "");
    const [suspension_from_work, setSuspension_from_work] = useState(
      allData.suspension_from_work || ""
    );
    const [illneses, setIllneses] = useState(allData.illneses || "");
    const [other_information, setOther_information] = useState(
      allData.other_information || ""
    );

    useEffect(() => {
      onValidationChange(true); // Assuming you always want to consider the fields as valid
    }, [onValidationChange]);

    useImperativeHandle(ref, () => ({
      handleSave() {
        const data = {
          relatives,
          previously_worked,
          court_cases,
          suspension_from_work,
          illneses,
          other_information,
        };

        saveData(data);
      },
    }));

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          5. Other Informations
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="relatives"
              name="relatives"
              label="Do you have any friends or relatives working at Colombo Dockyard PLC? If yes, please state the name/s and relationship/s"
              value={relatives}
              onChange={(e) => setRelatives(e.target.value)}
              fullWidth
              autoComplete="relatives"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="previously_worked"
              name="previously_worked"
              label="Have you applied for a job at Colombo Dockyard PLC previously? If yes, give the details (Date of advertisement, Position applied for, When the application was submitted etc.)"
              value={previously_worked}
              onChange={(e) => setPreviously_worked(e.target.value)}
              fullWidth
              autoComplete="previously_worked"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="court_cases"
              name="court_cases"
              label="Have you ever been convicted or pleaded guilty in a court of law to any crime other than minor traffic offences? Are there any court cases pending against you? If yes, give details."
              value={court_cases}
              onChange={(e) => setCourt_cases(e.target.value)}
              fullWidth
              autoComplete="court_cases"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="suspension_from_work"
              name="suspension_from_work"
              label="Have you ever faced disciplinary actions in employment resulting in dismissal or suspension from work?"
              value={suspension_from_work}
              onChange={(e) => setSuspension_from_work(e.target.value)}
              fullWidth
              autoComplete="suspension_from_work"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="illneses"
              name="illneses"
              label="Do you suffer from any illnesses? If yes, give details"
              value={illneses}
              onChange={(e) => setIllneses(e.target.value)}
              fullWidth
              autoComplete="illneses"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="other_information"
              name="other_information"
              label="Is there any other information that you wish to submit?"
              value={other_information}
              onChange={(e) => setOther_information(e.target.value)}
              fullWidth
              autoComplete="other_information"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);

export default OtherInformations;
