import React from 'react'

const SignupBusiness = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-10 w-auto"
                src={logo}
                alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">
                Create Account
            </h2>
        </div>
        {/* <div className="mx-auto h-10 w-auto">
            {isLoading && 
                <Loading />
            }
        </div> */}
        <div>
            {errorMessage && 
                <h3 className="mt-10 text-center text-1xl font-semi-bold leading-9 tracking-tight text-blue-900">{errorMessage}</h3>
            }
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
                className="space-y-6"
                onSubmit={handleSubmit(manualSignUp)}
            >
                <div>
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-blue-900">
                        First Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="firstName"
                            name="firstName"
                            {...register("firstName")}
                            type="text"
                            autoComplete="First Name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-blue-900">
                        Last Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="lastName"
                            name="lastName"
                            {...register("lastName")}
                            type="text"
                            autoComplete="Last Name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-blue-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            {...register("username")}
                            type="text"
                            autoComplete="username"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-blue-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            {...register("email")}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-blue-900">
                            Password
                        </label>
                    </div>
                    <div className="mt-2 form-group">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            {...register("password")}
                            autoComplete="current-password"
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-control ${errors.password ? 'is-invalid' : ''}`}
                            // className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-blue-900">
                            Confirm Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                            autoComplete="confirmPassword"
                            className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-700 to-pink-600 hover:bg-gradient-to-bl px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign up
                    </button>
                </div>
            </form>
            <div className="flex flex-col items-center mt-5">
                <button
                    type="button"
                    // class="flex w-full justify-center items-center rounded-md bg-[#4285F4] hover:bg-[#4285F4]/90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    className="flex w-full justify-center items-center rounded-md bg-transparent hover:bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-900 border-current shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => login()}
                    >
                    <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19">
                        <path
                            fillRule="evenodd"
                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Sign up with Google
                </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <a
                    href="/"
                    className="font-semibold leading-6 text-blue-900 hover:text-pink-500">
                    Login
                </a>
            </p>
        </div>
    </div>
    )
}

export default SignupBusiness