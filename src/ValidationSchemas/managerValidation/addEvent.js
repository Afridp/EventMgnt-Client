import * as Yup from 'yup';

export const addEventValidation = Yup.object().shape({
    _id: Yup.string(),
    eventName: Yup.string().required('Event Name is required'),
    eventDescription: Yup.string().required('Event Description is required'),
    image: Yup.mixed()
        // .required('Image is required')
        .test('fileType', 'Invalid file type', (value) => {
            // Assuming you want to allow only certain image file types (e.g., JPEG, PNG)
            if (value) {
                const allowedTypes = ['image/jpeg', 'image/png'];
                return allowedTypes.includes(value.type);
            }
            return true; // Allow empty file (no file selected)
        }).
            test('fileSize', 'File size is too large', (value) => {

            // Assuming you want to limit the file size to 5MB
            if (value) {
                return value.size <= 200 * 1024 * 1024; // 5MB in bytes
            }
            return true; // Allow empty file (no file selected)
        }),
    // imageBlob: Yup.string()
});

    
