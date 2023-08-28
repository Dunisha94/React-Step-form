import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import PersonalInfo from "./PersonalInfo";
import EducationalInfo from "./EducationalInfo";
import CVUpload from "./CVUpload";
import WokingExp from "./WokingExp";
import CareerAspirations from "./CareerAspirations";
import OtherInformations from "./OtherInformations";
import References from "./References";
import { useDispatch } from "react-redux";
import {
  getData,
  getData1,
  getData2,
} from "../../../action/CANDIDATES/StepForm";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@mui/material";

import { useState } from "react";

const customTheme = createTheme({
  spacing: 5, // Set spacing to 0 for the entire page
  // Add any other theme overrides you need
});

export default function Checkout() {
  const [loading, setLoading] = React.useState(false);
  const [isValid, setValid] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [allData, setAllData] = React.useState({});
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const handleTermsCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
  };
  const handleResetConfirmed = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to reset the fields?"
    );
    if (userConfirmed) {
      handleReset();
    }
  };
  const handleSaveInCheckout = () => {
    // Perform any necessary actions specific to the CheckoutPage
    // ...

    // Trigger the handleSave function in the EducationalInfo component
    if (InfoRef.current) {
      InfoRef.current.handleSave();
    }
  };
  const InfoRef = React.useRef();

  const handleValidationChange = (isValid) => {
    setValid(isValid);
  };

  const handleInfoSave = (data) => {
    setAllData((prevData) => {
      const newData = {
        ...prevData,
        ...data,
      };

      return newData;
    });
  };
  // console.log("Total data:", allData.gender?.value);
  // console.log("Total data:", allData.electorate?.value);
  // console.log("Total data:", allData.marital_status?.value);
  // console.log("Total data:", allData.police_station?.value);
  // console.log("Total data:", allData.district?.value);
  console.log("full data:", allData);

  const steps = [
    "Upload CV",
    "Personal Info",
    "Educational Info",
    "Working Experience",
    "Career Aspirations",
    "Other Informations",
    "Referees",
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CVUpload
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 1:
        return (
          <PersonalInfo
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 2:
        return (
          <EducationalInfo
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 3:
        return (
          <WokingExp
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 4:
        return (
          <CareerAspirations
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 5:
        return (
          <OtherInformations
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 6:
        return (
          <References
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex(
            (step, i) => !(i in completed) || i === activeStep - 1
          )
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    handleSaveInCheckout();
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setSummaryData(allData);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setAllData({});
  };
  const handleEdit = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const completedStepsCount = completedSteps();
  const totalStepsCount = totalSteps();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dob = new Date(allData.dob);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDOB = dob.toLocaleDateString("en-US", options);
  // console.log(formattedDOB);

  const fixedPath = "D:\\cdplc_hrm\\";
  const uploadedFile = allData.uploadedFile;
  const completeFilePath = fixedPath + uploadedFile;

  const handleSaveButtonClick = async () => {
    try {
      if (!termsAccepted) {
        // Display an alert message if terms are not accepted
        alert("Please agree to the terms and conditions before saving.");
        return;
      }
      console.log("onSignUpPressed called");
      const requestDataAll = new FormData();
      let data1 = {};
      let data2 = {};

      requestDataAll.append("reg_userid", "574");
      requestDataAll.append("cv_path", completeFilePath);
      requestDataAll.append("initial", allData.initial);
      requestDataAll.append("initial_name", allData.initial_name);
      requestDataAll.append("permanent_address", allData.permanent_address);
      requestDataAll.append("contact_address", allData.contact_address);
      requestDataAll.append("mobile", allData.mobile);
      requestDataAll.append("mobile_2", allData.mobile_2);
      requestDataAll.append("email", allData.email);
      requestDataAll.append("dob", formattedDOB);
      requestDataAll.append("age", allData.age);
      requestDataAll.append("marital_status", allData.marital_status?.value);
      requestDataAll.append("gender", allData.gender?.value);
      requestDataAll.append("nationality", allData.nationality);
      requestDataAll.append("nic_passport", allData.nic_passport);
      requestDataAll.append("police_station", allData.police_station?.value);
      requestDataAll.append("electorate", allData.electorate?.value);
      requestDataAll.append("district", allData.district?.value);
      // requestDataAll.append("activities", "test activities");
      // requestDataAll.append(
      //   "extracurricular_activities",
      //   "test extra activities"
      // );
      requestDataAll.append("ol_year", allData.ol_year);
      requestDataAll.append("ol_school", allData.ol_school);
      requestDataAll.append("ol_index", allData.ol_index);
      requestDataAll.append("al_year", allData.al_year);
      requestDataAll.append("al_school", allData.al_school);
      requestDataAll.append("al_index", allData.al_index);
      requestDataAll.append("technical_skills", allData.technical_skills);
      requestDataAll.append("training_programmes", allData.training_programmes);
      requestDataAll.append("membership", allData.membership);
      requestDataAll.append("activities", allData.activities);
      requestDataAll.append("other", allData.other);
      requestDataAll.append("sinhala_level", allData.skillsinhala?.value);
      requestDataAll.append("tamil_level", allData.skilltamil?.value);
      requestDataAll.append("english_level", allData.skillenglish?.value);
      requestDataAll.append("career_objective", allData.career_objective);
      requestDataAll.append("aspirations", allData.aspirations);
      requestDataAll.append("relatives", allData.relatives);
      requestDataAll.append("previously_worked", allData.previously_worked);
      requestDataAll.append("court_cases", allData.court_cases);
      requestDataAll.append("illneses", allData.illneses);
      requestDataAll.append("other_information", allData.other_information);
      requestDataAll.append("referee_name1", allData.referee_name_1);
      requestDataAll.append(
        "referee_designation1",
        allData.referee_designation_1
      );
      requestDataAll.append("referee_address1", allData.referee_address_1);
      requestDataAll.append("referee_mobile1", allData.referee_mobile_2);
      requestDataAll.append("referee_name2", allData.referee_name_2);
      requestDataAll.append(
        "referee_designation2",
        allData.referee_designation_2
      );
      requestDataAll.append("referee_address2", allData.referee_address_2);
      requestDataAll.append("referee_mobile2", allData.referee_mobile_2);

      for (const field of allData.additionalFields) {
        // console.log("From Year:", field.fromYear);
      }
      const HigherEducationDetailsList = allData.additionalFields.map(
        (field) => ({
          from_year: field.fromYear,
          to_year: field.toYear,
          institution: field.institution,
          degree: field.degree,
          grade: field.marks,
          area: field.studyArea,
          reg_userid: "2",
          biodata_id: "296",
        })
      );
      const EmployeeDetailsList = allData.workingExperience.map((field) => ({
        employer_name: field.employer,
        designation: field.designation,
        employer_address: field.emp_address,
        superior_name: field.sup_name,
        superior_designation: field.sup_designation,
        superior_contactno: field.sup_contact,
        form_year: field.fromYear,
        to_year: field.toYear,
        projects: field.projects,
        reg_userid: "2",
        biodata_id: "296",
      }));

      data1.Jsonlist = JSON.stringify(HigherEducationDetailsList);
      data2.Jsonlist = JSON.stringify(EmployeeDetailsList);
      if (termsAccepted) {
        await dispatch(getData(setLoading, navigate, requestDataAll));
        await dispatch(getData1(data1));
        await dispatch(getData2(data2));
      } else {
        console.log("Please accept the terms and conditions.");
      }
    } catch (error) {
      console.error("Error during sending:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{
              my: { xs: 3, md: 3 },
              p: { xs: 2, md: 12 },
              width: "1200px",
              marginLeft: "-320px",
            }}
          >
            <Typography component="h1" variant="h4" align="center">
              Update Your Biodata
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ width: "100%", mr: 1 }}>
                <Box
                  sx={{
                    width: `${(completedStepsCount / totalStepsCount) * 100}%`, // Calculate progress percentage
                    bgcolor: "primary.main",
                    height: 8,
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {`${completedStepsCount}/${totalStepsCount}`}{" "}
                  {/* Show completed steps over total steps */}
                </Typography>
              </Box>
            </Box>
            <Stepper nonLinear activeStep={activeStep} sx={{ padding: "15px" }}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you're finished
                  </Typography>
                  <hr />
                  <Typography variant="h3" style={{ paddingTop: "15px" }}>
                    Summary
                  </Typography>
                  <br />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h5">1. Curriculum Vitae</Typography>
                    <br />
                    <Typography>
                      CV name : {allData.uploadedFile}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">2. Personal Info</Typography>
                    <br />
                    <Typography>
                      Name with Initials : {allData.initial}
                      <br />
                      Names Denoted by Initials : {allData.initial_name}
                      <br />
                      Permanent Address : {allData.permanent_address}
                      <br />
                      Contact Address : {allData.contact_address}
                      <br />
                      Mobile : {allData.mobile}
                      <br />
                      Mobile Other : {allData.mobile_2}
                      <br />
                      Email: {allData.email}
                      <br />
                      Date of Birth : {formattedDOB}
                      <br />
                      Age : {allData.age}
                      <br />
                      Marital Status : {allData.marital_status.status}
                      <br />
                      Gender : {allData.gender.gender}
                      <br />
                      Nationality : {allData.nationality}
                      <br />
                      NIC/Passport Number : {allData.nic_passport}
                      <br />
                      Police Station : {allData.police_station.station}
                      <br />
                      Electorate : {allData.electorate.station}
                      <br />
                      District : {allData.district.station}
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      3. Educational Qualifications
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.1 GCE O/L
                    </Typography>
                    <Typography>
                      Year : {allData.ol_year}
                      <br />
                      School Attended : {allData.ol_school}
                      <br />
                      Index No : {allData.ol_index}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.2 GCE A/L
                    </Typography>
                    <Typography>
                      Year : {allData.al_year}
                      <br />
                      School Attended : {allData.al_school}
                      <br />
                      Index No : {allData.al_index}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.3 Higher Educational Qualifications
                    </Typography>
                    {allData.additionalFields.map((field, index) => (
                      <div key={index}>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          Educational Qualification {index + 1}
                        </Typography>
                        <Typography>
                          From (Year) : {field.fromYear}
                          <br />
                          To (Year) : {field.toYear}
                          <br />
                          Name of Institution : {field.institution}
                          <br />
                          Degree / Diploma / Certificate : {field.degree}
                          <br />
                          Grade / Marks : {field.marks}
                          <br />
                          Area of Study : {field.studyArea}
                          <br />
                        </Typography>
                        <br />
                      </div>
                    ))}
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.4 Technical Skills / Computer Literacy
                    </Typography>
                    <Typography>
                      Technical Skills : {allData.technical_skills}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.5 Other Qualifications
                    </Typography>
                    <Typography>
                      Training Programmes : {allData.training_programmes}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.6 Membership
                    </Typography>
                    <Typography>
                      Membership : {allData.membership}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.7 Linguistic Skill
                    </Typography>
                    <Typography>
                      Sinhala : {allData.skillsinhala.value}
                      <br />
                    </Typography>
                    <Typography>Tamil : {allData.skilltamil.value}</Typography>
                    <Typography>
                      English : {allData.skillenglish.value}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.8 Other Personal Info
                    </Typography>
                    <Typography>
                      Professional Interests & Activities : {allData.activities}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      3.8.2 Extracurricular Activities
                    </Typography>
                    <Typography>
                      Extracurricular Activities / Membership of Clubs / Awards
                      / Achievements etc : {allData.other}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">4. Employment History</Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      4.1 Employer Details
                    </Typography>
                    {allData.workingExperience.map((experience, index) => (
                      <div key={index}>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          Employer Details {index + 1}
                        </Typography>
                        <Typography>
                          Name of the Employer : {experience.employer}
                          <br />
                          Designation : {experience.designation}
                          <br />
                          Address of the Employer : {experience.emp_address}
                          <br />
                          Superior Name : {experience.sup_name}
                          <br />
                          Superior Designation : {experience.sup_designation}
                          <br />
                          Superior Contact No : {experience.sup_contact}
                          <br />
                          From (Year) : {experience.fromYear}
                          <br />
                          To (Year) : {experience.toYear}
                          <br />
                        </Typography>
                        <br />
                      </div>
                    ))}
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      4.2 Projects
                    </Typography>
                    <Typography>
                      Projects : {allData.projects}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">5. Career Aspirations</Typography>
                    <br />
                    <Typography>
                      Career Objective : {allData.career_objective}
                      <br />
                      Aspirations : {allData.aspirations}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">6. Other Informations</Typography>
                    <br />
                    <Typography>
                      Relatives : {allData.relatives}
                      <br />
                      Previously Worked : {allData.previously_worked}
                      <br />
                      Court Cases : {allData.court_cases}
                      <br />
                      Suspension From Work : {allData.suspension_from_work}
                      <br />
                      Illneses : {allData.illneses}
                      <br />
                      Other Information : {allData.other_information}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h6">
                      7. Non-related Referees
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      7.1 First Non-related Referee
                    </Typography>
                    <Typography>
                      Referee Name 1 : {allData.referee_name_1}
                      <br />
                      Designation : {allData.referee_designation_1}
                      <br />
                      Official Address : {allData.referee_address_1}
                      <br />
                      Contact No : {allData.referee_mobile_1}
                      <br />
                    </Typography>
                    <br />
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      7.2 Second Non-related Referee
                    </Typography>
                    <Typography>
                      Referee Name 2 : {allData.referee_name_2}
                      <br />
                      Designation : {allData.referee_designation_2}
                      <br />
                      Official Address : {allData.referee_address_2}
                      <br />
                      Contact No : {allData.referee_mobile_2}
                      <br />
                    </Typography>
                    <div>
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{
                          fontSize: "10px",
                          fontStyle: "italic",
                          paddingTop: "40px",
                          color: "ash",
                        }}
                      >
                        Please ensure that all questions have been answered in
                        full, before save this application.
                      </Typography>
                      <br />
                      <Typography
                        component="h1"
                        variant="h5"
                        align="left"
                        style={{ "margin-bottom": "-30px" }}
                      >
                        Terms and Conditions
                      </Typography>
                      <Typography
                        component="p"
                        sx={{
                          fontSize: "10px",
                          paddingTop: "40px",
                        }}
                      >
                        I confirm that the information given above is true and
                        accurate to the best of my knowledge.I am aware that in
                        the event of this information being found factually
                        incorrect orior to the employment, my application is
                        liable to be rejected and if so found while in
                        employment, I am liable to be summarily dismissed
                      </Typography>
                    </div>
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={handleTermsCheckboxChange}
                      />
                    }
                    label="I accept the terms and conditions"
                  />

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* <Button
                      onClick={() => {
                        handleSaveButtonClick();
                      }}
                    >
                      Save
                    </Button> */}
                    <LoadingButton
                      loading={loading} // Pass the loading state here
                      fullWidth
                      loadingIndicator="Loading…"
                      onClick={() => {
                        handleSaveButtonClick();
                      }}
                      variant="outlined"
                      disabled={loading}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      onClick={handleResetConfirmed}
                      fullWidth
                      variant="outlined"
                    >
                      Reset
                    </Button>
                    <Button onClick={handleEdit} fullWidth variant="outlined">
                      Edit
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {completed[activeStep] ? (
                      <Button onClick={handleComplete} disabled={!isValid}>
                        {isLastStep() ? "Finish" : "Already Completed"}
                      </Button>
                    ) : (
                      <Button onClick={handleComplete} disabled={!isValid}>
                        Next
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
}
