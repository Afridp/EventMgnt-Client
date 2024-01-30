import * as yup from 'yup';

// const matchPass = /^\+(?:[0-9] ?){6,14}[0-9]$/;

// const  eventBookFormValidation 
export const eventEditFormValidation = yup.object().shape({

  guestRequirement: yup.string().required('Guest requirement is required'),
  cateringNeeds: yup.string().oneOf(['yes', 'no']).required('Please select catering needs'),
  eventName: yup.string().required('Event name is required'),
  eventCategory: yup.string().required('Event category is required'),
  venueName: yup.string().required('Venue name is required'),
  venueType: yup.string().required('Venue type is required'),
  // venueLocation: yup.string().required('Venue location is required'),
  noofGuests: yup.number().required('Number of guests is required').min(1,"minimum nuber should be 1"),
  numberOfServices: yup.number().notRequired('Number of services is required'),
  foodPreference: yup
    .string()
    .oneOf(["yes", "no"])
    .required("Please indicate whether you have food preferences."),
  cuisines: yup
    .string(),
    
    // .when("foodPreference", {
    //   is: "yes",
    //   then: yup.string().required("Please specify your preferred cuisines."),
    // }),
  desiredEntertainment: yup
    .string()
    .required("Please select your desired entertainment."),
  // Schema
  entertainer: yup
    .string(),
    // .when("desiredEntertainment", {
    //   is: (value) => ["Live Music", "DJ"].includes(value),  // Check if value is one of the specified strings
    //   then: yup.string().required("Please specify the desired entertainer."),
    //   otherwise: yup.string().notRequired(),
    // }),

  eventTheme: yup
    .string()
    .required("Please select a theme for the event."),
  otherTheme: yup
    .string(),
    // .when("eventTheme", {
    //   is: "others",
    //   then: yup.string().required("Please specify the other theme."),
    // }),
  themeImage: yup
    .mixed()
    .test('fileType', 'Invalid file type', (value) => {
      if (value) {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(value.type);
      }
      return true; // Allow empty file (no file selected)
    })
    .test('fileSize', 'File size is too large', (value) => {
      if (value) {
        return value.size <= 200 * 1024 * 1024; // 200MB in bytes
      }
      return true; // Allow empty file (no file selected)
    }),
    audioVisual: yup
    .string()
    .nullable()
    .required("Please indicate whether audio/visual equipment is needed."),
  techSupport: yup
    .string()
    .nullable()
    .required("Please indicate whether tech support is needed."),
  additionalRequirement: yup.string(),
  name: yup
    .string()
    .required("Please enter your name.")
    .min(3, "Name must be at least 3 characters long."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter a valid phone number.")
    .required("Please enter your phone number."),
  alternativePhoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter a valid alternative phone number.")
    .required("Please enter your alternative phone number."),
});

// export default eventBookFormValidation;

