import * as yup from 'yup';

export const eventBookFormValidation = yup.object().shape({
    eventName: yup.string().required('Event name is required'),
    
}) 