import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";


function DynamicForm({ formData }) {
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  useEffect(() => {
    // Generate initial values and validation schema based on formData
    const initialValuesObj = {};
    const validationSchemaObj = {};

    formData.forEach((field) => {
      initialValuesObj[field.label] = "";
      validationSchemaObj[field.label] = Yup.string().required(
        `${field.label} is required`
      );
      // You can add more validation rules based on field.type if needed
    });
    console.log(initialValuesObj, "this is initial values");
    console.log(validationSchemaObj, "this is validation schema");

    setInitialValues(initialValuesObj);
    setValidationSchema(Yup.object(validationSchemaObj));
  }, [formData]);



  return (
    <section className="min-h-screen bg-cover">
      <div className="mx-auto max-w-screen-xl  px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-2xl border my-20  lg:col-span-3 lg:p-12 fade-ef">
          {formData && <DynamicForm formData={formData} />}
          <form action="" className="space-y-4" onSubmit={handleSubmit}></form>
        </div>
      </div>
    </section>

    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={validationSchema}
    //   onSubmit={(values, { setSubmitting }) => {
    //     // Handle form submission here
    //     console.log(values);
    //     setSubmitting(false);
    //   }}
    // >
    //   {({ isSubmitting }) => (
    //     <Form>
    //       {formData.map((field, index) => (
    //         <div key={index}>
    //           <label htmlFor={field.label}>{field.label}</label>
    //           <Field
    //             type={field.type}
    //             name={field.label}
    //             className="form-control"
    //           />
    //           <ErrorMessage
    //             name={field.label}
    //             component="div"
    //             className="error"
    //           />
    //         </div>
    //       ))}
    //       <button type="submit" disabled={isSubmitting}>
    //         Submit
    //       </button>
    //     </Form>
    //   )}
    // </Formik>
  );
}

DynamicForm.propTypes = {
  formData: PropTypes.array.isRequired,
};

export default DynamicForm;
