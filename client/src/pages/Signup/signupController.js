import * as Yup from "yup"

export const formSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("Enter First Name"),
    lastName: Yup.string()
        .required("Enter Last Name"),
    username: Yup.string()
        .required("Enter username, you can change it later"),
    email: Yup.string()
        .email("Please enter valid email")
        .required("Email is required"),
    password: Yup.string()
      .required('Password is mandatory')
      .min(8, 'Password must be at least 8 char long'),
    confirmPassword: Yup.string()
      .required('Password is mandatory')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
})
  