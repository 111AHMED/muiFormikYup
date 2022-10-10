import React from 'react'
import {
  Box,
  Button,
  Card,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import FlexBox from './FlexBox'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'

import * as Yup from 'yup'
import typeOfSelceted from '../data/typeOfSelceted'

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
const Builder = () => {
  const initialValues = {
    questionTitle: '',
    isRequired: false,
    type: null,
    choises: ['Choix 1'],
  }
  const validationSchema = Yup.object().shape({
    questionTitle: Yup.string().required('Questions Title is required'),
    type: Yup.mixed().required('Type is required'),
    choises: Yup.array(Yup.string().required('IS REQUIRED')).min(1),
  })
  const handleFormSubmit = async (values) => {
    console.log(values)
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
    }, 500)
  }
  return (
    <Box py={4}>
      <h3 mb={4}></h3>
      <Card
        sx={{
          p: 1,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
              <Box mb={2}>
                <Grid container spacing={3}>
                  <Grid item md={4} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      name="questionTitle"
                      label="Question"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.questionTitle}
                      error={!!touched.questionTitle && !!errors.questionTitle}
                      helperText={touched.questionTitle && errors.questionTitle}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      options={typeOfSelceted}
                      value={values.type}
                      getOptionLabel={(option) => option.label}
                      onChange={(_, value) => setFieldValue('type', value)}
                      renderInput={(params) => (
                        <TextField
                          color="info"
                          label="Type Of choice"
                          variant="outlined"
                          placeholder="Select Type"
                          error={!!touched.type && !!errors.type}
                          helperText={touched.type && errors.type}
                          {...params}
                          size="medium"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      className="isRequired"
                      name="isRequired"
                      onChange={handleChange}
                      control={
                        <Checkbox
                          size="small"
                          color="secondary"
                          checked={values.isRequired || false}
                        />
                      }
                      label={
                        <FlexBox
                          flexWrap="wrap"
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          Required
                          <h3
                          //ml={1}
                          //borderBottom="1px solid"
                          //borderColor="grey.900"
                          ></h3>
                        </FlexBox>
                      }
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <FieldArray
                      name="choises"
                      render={(arrayHelpers) => (
                        <div>
                          {values.choises && values.choises.length > 0 ? (
                            values.choises.map((choise, index) => (
                              <div
                                key={index}
                                className="list-group list-group-flush"
                              >
                                <h4>Choice :</h4>
                                <Field name={`choises.${index}`} />

                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </button>

                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                >
                                  +
                                </button>
                                <Box sx={{ m: 4 }}>{}</Box>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push('')}
                            >
                              {/* show this when user has removed all choises from the list */}
                              Add a Choice
                            </button>
                          )}
                          <div>
                            {/* <ErrorMessage
                              name="choises"
                              component="div"
                              className="invalid-feedback"
                            /> */}
                            <Box sx={{ m: 4 }}>{}</Box>
                            <Button
                              type="submit"
                              variant="contained"
                              color="info"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  )
}
export default Builder
