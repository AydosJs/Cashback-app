import React from 'react'
import { useFormik } from "formik";
import { useContext, useState } from "react";
import Countdown from "react-countdown";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { AuthPayload, getCode } from "../../api/authApi";
import { RegisterContext } from "../../Providers/ResigterProvider";
import { AuthContext } from "../../Providers/AuthProvider";

export const RegisterCode = () => {
  const { register } = useContext<any>(AuthContext);

  const { payload, setPayload } = useContext<any>(RegisterContext);

  const getCodeAgain = async () => {
    await getCode(payload);
  };

  const onSubmit = (values: any) => {
    const data = {
      ...payload,
      code: values.code
      // phoneNumber: values.phoneNumber.replace(/\s/g, "")
    };
    console.log("values", values, payload);
    setPayload({ ...payload, code: values.code });
    register(data);
  };

  const formik = useFormik<AuthPayload>({
    initialValues: {
      phoneNumber: "",
      code: ""
    },
    validationSchema: Yup.object({
      code: Yup.string().min(4).max(4).required("Required")
    }),
    onSubmit
  });

  const [timerNow, setTimerNow] = useState(Date.now());
  const timer = 120000;


  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return (
        <button
          type="reset"
          onClick={() => {
            setTimerNow(Date.now()), getCodeAgain();
          }}
          className="border border-black p-2 rounded w-full font-medium"
        >
          Get the code again
        </button>
      );
    } else {
      // Render a countdown
      return (
        <div className="text-sm text-gray-700">
          <div className='mb-6'>
            <p>
              You can get the code again after{" "}
              <span className="font-bold text-black">
                {minutes}:{seconds}
              </span>{" "}
              min
            </p>
          </div>

          <button
            type="submit"
            className="mb-2 bg-blue-600 p-2 rounded w-full font-medium text-white"
          >
            Submit
          </button>

        </div>
      );
    }
  };

  if (payload.phoneNumber === "") {
    console.log("payload", payload, typeof payload.phoneNumber);
    return <Navigate to={"/register"} />;
  }

  return (
    <div
      className="flex w-full justify-center items-center min-h-screen xm:p-10"
    >
      <form className="flex flex-col space-y-6 rounded p-8 md:p-12" onSubmit={formik.handleSubmit}>
        <h2 className="mb-12 text-center text-5xl font-extrabold">
          Get the code
        </h2>


        <div className="text-left">
          <input
            type="text"
            id="code"
            name="code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
            className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Code"
          />
          {Boolean(formik.touched.code) && (
            <p className="text-red-500">{formik.errors.code}</p>
          )}
        </div>

        <div className="">
          <Countdown
            key={timerNow}
            date={timerNow + timer}
            renderer={renderer}
          />
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:underline"
          >
            Change phone number ({payload.phoneNumber})
          </Link>
        </div>

      </form>
    </div>
  );
};
