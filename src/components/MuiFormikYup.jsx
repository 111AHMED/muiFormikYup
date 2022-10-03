import {
  Box,
  Button,
  Card,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import countryList from '../data/countryList'
import { Formik } from 'formik'
import FlexBox from './FlexBox'

import * as yup from 'yup' // upload button

const accountSchema = yup.object().shape({
  city: yup.string().required('City is required'),
  country: yup.mixed().required('Country is required'),
  contact: yup.string().required('Contact is required'),
  last_name: yup.string().required('Last name is required'),
  first_name: yup.string().required('First name is required'),
  email: yup.string().email('Invalid Email').required('Email is required'),
  agreement: yup
    .boolean()
    .test(
      'agreement',
      'Vous devez accepter nos termes et conditions !',
      (value) => value === true,
    )
    .required('Vous devez accepter nos termes et conditions !'),
}) // =============================================================================

// =============================================================================

export default function MuiFormikYup() {
  const initialValues = {
    city: '',
    email: '',
    contact: '',
    country: null,
    last_name: '',
    first_name: '',
    agreement: false,
  }

  const handleFormSubmit = async (values) => {
    console.log(values)
  }

  return (
    <Box py={4}>
      <h3 mb={2}>Account Setting</h3>

      <Card
        sx={{
          p: 4,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={accountSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      name="first_name"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      error={!!touched.first_name && !!errors.first_name}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      name="last_name"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      error={!!touched.last_name && !!errors.last_name}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      name="email"
                      type="email"
                      label="Email"
                      size="medium"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="tel"
                      color="info"
                      size="medium"
                      name="contact"
                      label="Phone"
                      onBlur={handleBlur}
                      value={values.contact}
                      onChange={handleChange}
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      options={countryList}
                      value={values.country}
                      getOptionLabel={(option) => option.label}
                      onChange={(_, value) => setFieldValue('country', value)}
                      renderInput={(params) => (
                        <TextField
                          color="info"
                          label="Country"
                          variant="outlined"
                          placeholder="Select Country"
                          error={!!touched.country && !!errors.country}
                          helperText={touched.country && errors.country}
                          {...params}
                          size="medium"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="city"
                      label="City"
                      color="info"
                      size="medium"
                      onBlur={handleBlur}
                      value={values.city}
                      onChange={handleChange}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControlLabel
                      className="agreement"
                      name="agreement"
                      onChange={handleChange}
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          checked={values.agreement || false}
                        />
                      }
                      label={
                        <FlexBox
                          flexWrap="wrap"
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          En vous inscrivant, vous acceptez de
                          <a href="/" target="_blank" rel="noreferrer noopener">
                            <h3
                            //ml={1}
                            //borderBottom="1px solid"
                            //borderColor="grey.900"
                            >
                              Termes et conditions
                            </h3>
                          </a>
                        </FlexBox>
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="info"
                disabled={!values.agreement}
              >
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  )
}
