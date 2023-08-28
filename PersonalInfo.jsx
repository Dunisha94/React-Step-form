import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PersonalInfo = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const policeStations = [
      { station: "Colombo", value: 0 },
      { station: "Gampaha", value: 1 },
      { station: "Negambo", value: 2 },
      { station: "jaffna", value: 3 },
      { station: "Kandy", value: 4 },
      { station: "Galle", value: 5 },
      { station: "ja-ela", value: 6 },
      { station: "Ragama", value: 7 },
    ];
    const electorateOptions = [
      { station: "Colombo", value: 0 },
      { station: "Gampaha", value: 1 },
      { station: "Negambo", value: 2 },
      { station: "jaffna", value: 3 },
      { station: "Kandy", value: 4 },
      { station: "Galle", value: 5 },
      { station: "ja-ela", value: 6 },
      { station: "Ragama", value: 7 },
    ];
    const districtOptions = [
      { station: "Colombo", value: 0 },
      { station: "Gampaha", value: 1 },
      { station: "Negambo", value: 2 },
      { station: "jaffna", value: 3 },
      { station: "Kandy", value: 4 },
      { station: "Galle", value: 5 },
      { station: "ja-ela", value: 6 },
      { station: "Ragama", value: 7 },
    ];
    const gen = [
      { gender: "Male", value: 0 },
      { gender: "Female", value: 1 },
    ];

    const maritalStatus = [
      { status: "Single", value: 0 },
      { status: "Married", value: 1 },
    ];

    const [initial, setInitial] = useState(allData.initial || "");
    const [initial_name, setInitial_name] = useState(
      allData.initial_name || ""
    );
    const [permanent_address, setPermanent_address] = useState(
      allData.permanent_address || ""
    );
    const [contact_address, setContact_address] = useState(
      allData.contact_address || ""
    );
    const [mobile, setMobile] = useState(allData.mobile || "");
    const [mobile_2, setMobile_2] = useState(allData.mobile_2 || "");
    const [email, setEmail] = useState(allData.email || "");
    const [dob, setDob] = useState(allData.dob || null);
    const [selectedDate, setSelectedDate] = useState(
      allData.selectedDate || dob
    );
    const [age, setAge] = useState(allData.age || "");
    const [marital_status, setMarital_status] = React.useState(
      allData.marital_status || null
    );
    const [gender, setGender] = React.useState(allData.gender || null);

    const [nationality, setNationality] = useState(allData.nationality || "");
    const [nic_passport, setNic_passport] = useState(
      allData.nic_passport || ""
    );
    const [passport, setPassport] = useState(allData.passport || "");
    const [police_station, setPolice_station] = React.useState(
      allData.police_station || null
    );
    const [electorate, setElectorate] = React.useState(
      allData.electorate || null
    );
    const [district, setDistrict] = React.useState(allData.district || null);

    const [initialError, setInitialError] = useState(false);
    const [initial_nameError, setInitial_NameError] = useState(false);
    const [permanent_addressError, setPermanent_AddressError] = useState(false);
    const [contact_addressError, setContact_AddressError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [mobile_number1Error, setMobile_NumberError] = useState(false);
    const [mobile_2Error, setMobile_2Error] = useState(false);
    const [mobile_number2Error, setMobile_Number2Error] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailvalidateError, setEmailValidateError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [marital_statusError, setMarital_StatusError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [nationalityError, setNationalityError] = useState(false);
    const [nic_passportError, setNic_PassportError] = useState(false);
    const [police_stationError, setPolice_StationError] = useState(false);
    const [electorateError, setElectorateError] = useState(false);
    const [districtError, setDistrictError] = useState(false);

    const handleDateChange = (date) => {
      setSelectedDate(date);
      setDob(date);
      localStorage.setItem("dob", JSON.stringify(date));
      if (date) {
        const birthDate = new Date(date);
        const today = new Date();
        const ageInMilliseconds = today - birthDate;
        const ageInYears = Math.floor(
          ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
        );
        setAge(ageInYears.toString());
        localStorage.setItem("age", JSON.stringify(ageInYears.toString()));
      } else {
        setAge("");
      }
    };

    const MaritalStatusProps = {
      options: maritalStatus,
      getOptionLabel: (option) => option.status,
      getOptionValue: (option) => option.value,
    };
    const maritalstatusprops = {
      options: maritalStatus.map((option) => option.gender),
    };

    const GenderProps = {
      options: gen,
      getOptionLabel: (option) => option.gender,
      getOptionValue: (option) => option.value,
    };

    const genderprops = {
      options: gen.map((option) => option.value),
    };

    const PoliceStationsProps = {
      options: policeStations,
      getOptionLabel: (option) => option.station,
      getOptionValue: (option) => option.value,
    };
    const policestationsprops = {
      options: policeStations.map((option) => option.station),
    };

    const ElectorateProps = {
      options: electorateOptions,
      getOptionLabel: (option) => option.station,
      getOptionValue: (option) => option.value,
    };
    const electorateprops = {
      options: electorateOptions.map((option) => option.station),
    };

    const DistrictProps = {
      options: districtOptions,
      getOptionLabel: (option) => option.station,
      getOptionValue: (option) => option.value,
    };
    const districtprops = {
      options: districtOptions.map((option) => option.station),
    };

    const [activities, setActivities] = useState("");
    const [extracurricular_activities, setExtracurricular_activities] =
      useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const validate = () => {
      // const isValid =
      const formIsValid =
        initial &&
        initial.length > 0 &&
        initial_name &&
        initial_name.length > 0 &&
        permanent_address &&
        permanent_address.length > 0 &&
        contact_address &&
        contact_address.length > 0 &&
        mobile &&
        mobile.length > 0 &&
        mobile_2 &&
        mobile_2.length > 0 &&
        email &&
        email.length > 0 &&
        nationality &&
        nationality.length > 0 &&
        nic_passport &&
        nic_passport.length > 0 &&
        marital_status !== null &&
        gender !== null &&
        police_station !== null &&
        electorate !== null &&
        district !== null &&
        dob !== null;

      setIsFormValid(
        formIsValid &&
          !mobile_number1Error &&
          !mobile_number2Error &&
          !emailvalidateError
      );

      setInitialError(!initial || initial.length === 0);
      setInitial_NameError(!initial_name || initial_name.length === 0);
      setPermanent_AddressError(
        !permanent_address || permanent_address.length === 0
      );
      setContact_AddressError(!contact_address || contact_address.length === 0);
      setMobileError(!mobile || mobile.length === 0);
      setMobile_NumberError(
        !mobile || !/^0\d{9}$/.test(mobile) || mobile.length !== 10
      );
      setMobile_2Error(!mobile_2 || mobile_2.length === 0);
      setMobile_Number2Error(
        !mobile_2 || !/^0\d{9}$/.test(mobile_2) || mobile_2.length !== 10
      );
      setEmailError(!email || email.length === 0);
      setEmailValidateError(!email || !/\S+@\S+\.\S+/.test(email));
      setDobError(dob === null);

      setMarital_StatusError(!marital_status || marital_status.length === 0);
      setGenderError(!gender || gender.length === 0);
      setNationalityError(!nationality || nationality.length === 0);
      setNic_PassportError(!nic_passport || nic_passport.length === 0);
      setPolice_StationError(!police_station || police_station.length === 0);
      setElectorateError(!electorate || electorate.length === 0);
      setDistrictError(!district || district.length === 0);

      //return isValid;
      return (
        formIsValid &&
        !mobile_number1Error &&
        !mobile_number2Error &&
        !emailvalidateError
      );
    };

    useEffect(() => {
      const isValid = validate();
      onValidationChange(isValid);
    }, [
      initial,
      initial_name,
      permanent_address,
      contact_address,
      mobile,
      mobile_2,
      email,
      age,
      nationality,
      nic_passport,
      //passport,
      marital_status,
      gender,
      police_station,
      electorate,
      district,
      dob,
      dobError,
      onValidationChange,
      validate,
    ]);

    useImperativeHandle(ref, () => ({
      handleSave() {
        if (validate()) {
          const data = {
            initial,
            initial_name,
            permanent_address,
            contact_address,
            mobile,
            mobile_2,
            email,
            age,
            nationality,
            nic_passport,
            passport,
            marital_status,
            gender,
            police_station,
            electorate,
            district,
            dob,
          };

          saveData(data);
        }
      },
    }));
    const errorColor = "red";

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          2. Personal Info
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="initials"
              name="initials"
              label="Name with Initials (Mr/Mrs/Miss)"
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              fullWidth
              autoComplete="initials"
              helperText={
                initialError && (
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
              id="initial_name"
              name="initial_name"
              label="Names Denoted by Initials"
              value={initial_name}
              onChange={(e) => setInitial_name(e.target.value)}
              fullWidth
              autoComplete="initial_name"
              helperText={
                initial_nameError && (
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
              id="permanent_address"
              name="permanent_address"
              label="Address (Permanent Residence)"
              value={permanent_address}
              onChange={(e) => setPermanent_address(e.target.value)}
              fullWidth
              autoComplete="permanent_address"
              helperText={
                permanent_addressError && (
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
              id="contact_address"
              name="contact_address"
              label="Contact Address (If different from Permanent Residence)"
              value={contact_address}
              onChange={(e) => setContact_address(e.target.value)}
              fullWidth
              autoComplete="contact_address"
              helperText={
                contact_addressError && (
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
          {/* <Grid item xs={12} sm={6}>
            <TextField
              required
              id="mobile"
              name="mobile"
              label="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              fullWidth
              autoComplete="mobile"
              inputProps={{
                maxLength: 10,
              }}
              helperText={
                (mobileError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (mobile_number1Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    Please enter a valid mobile number (0XXXXXXXXX)
                  </Typography>
                ))
              }
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <PhoneInput
              required
              country={"lk"}
              id="mobile"
              name="mobile"
              label="Mobile"
              value={mobile}
              onChange={(phone) => setMobile(phone)}
              fullWidth
              style={{
                width: "100%",
                height: "50px",
              }}
              inputStyle={{
                width: "100%",
                height: "100%",
              }}
              autoComplete="mobile"
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              helperText={
                mobileError && (
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
            <PhoneInput
              required
              country={"lk"}
              id="mobile_2"
              name="mobile_2"
              label="Mobile (Home / Office)"
              value={mobile_2}
              onChange={(phone) => setMobile_2(phone)}
              fullWidth
              style={{
                width: "100%",
                height: "50px",
              }}
              inputStyle={{
                width: "100%",
                height: "100%",
              }}
              autoComplete="mobile_2"
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              id="mobile_2"
              name="mobile_2"
              label="Mobile (Home / Office)"
              value={mobile_2}
              onChange={(e) => setMobile_2(e.target.value)}
              fullWidth
              autoComplete="mobile_2"
              inputProps={{
                maxLength: 10,
              }}
              helperText={
                (mobile_2Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )) ||
                (mobile_number2Error && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    Please enter a valid mobile number (0XXXXXXXXX)
                  </Typography>
                ))
              }
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
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
              emailError && (
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
        </Grid> */}
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
                // (!emailError && !setEmailValidateError(email) && (
                //   <Typography
                //     variant="body2"
                //     color="error"
                //     component="span"
                //     style={{ color: errorColor, fontSize: "0.75rem" }}
                //   >
                //     We need a valid email address
                //   </Typography>
                // ))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker", "DatePicker"]}
              >
                <FormControl fullWidth>
                  <DatePicker
                    label="Date of Birth"
                    onChange={handleDateChange}
                    value={dob}
                    views={["year", "month", "day"]}
                    required
                  />
                  {dobError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </FormControl>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="age"
              name="age"
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              autoComplete="age"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              {...MaritalStatusProps}
              id="marital_status"
              required
              value={marital_status}
              onChange={(event, newValue) => {
                setMarital_status(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Marital Status" />
                  {marital_statusError && (
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
          <Grid item xs={12} sm={6}>
            <Autocomplete
              {...GenderProps}
              id="gender"
              required
              value={gender}
              onChange={(event, newValue) => {
                setGender(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Gender" />
                  {genderError && (
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nationality"
              name="nationality"
              label="Nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              fullWidth
              autoComplete="nationality"
              helperText={
                nationalityError && (
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
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="nic_passport"
              name="nic_passport"
              label="NIC/Passport Number"
              value={nic_passport}
              onChange={(e) => setNic_passport(e.target.value)}
              fullWidth
              autoComplete="nic-passport"
              helperText={
                nic_passportError && (
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
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="passport"
              name="passport"
              label="Passport Number"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              fullWidth
              autoComplete="passport"
              // helperText={
              //   nic_passportError && (
              //     <Typography
              //       variant="body2"
              //       color="error"
              //       component="span"
              //       style={{ color: errorColor, fontSize: "0.75rem" }}
              //     >
              //       This field is required
              //     </Typography>
              //   )
              // }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              {...PoliceStationsProps}
              id="police_station"
              required
              value={police_station}
              onChange={(event, newValue) => {
                setPolice_station(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Police Station" />
                  {police_stationError && (
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
          <Grid item xs={12} sm={6}>
            <Autocomplete
              {...ElectorateProps}
              id="electorate"
              required
              value={electorate}
              onChange={(event, newValue) => {
                setElectorate(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Electorate" />
                  {electorateError && (
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
          <Grid item xs={12} sm={6}>
            <Autocomplete
              {...DistrictProps}
              id="district"
              required
              value={district}
              onChange={(event, newValue) => {
                setDistrict(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="District" />
                  {districtError && (
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
      </React.Fragment>
    );
  }
);
export default PersonalInfo;
