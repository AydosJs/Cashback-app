import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthPayload, getCode } from "../../api/authApi";
import { useContext } from "react";
import { RegisterContext } from "../../providers/ResigterProvider";

export const RegisterContainer = () => {
  const navigate = useNavigate();
  const { setPayload } = useContext<any>(RegisterContext);

  const formik = useFormik<AuthPayload>({
    initialValues: {
      phoneNumber: ""
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(
          /^\d{3} \d{2} \d{3} \d{2} \d{2}/,
          "Wrong phone format! (998 00 000 00 00)"
        )
        .required("Required")
    }),
    onSubmit: async (values: any) => {
      try {
        const data = {
          ...values,
          phoneNumber: values?.phoneNumber.replace(/\s+/g, "")
        };
        setPayload({ phoneNumber: values?.phoneNumber.replace(/\s+/g, "") });
        await getCode(data);
        navigate("/register/code");
      } catch (e) {
        console.log("Error get code", e);
      }
    }
  });

  return (
    <div className="flex w-full justify-center items-center min-h-screen xm:p-10">
      <form className="flex flex-col space-y-6 rounded  md:p-12" onSubmit={formik.handleSubmit}>

        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>

        <div className="text-left">
          {/* <label id="remember_me" className="block text-md mb-2 leading-5 text-gray-900">
          </label> */}
          <label className="mr-4 text-gray-700 font-semibold inline-block mb-2" htmlFor="phone_number">
            Phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            aria-label='remember_me'
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className="form-control block  w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="998 00 000 00 00"
          />
          {Boolean(formik.touched.phoneNumber) && (
            <p className="text-red-500">{formik.errors.phoneNumber}</p>
          )}
        </div>

        <div className="">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700  p-2 rounded w-full font-medium text-white"
          >
            GET CODE
          </button>
        </div>

      </form>
    </div>
  );
};
