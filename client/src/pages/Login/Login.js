import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Loading from "../../components/Loading";
import { useUpdate } from "../../utils/Context";


const Login = () => {
    //component state
    const {isAuthenticated, updateUser, updateAuth} = useUpdate()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    //handle manual form logins
    const manualLogin = async (event) => {
        setIsLoading((current) => !current)
        console.log("event", event)
        let body = {
            email: event.target[0].value,
            password: event.target[1].value
        }
        const manualUserVerified = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/login`, {
                body: body,
            }, {'X-Requested-With': 'XMLHttpRequest'}
        )
        console.log("manualUserVerified", manualUserVerified)

        if (manualUserVerified.data.error) {
            setIsLoading((current) => !current)
            setErrorMessage(manualUserVerified.data.error)
        }
        if (!("error" in manualUserVerified.data) && manualUserVerified.data !== null) {
            setIsLoading((current) => !current)
            updateUser(manualUserVerified)
            updateAuth(true)
            setIsLoading((current) => !current)
            navigate("/home")
        }
    }

    //handle google login
    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log("attempting to login")
            setIsLoading((current) => !current)
            const userVerified = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/google`, {
                    code: codeResponse.code,
                    withCredentials: true,
                }, 
                {headers: {"Access-Control-Allow-Origin": '*'}},
                {'X-Requested-With': 'XMLHttpRequest'});
            console.log("userVerified", userVerified)
            if (userVerified !== null) {
                updateUser(userVerified)
                updateAuth(true)
                setIsLoading((current) => !current)
                navigate("/home")
            }
            else {
                navigate("/")
            }
        },
        onError: errorResponse => console.log("sth went wrong", errorResponse),

    });


    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <div className="mt-24 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <script src="https://accounts.google.com/gsi/client" async></script>
            <div>
                <div>
                    <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
                        <a href="/">
                            <img
                                className="mx-auto h-13 w-auto"
                                src={logo}
                                alt="Your Company"
                            />
                        </a>
                    <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in
                    </h2>
                </div>

                <div>
                    {errorMessage && 
                        <h3 className="mt-10 text-center text-1xl font-semi-bold leading-9 tracking-tight text-white">{errorMessage}</h3>
                    }
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        // action={`${process.env.REACT_APP_API_URL}/auth/login`}
                        onSubmit={manualLogin}
                        >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-400 hover:bg-opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col items-center mt-5">
                        <button
                            type="button"
                            className="flex w-full justify-center items-center rounded-md bg-transparent hover:text-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white border-current shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                            Sign in with Google
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a
                            href="/signup"
                            className="font-semibold leading-6 text-white hover:text-orange-400">
                            Sign up
                        </a>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
}


export default Login;
