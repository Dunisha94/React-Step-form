import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const CareerAspirations = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const [career_objective, setCareer_objective] = useState(
      allData.career_objective || ""
    );
    const [aspirations, setAspirations] = useState(allData.aspirations || "");

    useEffect(() => {
      onValidationChange(true); // Assuming you always want to consider the fields as valid
    }, [onValidationChange]);

    useEffect(() => {
      localStorage.setItem(
        "career_objective",
        JSON.stringify(career_objective)
      );
      localStorage.setItem("aspirations", JSON.stringify(aspirations));
    }, [career_objective, aspirations]);

    useImperativeHandle(ref, () => ({
      handleSave() {
        const data = {
          career_objective,
          aspirations,
        };
        saveData(data);
      },
    }));
    
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          5. Career Aspirations
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="career_objective"
              name="career_objective"
              label="Please describe why you believe you are suitable for the role you are applying for with specific reference to your exposure in relation to the job"
              multiline
              rows={2}
              value={career_objective}
              onChange={(e) => setCareer_objective(e.target.value)}
              fullWidth
              autoComplete="career_objective"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="aspirations"
              name="aspirations"
              label="Where do you see yourself in another 5 years' time?"
              value={aspirations}
              onChange={(e) => setAspirations(e.target.value)}
              fullWidth
              autoComplete="aspirations"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);

export default CareerAspirations;
