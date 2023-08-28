import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const WokingExp = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const [projects, setProjects] = useState(allData.projects || "");
    const [workingExperience, setWorkingExperience] = useState(
      allData.workingExperience || []
    );
    const [fieldValidations, setFieldValidations] = useState(
      allData.fieldValidations || []
    );
    const [fieldCounters, setFieldCounters] = useState(
      workingExperience.map((_, index) => index + 1)
    );
    const [projectsError, setprojectsError] = useState(false);
    const [supContactError, setSupContactError] = useState([]);
    const [fromYearError, setFromYearError] = useState([]);
    const [toYearError, setToYearError] = useState([]);

    const [formValid, setFormValid] = useState(false);

    const validate = () => {
      const areFieldsValid = fieldValidations.every((validation) => {
        return Object.values(validation).every((value) => value === true);
      });

      // Check if all fromYear and toYear fields are 4-digit numbers
      const areYearsValid = workingExperience.every(
        (experience) =>
          /^\d{4}$/.test(experience.fromYear) &&
          /^\d{4}$/.test(experience.toYear)
      );

      // Check if all sup_contact fields have valid mobile numbers
      const areSupContactsValid = workingExperience.every(
        (experience) =>
          /^0\d{9}$/.test(experience.sup_contact) &&
          experience.sup_contact.length === 10
      );

      // Set the validation state for fromYear and toYear fields
      const updatedFromYearError = workingExperience.map(
        (experience) => !/^\d{4}$/.test(experience.fromYear)
      );
      setFromYearError(updatedFromYearError);
      const updatedToYearError = workingExperience.map(
        (experience) => !/^\d{4}$/.test(experience.toYear)
      );
      setToYearError(updatedToYearError);

      // Set the validation state for sup_contact fields
      const updatedSupContactError = workingExperience.map(
        (experience) =>
          !/^\d{10}$/.test(experience.sup_contact) ||
          experience.sup_contact.length !== 10
      );
      setSupContactError(updatedSupContactError);

      // Return the overall validation status
      const isFormValid =
        areFieldsValid &&
        !projectsError &&
        areYearsValid &&
        areSupContactsValid;
      setFormValid(isFormValid);
      return isFormValid;
    };

    useEffect(() => {
      const isValid = validate();
      onValidationChange(isValid);
    }, [
      projects,
      fieldValidations,
      supContactError,
      fromYearError,
      toYearError,
      onValidationChange,
      validate,
    ]);
    const handleAddField = () => {
      setWorkingExperience([
        ...workingExperience,
        {
          employer: "",
          designation: "",
          emp_address: "",
          sup_name: "",
          sup_designation: "",
          sup_contact: "",
          fromYear: "",
          toYear: "",
        },
      ]);

      setFieldValidations([
        ...fieldValidations,
        {
          employer: false,
          designation: false,
          emp_address: false,
          sup_name: false,
          sup_designation: false,
          sup_contact: false,
          fromYear: false,
          toYear: false,
        },
      ]);

      setFieldCounters((prevCounters) => [
        ...prevCounters,
        prevCounters.length + 1,
      ]);
    };

    // setSupContactError([...supContactError, false]);
    // setFromYearError([...fromYearError, false]);
    // setToYearError([...toYearError, false]);

    const handleRemoveField = (index) => {
      const updatedFields = [...workingExperience];
      updatedFields.splice(index, 1);
      setWorkingExperience(updatedFields);

      const updatedValidations = [...fieldValidations];
      updatedValidations.splice(index, 1);
      setFieldValidations(updatedValidations);

      const updatedSupContactError = [...supContactError];
      updatedSupContactError.splice(index, 1);
      setSupContactError(updatedSupContactError);
      const updatedFromYearError = [...fromYearError];
      updatedFromYearError.splice(index, 1);
      setFromYearError(updatedFromYearError);
      const updatedToYearError = [...toYearError];
      updatedToYearError.splice(index, 1);
      setToYearError(updatedToYearError);
    };

    const handleAdditionalFieldChange = (index, field, value) => {
      const updatedFields = [...workingExperience];
      updatedFields[index][field] = value;
      setWorkingExperience(updatedFields);

      const updatedValidations = [...fieldValidations];
      updatedValidations[index][field] = value.trim().length > 0;
      setFieldValidations(updatedValidations);

      if (field === "sup_contact") {
        const isValidMobileNumber =
          /^0\d{9}$/.test(value) && value.length === 10;
        const updatedSupContactError = [...supContactError];
        updatedSupContactError[index] = !value || !isValidMobileNumber;
        setSupContactError(updatedSupContactError);
      }

      // Additional validations for fromYear
      if (field === "fromYear") {
        const isValidYear = /^\d{4}$/.test(value);
        const updatedFromYearError = [...fromYearError];
        updatedFromYearError[index] = !value || !isValidYear;
        setFromYearError(updatedFromYearError);
      }

      // Additional validations for toYear
      if (field === "toYear") {
        const isValidYear = /^\d{4}$/.test(value);
        const updatedToYearError = [...toYearError];
        updatedToYearError[index] = !value || !isValidYear;
        setToYearError(updatedToYearError);
      }
    };

    useImperativeHandle(ref, () => ({
      handleSave() {
        if (validate()) {
          const data = {
            projects,
            workingExperience,
            fieldValidations,
          };

          saveData(data);
        }
      },
    }));

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          4. Employment History (Please start with the present employment)
        </Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          4.1 Employer Details
        </Typography>
        {workingExperience.map((experience, index) => (
          <Grid container spacing={3} key={index} style={{ marginTop: "1px" }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                4.1.{fieldCounters[index]}
              </Typography>
              <TextField
                required
                label="Name of the Employer"
                value={experience.employer}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "employer", e.target.value)
                }
                fullWidth
                autoComplete={`employer-${index}`}
                //error={fieldValidations[index].employer === false}
                helperText={
                  fieldValidations[index].employer === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )
                }
              />
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <TextField
                required
                label="Address of the Employer"
                value={experience.emp_address}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "emp_address",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`emp_address-${index}`}
                //error={fieldValidations[index].emp_address === false}
                helperText={
                  fieldValidations[index].emp_address === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Designation"
                value={experience.designation}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "designation",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`designation-${index}`}
                //error={fieldValidations[index].designation === false}
                helperText={
                  fieldValidations[index].designation === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Superior Name"
                value={experience.sup_name}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "sup_name", e.target.value)
                }
                fullWidth
                autoComplete={`sup_name-${index}`}
                //error={fieldValidations[index].sup_name === false}
                helperText={
                  fieldValidations[index].sup_name === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Superior Designation"
                value={experience.sup_designation}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "sup_designation",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`sup_designation-${index}`}
                //error={fieldValidations[index].sup_designation === false}
                helperText={
                  fieldValidations[index].sup_designation === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Superior Contact No"
                value={experience.sup_contact}
                inputProps={{
                  maxLength: 10,
                }}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "sup_contact",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`sup_contact-${index}`}
                //error={fieldValidations[index].fromYear === false || fromYearError[index]}
                helperText={
                  (fieldValidations[index].sup_contact === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )) ||
                  (supContactError[index] && (
                    <span style={{ color: "red" }}>
                      Please enter a valid mobile number (0XXXXXXXXX)
                    </span>
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="From (Year)"
                value={experience.fromYear}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "fromYear", e.target.value)
                }
                fullWidth
                autoComplete={`fromYear-${index}`}
                inputProps={{
                  maxLength: 4,
                }}
                //error={fieldValidations[index].fromYear === false || fromYearError[index]}
                helperText={
                  (fieldValidations[index].fromYear === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )) ||
                  (fromYearError[index] && (
                    <span style={{ color: "red" }}>
                      Year must be a 4-digit number, Ex: 2023
                    </span>
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="To (Year)"
                value={experience.toYear}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "toYear", e.target.value)
                }
                fullWidth
                autoComplete={`toYear-${index}`}
                inputProps={{
                  maxLength: 4,
                }}
                //error={fieldValidations[index].fromYear === false || fromYearError[index]}
                helperText={
                  (fieldValidations[index].toYear === false && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )) ||
                  (toYearError[index] && (
                    <span style={{ color: "red" }}>
                      Year must be a 4-digit number, Ex: 2023
                    </span>
                  ))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => handleRemoveField(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginBottom: "10px",
                }}
                startIcon={<DeleteIcon />}
              >
                Remove Field
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddField}
            style={{ marginTop: "1px", width: "165px" }}
            startIcon={<AddIcon />}
          >
            Add Field
          </Button>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "40px" }}>
          4.2 Projects
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="projects"
              name="projects"
              label="Significant Projects Involved."
              multiline
              rows={2}
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              fullWidth
              autoComplete="projects"
              //error={refereeMobile2Error}
              helperText={
                projectsError && (
                  <span style={{ color: "red" }}>This field is required</span>
                )
              }
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);
export default WokingExp;
