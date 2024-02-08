// import * as yup from 'yup';

// export const eventBookFormValidation = yup.object().shape({
//     startDate: yup.date().required('From Date is required'),
//     endDate: yup.date().required('To Date is required'),
//     guestRequirement: yup.string().required('Guest requirement is required'),
//     cateringNeeds: yup.string().oneOf(['yes', 'no']).required('Please select catering needs'),
//     eventName: yup.string().required('Event name is required'),
//     eventCategory: yup.string().required('Event category is required'),
//     venueName: yup.string().required('Venue name is required'),
//     venueType: yup.string().required('Venue type is required'),
//     venueLocation: yup.string().required('Venue location is required'),
//     noofGuests: yup.number().required('Number of guests is required'),
//     numberOfServices: yup.number().required('Number of services is required'),
//     foodPrefrence : yup.string().oneOf(['yes', 'no']),
//     cuisines : yup.string(),
//     desiredEntertainment : yup.string(),
//     entertainer:yup.string(),
//     eventTheme : yup.string(),
//     otherTheme:yup.string(),
//     themeImage: yup.string(),
//     audioVisual : yup.string().oneOf(['yes', 'no']),
//     techSupport : yup.string().oneOf(['yes', 'no']),
//     additionalRequirement : yup.string(),
//   });


// import * as yup from 'yup';

// const matchPass = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

// export const eventBookFormValidation = 
// yup.object().shape({
//   startDate: yup
//     .date()
//     .min(new Date(), "Start date cannot be before today.")
//     .required('Please select a start date for the event.')
//     .typeError('Start date must be a valid date.'),
//   // .lessThan(
//   //   'endDate',
//   //   'Start date cannot be later than the end date.'
//   // ),
//   endDate: yup
//     .date()
//     .min(new Date(), 'End date cannot be before today.')
//     .required('Please select an end date for the event.')
//     .typeError('End date must be a valid date.'),

//   // .moreThan(
//   //   'startDate',
//   //   'End date cannot be earlier than the start date.'
//   // ),
//   guestRequirement: yup
//     .string()
//     .required('Please provide information about guest requirements.'),
//   cateringNeeds: yup
//     .string()
//     .oneOf(['yes', 'no'])
//     .required('Please indicate whether catering is needed.'),
//   eventName: yup
//     .string()
//     .required('Please enter a name for the event.')
//     .min(3, 'Event name must be at least 3 characters long.'),
//   eventCategory: yup
//     .string()
//     .required('Please select a category for the event.'),
//   venueName: yup
//     .string()
//     .required('Please enter the name of the venue.'),
//   venueType: yup
//     .string()
//     .required('Please select the type of venue.'),
//   venueLocation: yup
//     .string()
//     .required('Please enter the location of the venue.'),
//   noofGuests: yup
//     .number()
//     .required('Please enter the number of guests expected.')
//     .min(1, 'Number of guests must be at least 1.'),
//   numberOfServices: yup
//     .number()
//     .required('Please enter the number of services required.')
//     .min(1, 'Number of services must be at least 1.'),
//   foodPrefrence: yup
//     .string()
//     .oneOf(['yes', 'no'])
//     .required('Please indicate whether you have food preferences.'),
//   cuisines: yup
//     .string()
//     .when('foodPrefrence', {
//       is: 'yes',
//       then: yup.string().required('Please specify your preferred cuisines.'),
//     }),
//   desiredEntertainment: yup
//     .string()
//     .min(1, "Please specify your desired entertainment."),

//   entertainer: yup
//     .string()
//     .notRequired(),


//   eventTheme: yup
//     .string()
//     .required('Please select a theme for the event.'),

//   otherTheme: yup
//     .string()
//     .when('eventTheme', {
//       is: 'others',
//       then: yup.string().required('Please specify the other theme.'),
//     }),
//   themeImage: yup.string(), // Consider adding validation for image format
//   audioVisual: yup
//     .string()
//     .oneOf(['yes', 'no'])
//     .required('Please indicate whether audio/visual equipment is needed.'),
//   techSupport: yup
//     .string()
//     .oneOf(['yes', 'no'])
//     .required('Please indicate whether tech support is needed.'),
//   additionalRequirement: yup.string(),
//   name: yup
//     .string()
//     .required("Please enter your name.")
//     .min(3, "Name must be at least 3 characters long."),
//   email: yup
//     .string()
//     .email("Please enter a valid email address.")
//     .required("Please enter your email address."),
//   phoneNumber: yup
//     .string()
//     .matches(
//       matchPass,
//       "Please enter a valid phone number."
//     )

//     .required("Please enter your phone number."),
//   alternativePhoneNumber: yup
//     .string()
//     .matches(matchPass, "Please enter a valid alternative phone number.")
//     .required("Please enter your alternative phone number."),

// });


// yup.object().shape({
//   startDate: yup
//     .date()
//     .min(new Date(), "Start date cannot be before today.")
//     .required("Please select a start date for the event.")
//     .typeError("Start date must be a valid date."),
//   endDate: yup
//     .date()
//     .min(new Date(), "End date cannot be before today.")
//     .required("Please select an end date for the event.")
//     .typeError("End date must be a valid date."),
//     // .moreThan(yup.ref("startDate"), "End date cannot be earlier than the start date."),
//   guestRequirement: yup
//     .string()
//     .required("Please provide information about guest requirements."),
//   cateringNeeds: yup
//     .string()
//     .oneOf(["yes", "no"])
//     .required("Please indicate whether catering is needed."),
//   eventName: yup
//     .string()
//     .required("Please enter a name for the event.")
//     .min(3, "Event name must be at least 3 characters long."),
//   eventCategory: yup
//     .string()
//     .required("Please select a category for the event."),
//   venueName: yup
//     .string()
//     .required("Please enter the name of the venue."),
//   venueType: yup
//     .string()
//     .required("Please select the type of venue."),
//   venueLocation: yup
//     .string()
//     .required("Please enter the location of the venue."),
//   noofGuests: yup
//     .number()
//     .required("Please enter the number of guests expected.")
//     .min(1, "Number of guests must be at least 1."),
//   numberOfServices: yup
//     .number()
//     .required("Please enter the number of services required.")
//     .min(1, "Number of services must be at least 1."),
//   foodPrefrence: yup
//     .string()
//     .oneOf(["yes", "no"])
//     .required("Please indicate whether you have food preferences."),
//   cuisines: yup
//     .string()
//     .when("foodPrefrence", {
//       is: "yes",
//       then: yup.string().required("Please specify your preferred cuisines."),
//     }),
//   desiredEntertainment: yup
//     .string()
//     .required("Please select your desired entertainment"),
//     // .oneOf(["Live Music", "DJ", "Dance Performance", "Activities", "Performers", "Speakers", "Other"])
//     // .when("desiredEntertainment", {
//     //   is: "Other",
//     //   then: yup.string().min(1, "Please specify your desired entertainment."),
//     // }),
//   entertainer: yup
//     .string()
//     .notRequired(),
//     // .when("desiredEntertainment", {
//     //   is: (value) => ["Live Music", "DJ"].includes(value),
//     //   then: yup.string().min(1, "Please specify the desired entertainer."),
//     //   otherwise: yup.string().notRequired(),
//     // }),
//   eventTheme: yup
//     .string()
//     .required("Please select a theme for the event."),
//   otherTheme: yup
//     .string()
//     .when("eventTheme", {
//       is: "others",
//       then: yup.string().required("Please specify the other theme."),
//     }),
//   themeImage: yup
//     .string()
//     .test('fileType', 'Invalid file type', (value) => {
//       // Assuming you want to allow only certain image file types (e.g., JPEG, PNG)
//       if (value) {
//           const allowedTypes = ['image/jpeg', 'image/png'];
//           return allowedTypes.includes(value.type);
//       }
//       return true; // Allow empty file (no file selected)
//   }).
//       test('fileSize', 'File size is too large', (value) => {

//       // Assuming you want to limit the file size to 5MB
//       if (value) {
//           return value.size <= 200 * 1024 * 1024; // 5MB in bytes
//       }
//       return true; // Allow empty file (no file selected)
//   }),
//   audioVisual: yup
//     .string()
//     .oneOf(["yes", "no"])
//     .required("Please indicate whether audio/visual equipment is needed."),
//   techSupport: yup
//     .string()
//     .oneOf(["yes", "no"])
//     .required("Please indicate whether tech support is needed."),
//   additionalRequirement: yup.string(),
//   name: yup
//     .string()
//     .required("Please enter your name.")
//     .min(3, "Name must be at least 3 characters long."),
//   email: yup
//     .string()
//     .email("Please enter a valid email address.")
//     .required("Please enter your email address."),
//   phoneNumber: yup
//     .string()
//     .matches(matchPass, "Please enter a valid phone number.")
//     .required("Please enter your phone number."),
//   alternativePhoneNumber: yup
//     .string()
//     .matches(matchPass, "Please enter a valid alternative phone number")
//     .required("Please enter your alternative phone nuber")

// });


import * as yup from 'yup';

// const matchPass = /^\+(?:[0-9] ?){6,14}[0-9]$/;

// const  eventBookFormValidation 
export const eventBookFormValidation = yup.object().shape({
  startDate: yup.date().required('From Date is required'),
  endDate: yup
    .date()
    .required('To Date is required')
    .when('startDate', (startDate, schema) => {
      return startDate
        ? schema.min(startDate, 'To Date must be equal or after From Date')
        : schema;
    })
  ,
  guestRequirement: yup.string().required('Guest requirement is required'),
  cateringNeeds: yup.string().oneOf(['yes', 'no']).required('Please select catering needs'),
  eventName: yup.string().required('Event name is required'),
  eventCategory: yup.string().required('Event category is required'),
  venueName: yup.string().required('Venue name is required'),
  venueType: yup.string().required('Venue type is required'),
  // venueLocation: yup.string().required('Venue location is required'),
  noofGuests: yup.number().required('Number of guests is required').min(1, "minimum nuber should be 1"),
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
    .oneOf(["yes", "no"])
    .required("Please indicate whether audio/visual equipment is needed."),
  techSupport: yup
    .string()
    .oneOf(["yes", "no"])
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

