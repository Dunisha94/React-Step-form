import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import Checkout from "./Checkout";

const EducationalInfo = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const skl = [
      { skill: "Very Good", value: 0 },
      { skill: "Good", value: 1 },
      { skill: "Fair", value: 2 },
    ];
    const qul = [
      { qualification: "Degree", value: 0 },
      { qualification: "Diploma", value: 1 },
      { qualification: "Certificate", value: 2 },
    ];
    const mbr = [
      { membership: "None", value: 0 },
      { membership: "IEEE", value: 1 },
      { membership: "Test", value: 2 },
      { membership: "Test", value: 3 },
    ];
    const [ol_year, setOL_year] = useState(allData.ol_year || ""); // Set initial value from allData prop
    const [ol_school, setOL_school] = useState(allData.ol_school || ""); // Set initial value from allData prop
    const [ol_index, setOL_index] = useState(allData.ol_index || ""); // Set initial value from allData prop
    const [al_year, setAL_year] = useState(allData.al_year || ""); // Set initial value from allData prop
    const [al_school, setAL_school] = useState(allData.al_school || ""); // Set initial value from allData prop
    const [al_index, setAL_index] = useState(allData.al_index || ""); // Set initial value from allData prop

    const [technical_skills, setTechnical_skills] = useState(
      allData.technical_skills || ""
    );
    const [computer_literacy, setComputer_Literacy] = useState(
      allData.computer_literacy || ""
    );
    const [training_programmes, setTraining_programmes] = useState(
      allData.training_programmes || ""
    );
    const [membership, setMembership] = useState(allData.membership || "");
    const [activities, setActivities] = useState(allData.activities || "");
    const [other, setOther] = useState(allData.other || "");
    const [skillsinhala, setSkillsinhala] = React.useState(
      allData.skillsinhala || null
    );
    const [skilltamil, setSkilltamil] = React.useState(
      allData.skilltamil || null
    );
    const [skillenglish, setSkillenglish] = React.useState(
      allData.skillenglish || null
    );
    const [qualifications, setQualifications] = React.useState(
      allData.qualifications || null
    );
    // const [additionalFields, setAdditionalFields] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [additionalFields, setAdditionalFields] = useState(
      allData.additionalFields || []
    );
    const [sports, setSports] = useState(allData.sports || []);

    const [fieldCounters, setFieldCounters] = useState(
      additionalFields.map((_, index) => index + 1)
    );

    const [additionalFieldsErrors, setAdditionalFieldsErrors] = useState(() => {
      return allData.additionalFields
        ? allData.additionalFields.map(() => ({
            fromYearError: false,
            toYearError: false,
            institutionError: false,
            // degreeError: false,
            marksError: false,
            studyAreaError: false,
          }))
        : [];
    });

    const [olYearError, setOlYearError] = useState(false);
    const [olSchoolError, setOlSchoolError] = useState(false);
    const [olYearNumberError, setOlYearNumberError] = useState(false);
    const [olIndexError, setOlIndexError] = useState(false);
    const [alYearError, setAlYearError] = useState(false);
    const [alSchoolError, setAlSchoolError] = useState(false);
    const [alYearNumberError, setAlYearNumberError] = useState(false);
    const [alIndexError, setaAlIndexError] = useState(false);
    const [skillErrorsinhala, setSkillErrorsinhala] = useState(false);
    const [skillErrortamil, setSkillErrortamil] = useState(false);
    const [skillErrorenglish, setSkillErrorenglish] = useState(false);
    const [qualificationsError, setQualificationsError] = useState(false);
    const [membershipError, setMembershipError] = useState(false);

    const handleAddField = () => {
      // Check if any of the existing additional fields have errors
      const hasErrors = additionalFieldsErrors.some((error) =>
        Object.values(error).some((val) => val)
      );

      // If there are errors, don't add a new field
      if (hasErrors) {
        return;
      }

      // Add a new field with default error values
      setAdditionalFields([
        ...additionalFields,
        {
          fromYear: "",
          toYear: "",
          institution: "",
          degree: "",
          marks: "",
          studyArea: "",
        },
      ]);

      setAdditionalFieldsErrors([
        ...additionalFieldsErrors,
        {
          fromYearError: false,
          toYearError: false,
          institutionError: false,
          degreeError: false,
          marksError: false,
          studyAreaError: false,
        },
      ]);
      setFieldCounters((prevCounters) => [
        ...prevCounters,
        prevCounters.length + 1,
      ]);
    };

    const handleRemoveField = (index) => {
      const updatedFields = [...additionalFields];
      updatedFields.splice(index, 1);
      setAdditionalFields(updatedFields);

      const updatedErrors = [...additionalFieldsErrors];
      updatedErrors.splice(index, 1);
      setAdditionalFieldsErrors(updatedErrors);
    };

    const handleAdditionalFieldChange = (index, field, value) => {
      const updatedFields = [...additionalFields];
      updatedFields[index][field] = value;
      setAdditionalFields(updatedFields);

      const updatedErrors = [...additionalFieldsErrors];
      updatedErrors[index][`${field}Error`] = value.trim().length === 0;
      setAdditionalFieldsErrors(updatedErrors);
    };

    const SkillProps = {
      options: skl,
      getOptionLabel: (option) => option.skill,
      getOptionValue: (option) => option.value,
    };

    const skillprops = {
      options: skl.map((option) => option.skill),
    };

    const QulProps = {
      options: qul,
      getOptionLabel: (option) => option.qualification,
      getOptionValue: (option) => option.value,
    };

    const qualificationprops = {
      options: qul.map((option) => option.qualification),
    };

    const MemberProps = {
      options: mbr,
      getOptionLabel: (option) => option.membership,
      getOptionValue: (option) => option.value,
    };

    const membershipprops = {
      options: mbr.map((option) => option.membership),
    };

    const validate = () => {
      let isValid =
        ol_year.length === 4 &&
        /^\d{4}$/.test(ol_year) &&
        ol_school.length > 0 &&
        ol_index.length > 0 &&
        al_year.length === 4 &&
        /^\d{4}$/.test(al_year) &&
        al_school.length > 0 &&
        al_index.length > 0 &&
        skillsinhala !== null &&
        skilltamil !== null &&
        skillenglish !== null &&
        qualifications !== null;

      setOlYearError(ol_year.length === 0);
      setOlYearNumberError(!/^\d{4}$/.test(ol_year));
      setOlSchoolError(ol_school.length === 0);
      setOlIndexError(ol_index.length === 0);
      setAlYearError(al_year.length === 0);
      setAlYearNumberError(!/^\d{4}$/.test(al_year));
      setAlSchoolError(al_school.length === 0);
      setaAlIndexError(al_index.length === 0);
      setSkillErrorsinhala(!skillsinhala || skillsinhala.length === 0);
      setSkillErrortamil(!skilltamil || skilltamil.length === 0);
      setSkillErrorenglish(!skillenglish || skillenglish.length === 0);
      setQualificationsError(!qualifications || qualifications.length === 0);
      setMembershipError(!membership || membership.length === 0);

      // Validate additional fields
      additionalFields.forEach((field, index) => {
        const hasError =
          field.fromYear.trim().length === 0 ||
          !/^\d{4}$/.test(field.fromYear) ||
          field.toYear.trim().length === 0 ||
          !/^\d{4}$/.test(field.toYear) ||
          field.institution.trim().length === 0 ||
          //field.degree.trim().length === 0 ||
          field.marks.trim().length === 0 ||
          field.studyArea.trim().length === 0;

        const updatedErrors = [...additionalFieldsErrors];
        updatedErrors[index] = {
          fromYearError:
            field.fromYear.trim().length === 0 ||
            !/^\d{4}$/.test(field.fromYear),
          toYearError:
            field.toYear.trim().length === 0 || !/^\d{4}$/.test(field.toYear),
          institutionError: field.institution.trim().length === 0,
          degreeError: field.degree.trim().length === 0,
          marksError: field.marks.trim().length === 0,
          studyAreaError: field.studyArea.trim().length === 0,
        };
        setAdditionalFieldsErrors(updatedErrors);
        isValid = isValid && !hasError;
      });

      return isValid;
    };

    useEffect(() => {
      const isValid = validate();
      onValidationChange(isValid);
    }, [
      ol_year,
      ol_school,
      ol_index,
      al_year,
      al_school,
      al_index,
      technical_skills,
      computer_literacy,
      training_programmes,
      membership,
      additionalFields,
      activities,
      other,
      skillsinhala,
      skilltamil,
      skillenglish,
      sports,
      qualifications,
      onValidationChange,
      validate,
    ]);

    useImperativeHandle(ref, () => ({
      handleSave() {
        if (validate()) {
          const data = {
            ol_year,
            ol_school,
            ol_index,
            al_year,
            al_school,
            al_index,
            technical_skills,
            computer_literacy,
            training_programmes,
            membership,
            additionalFields,
            activities,
            other,
            skillsinhala,
            skilltamil,
            skillenglish,
            qualifications,
            sports,
          };

          saveData(data);
        }
      },
    }));

    const errorColor = "red";

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          3. Educational Qualifications
        </Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.1 GCE O/L
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="ol_year"
              label="Year"
              value={ol_year}
              onChange={(e) => setOL_year(e.target.value)}
              fullWidth
              autoComplete="ol_year"
              inputProps={{
                maxLength: 4,
              }}
              helperText={
                (olYearError || olYearNumberError) && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    Year must be a 4-digit number, Ex: 2023
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="ol_school"
              label="School Attended"
              value={ol_school}
              onChange={(e) => setOL_school(e.target.value)}
              fullWidth
              autoComplete="ol_school"
              helperText={
                olSchoolError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="ol_index"
              label="Index No"
              value={ol_index}
              onChange={(e) => setOL_index(e.target.value)}
              fullWidth
              autoComplete="ol_index"
              helperText={
                olIndexError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.2 GCE A/L
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="al_year"
              label="Year"
              value={al_year}
              onChange={(e) => setAL_year(e.target.value)}
              fullWidth
              autoComplete="al_year"
              inputProps={{
                maxLength: 4,
              }}
              helperText={
                (alYearError || alYearNumberError) && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    Year must be a 4-digit number, Ex: 2023
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="al_school"
              label="School Attended"
              value={al_school}
              onChange={(e) => setAL_school(e.target.value)}
              fullWidth
              autoComplete="al_school"
              helperText={
                alSchoolError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="al_index"
              label="Index No"
              value={al_index}
              onChange={(e) => setAL_index(e.target.value)}
              fullWidth
              autoComplete="al_index"
              helperText={
                alIndexError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.3 Higher Educational Qualifications
        </Typography>
        {additionalFields.map((field, index) => (
          <Grid container spacing={3} key={index} style={{ marginTop: "1px" }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                3.3.{fieldCounters[index]}
              </Typography>
              <TextField
                required
                label="Name of Institution"
                value={field.institution}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "institution",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`institution-${index}`}
                helperText={
                  additionalFieldsErrors[index].institutionError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="From (Year)"
                value={field.fromYear}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "fromYear", e.target.value)
                }
                fullWidth
                autoComplete={`fromYear-${index}`}
                inputProps={{
                  maxLength: 4,
                }}
                helperText={
                  (field.fromYear.length === 0 ||
                    !/^\d{4}$/.test(field.fromYear)) && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      Year must be a 4-digit number, Ex: 2023
                    </Typography>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="To (Year)"
                value={field.toYear}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "toYear", e.target.value)
                }
                fullWidth
                autoComplete={`toYear-${index}`}
                inputProps={{
                  maxLength: 4,
                }}
                helperText={
                  (field.toYear.length === 0 ||
                    !/^\d{4}$/.test(field.toYear)) && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      Year must be a 4-digit number, Ex: 2023
                    </Typography>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Autocomplete
                {...QulProps}
                id="qualifications"
                required
                value={qualifications}
                onChange={(event, newValue) => {
                  setQualifications(newValue);
                }}
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="Sinhala" />
                    {qualificationsError && (
                      <Typography
                        variant="body2"
                        color="error"
                        component="span"
                        style={{ color: errorColor, fontSize: "0.75rem" }}
                      >
                        This field is required
                      </Typography>
                    )}
                  </>
                )}
              />
              {/* <TextField
                required
                label="Degree / Diploma / Certificate"
                value={field.degree}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "degree", e.target.value)
                }
                fullWidth
                autoComplete={`degree-${index}`}
                helperText={
                  additionalFieldsErrors[index].marksError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              /> */}
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required
                label="Grade / Marks"
                value={field.marks}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "marks", e.target.value)
                }
                fullWidth
                autoComplete={`marks-${index}`}
                helperText={
                  additionalFieldsErrors[index].degreeError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                label="Area of Study"
                value={field.studyArea}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "studyArea",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`studyArea-${index}`}
                helperText={
                  additionalFieldsErrors[index].studyAreaError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
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

        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.4 Professional Qualification
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="technical_skills"
              label="Professional Qualification"
              value={technical_skills}
              onChange={(e) => setTechnical_skills(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="technical_skills"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.5 Computer Literacy
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id=" computer_literacy"
              label="Computer Literacy"
              value={computer_literacy}
              onChange={(e) => setComputer_Literacy(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="computer_literacy"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.6 Other Qualifications
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="training_programmes"
              label="Training Programmes / Seminars / Workshop Attended"
              value={training_programmes}
              onChange={(e) => setTraining_programmes(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="training_programmes"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.7 Membership
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={4}>
            {/* <TextField
              id="membership"
              label="Membership/s in Any Recognized Proffssional Institutions"
              value={membership}
              onChange={(e) => setMembership(e.target.value)}
              fullWidth
              autoComplete="membership"
            /> */}
            <Autocomplete
              {...MemberProps}
              id="membership"
              required
              value={membership}
              onChange={(event, newValue) => {
                setMembership(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Membership" />
                  {membershipError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.8 Linguistic Skill
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              {...SkillProps}
              id="skillsinhala"
              required
              value={skillsinhala}
              onChange={(event, newValue) => {
                setSkillsinhala(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Sinhala" />
                  {skillErrorsinhala && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              {...SkillProps}
              id="skilltamil"
              required
              value={skilltamil}
              onChange={(event, newValue) => {
                setSkilltamil(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Tamil" />
                  {skillErrortamil && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              {...SkillProps}
              id="skillenglish"
              required
              value={skillenglish}
              onChange={(event, newValue) => {
                setSkillenglish(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="English" />
                  {skillErrorenglish && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.9 Other Personal Info
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="activities"
              label="Professional Interests & Activities"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              fullWidth
              autoComplete="activities"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.9.2 Extracurricular Activities
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="other"
              label="Extracurricular Activities / Membership of Clubs / Awards / Achievements etc"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              fullWidth
              autoComplete="other"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.10 Sports
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="sports"
              label="Sports"
              value={sports}
              onChange={(e) => setSports(e.target.value)}
              fullWidth
              autoComplete="Sports"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);
export default EducationalInfo;
