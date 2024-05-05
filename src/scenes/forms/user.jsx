import { Box, Button, TextField, FormControlLabel, Switch } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import { Fetcher } from "../../utils"

import 'react-toastify/dist/ReactToastify.css';

const UserForm = () => {
  const [oldUser, setOldUser] = useState({
    userName: "",
    email: "",
    gender: "",
    password: "",
    isVerified: false,
    isAdmin: false,
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = localStorage.getItem('token');
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      new Fetcher()
        .readUser(userId, token)
        .then((response) => {
          if (response.status === 'success') {
            setOldUser({
              userName: response.user.userName,
              email: response.user.email,
              gender: response.user.gender,
              password: response.user.password,
              isVerified: response.user.isVerified,
              isAdmin: response.user.isAdmin
            });
            
          }
        });
    }
  }, [userId, token]);

  const handleFormSubmit = async (values) => {
    if (userId) {
      const response = await new Fetcher()
      .updateUser(userId, values, token)
      if (response.status === 'success') window.location.href = '/admin/users'
      else toast.error('Failed to create user!')
    } else {
      const response = await new Fetcher()
      .createUser(values, token)
  
      if (response.status === 'success') window.location.href = '/admin/users'
      else toast.error('Failed to create user!')
    }
  };

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            // color: 'blue', // Change to your desired color
          },
        },
      },
    },
  });

  return (
    <Box m="20px">
      <ToastContainer />
      <Header title="CREATE USER" subtitle="Create a New User" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={ oldUser }
        validationSchema={checkoutSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <ThemeProvider theme={theme}>
                <FormControlLabel
                  sx={{ gridColumn: "span 2" }}
                  control={
                    <Switch
                      name="isVerified"
                      checked={values.isVerified} // Use checked prop instead of value
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                  }
                  label="Verified"
                />

                <FormControlLabel
                  sx={{ gridColumn: "span 2" }}
                  control={
                    <Switch
                      name="isAdmin"
                      checked={values.isAdmin} // Use checked prop instead of value
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                  }
                  label="Admin"
                />
              </ThemeProvider>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                { userId ? 'UPDATE USER' : 'CREATE NEW USER' }
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  userName: yup.string().required("required"),
  gender: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  userName:  "zzzzz",
  email: "",
  gender: "",
  password: "",
  isVerified: false,
  isAdmin: false,
};

export default UserForm;
