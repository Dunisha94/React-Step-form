import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const References = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const [referee_name_1, setReferee_name_1] = useState(
      allData.referee_name_1 || ""
    );
    const [referee_designation_1, setReferee_designation_1] = useState(
      allData.referee_designation_1 || ""
    );
    const [referee_address_1, setReferee_address_1] = useState(
      allData.referee_address_1 || ""
    );
    const [referee_mobile_1, setReferee_mobile_1] = useState(
      allData.referee_mobile_1 || ""
    );
    const [referee_mobile_12, setReferee_mobile_12] = useState(
      allData.referee_mobile_12 || ""
    );
    const [referee_name_2, setReferee_name_2] = useState(
      allData.referee_name_2 || ""
    );
    const [referee_designation_2, setReferee_designation_2] = useState(
      allData.referee_designation_2 || ""
    );
    const [referee_address_2, setReferee_address_2] = useState(
      allData.referee_address_2 || ""
    );
    const [referee_mobile_2, setReferee_mobile_2] = useState(
      allData.referee_mobile_2 || ""
    );
    const [referee_mobile_22, setReferee_mobile_22] = useState(
      allData.referee_mobile_22 || ""
    );
    const [email, setEmail] = useState(allData.email || "");
    const [email2, setEmail2] = useState(allData.email2 || "");

    const [refereeName1Error, setRefereeName1Error] = useState(false);
    const [refereeDesignation1Error, setRefereeDesignation1Error] =
      useState(false);
    const [refereeAddress1Error, setRefereeAddress1Error] = useState(false);
    const [refereeMobile1Error, setRefereeMobile1Error] = useState(false);
    const [refereeMobileNumber1Error, setRefereeMobileNumber1Error] =
      useState(false);
    const [refereeMobile12Error, setRefereeMobile12Error] = useState(false);
    const [refereeMobileNumber12Error, setRefereeMobileNumber12Error] =
      useState(false);

    const [refereeName2Error, setRefereeName2Error] = useState(false);
    const [refereeDesignation2Error, setRefereeDesignation2Error] =
      useState(false);
    const [refereeAddress2Error, setRefereeAddress2Error] = useState(false);
    const [refereeMobile2Error, setRefereeMobile2Error] = useState(false);
    const [refereeMobileNumber2Error, setRefereeMobileNumber2Error] =
      useState(false);
    const [refereeMobile22Error, setRefereeMobile22Error] = useState(false);
    const [refereeMobileNumber22Error, setRefereeMobileNumber22Error] =
      useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailvalidateError, setEmailValidateError] = useState(false);
    const [emailError2, setEmailError2] = useState(false);
    const [emailvalidateError2, setEmailValidateError2] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const validate = () => {
      const formIsValid =
        referee_name_1.length > 0 &&
        referee_designation_1.length > 0 &&
        referee_address_1.length > 0 &&
        referee_mobile_1.length > 0 &&
        //referee_mobile_12.length > 0 &&
        referee_name_2.length > 0 &&
        referee_designation_2.length > 0 &&
        referee_address_2.length > 0 &&
        referee_mobile_2.length > 0 &&
        //referee_mobile_22.length > 0 &&
        email.length > 0 &&
        email2.length > 0;

      setIsFormValid(
        formIsValid &&
          !refereeMobileNumber1Error &&
          !refereeMobileNumber2Error &&
          !emailvalidateError2
      );

      setRefereeName1Error(referee_name_1.length === 0);
      setRefereeDesignation1Error(referee_designation_1.length === 0);
      setRefereeAddress1Error(referee_address_1.length === 0);
      setRefereeMobile1Error(referee_mobile_1.length === 0);
      setRefereeMobile12Error(referee_mobile_12.length === 0);
      setRefereeMobileNumber1Error();
      setRefereeMobileNumber12Error();
      setRefereeName2Error(referee_name_2.length === 0);
      setRefereeDesignation2Error(referee_designation_2.length === 0);
      setRefereeAddress2Error(referee_address_2.length === 0);
      setRefereeMobile2Error(referee_mobile_2.length === 0);
      setRefereeMobile22Error(referee_mobile_22.length === 0);
      setRefereeMobileNumber22Error();
      setRefereeMobileNumber2Error();
      setEmailError(!email || email.length === 0);
      setEmailValidateError(!email || !/\S+@\S+\.\S+/.test(email));
      setEmailError2(!email2 || email2.length === 0);
      setEmailValidateError2(!email2 || !/\S+@\S+\.\S+/.test(email2));

      return (
        formIsValid && !refereeMobileNumber1Error && !refereeMobileNumber2Error
      );
    };

    useEffect(() => {
      const isValid = validate();
      onValidationChange(isValid);
    }, [
      referee_name_1,
      referee_designation_1,
      referee_address_1,
      referee_mobile_1,
      referee_mobile_12,
      referee_name_2,
      referee_designation_2,
      referee_address_2,
      referee_mobile_2,
      referee_mobile_22,
      refereeMobileNumber1Error,
      refereeMobileNumber2Error,
      email,
      email2,
      onValidationChange,
      validate,
    ]);

    useImperativeHandle(ref, () => ({
      handleSave() {
        if (validate()) {
          const data = {
            referee_name_1,
            referee_designation_1,
            referee_address_1,
            referee_mobile_1,
            referee_mobile_12,
            referee_name_2,
            referee_designation_2,
            referee_address_2,
            referee_mobile_2,
            referee_mobile_22,
            email,
            email2,
          };

          saveData(data);
        }
      },
    }));

    const errorColor = "red";

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          7. Non-related Referees
        </Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          7.1 First Non-related Referee
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="referee_name_1"
              name="referee_name_1"
              label="Name"
              value={referee_name_1}
              onChange={(e) => setReferee_name_1(e.target.value)}
              fullWidth
              autoComplete="referee_name_1"
              //error={refereeName1Error}
              helperText={
                refereeName1Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
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
              id="referee_designation_1"
              name="referee_designation_1"
              label="Designation"
              value={referee_designation_1}
              onChange={(e) => setReferee_designation_1(e.target.value)}
              fullWidth
              autoComplete="referee_designation_1"
              //error={refereeDesignation1Error}
              helperText={
                refereeDesignation1Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
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
              id="referee_address_1"
              name="referee_address_1"
              label="Official Address"
              value={referee_address_1}
              onChange={(e) => setReferee_address_1(e.target.value)}
              fullWidth
              autoComplete="referee_address_1"
              //error={refereeAddress1Error}
              helperText={
                refereeAddress1Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
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
              id="email"
              name="email"
              type="email"
              label="Contact Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="email"
              helperText={
                (emailError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (emailvalidateError && (
                  <span style={{ color: "red" }}>
                    Please enter a valid email address
                  </span>
                ))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              required
              country={"lk"}
              id="referee_mobile_1"
              name="referee_mobile_1"
              label="Contact No"
              value={referee_mobile_1}
              onChange={(phone) => setReferee_mobile_1(phone)}
              fullWidth
              style={{
                width: "100%",
                height: "50px",
              }}
              inputStyle={{
                width: "100%",
                height: "100%",
              }}
              autoComplete="referee_mobile_1"
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              helperText={
                (refereeMobile1Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (refereeMobileNumber1Error && (
                  <span style={{ color: "red" }}>
                    Please enter a valid mobile number (0XXXXXXXXX)
                  </span>
                ))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              required
              country={"lk"}
              id="referee_mobile_12"
              name="referee_mobile_12"
              label="Contact No"
              value={referee_mobile_12}
              onChange={(phone) => setReferee_mobile_12(phone)}
              fullWidth
              style={{
                width: "100%",
                height: "50px",
              }}
              inputStyle={{
                width: "100%",
                height: "100%",
              }}
              autoComplete="referee_mobile_12"
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              helperText={
                (refereeMobile12Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (refereeMobileNumber12Error && (
                  <span style={{ color: "red" }}>
                    Please enter a valid mobile number (0XXXXXXXXX)
                  </span>
                ))
              }
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          7.2 Second Non-related Referee
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="referee_name_2"
              name="referee_name_2"
              label="Name"
              value={referee_name_2}
              onChange={(e) => setReferee_name_2(e.target.value)}
              fullWidth
              autoComplete="referee_name_2"
              //error={refereeName2Error}
              helperText={
                refereeName2Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
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
              id="referee_designation_2"
              name="referee_designation_2"
              label="Designation"
              value={referee_designation_2}
              onChange={(e) => setReferee_designation_2(e.target.value)}
              fullWidth
              autoComplete="referee_designation_2"
              //error={refereeDesignation2Error}
              helperText={
                refereeDesignation2Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
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
              id="referee_address_2"
              name="referee_address_2"
              label="Official Address"
              value={referee_address_2}
              onChange={(e) => setReferee_address_2(e.target.value)}
              fullWidth
              autoComplete="referee_address_2"
              //error={refereeAddress2Error}
              helperText={
                refereeAddress2Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
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
              id="email2"
              name="email"
              type="email"
              label="Contact Email Address"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              fullWidth
              autoComplete="email"
              helperText={
                (emailError2 && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (emailvalidateError2 && (
                  <span style={{ color: "red" }}>
                    Please enter a valid email address
                  </span>
                ))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              required
              country={"lk"}
              style={{
                width: "100%",
                height: "50px",
              }}
              inputStyle={{
                width: "100%",
                height: "100%",
              }}
              id="referee_mobile_2"
              name="referee_mobile_2"
              label="Contact No"
              value={referee_mobile_2}
              onChange={(phone) => setReferee_mobile_2(phone)}
              fullWidth
              autoComplete="referee_mobile_2"
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              helperText={
                (refereeMobile2Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (refereeMobileNumber2Error && (
                  <span style={{ color: "red" }}>
                    Please enter a valid mobile number (0XXXXXXXXX)
                  </span>
                ))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              required
              country={"lk"}
              style={{
                width: "100%",
                height: "50px",
              }}
              inputStyle={{
                width: "100%",
                height: "100%",
              }}
              id="referee_mobile_22"
              name="referee_mobile_22"
              label="Contact No"
              value={referee_mobile_22}
              onChange={(phone) => setReferee_mobile_22(phone)}
              fullWidth
              autoComplete="referee_mobile_22"
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              helperText={
                (refereeMobile22Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "14px" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (refereeMobileNumber22Error && (
                  <span style={{ color: "red" }}>
                    Please enter a valid mobile number (0XXXXXXXXX)
                  </span>
                ))
              }
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);

export default References;
