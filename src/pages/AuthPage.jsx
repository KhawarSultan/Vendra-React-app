import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import HCaptcha from "react-hcaptcha";

// import { GoogleLogin } from "react-google-login";

//   export const GoogleSignIn = () => {
//   const responseGoogle = (response) => {
//     console.log(response);
//   };

//   return (
//     <GoogleLogin
//       clientId="1079714799710-3mu5vcjsujbhcvkfl61tpnrhs6gpirr2.apps.googleusercontent.com"
//       buttonText="Sign in with Google"
//       onSuccess={responseGoogle}
//       onFailure={responseGoogle}
//       cookiePolicy="single_host_origin"
//     />
//   );
// };
const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [hCaptchaToken, setHCaptchaToken] = useState('');    // Determine the URL based on whether the user is logging in or registering

  const handleHCaptchaVerify = (token) => {
    // Callback function to handle the hCaptcha token
    console.log('hCaptcha sadsdas token:', token);
    setHCaptchaToken(token);
  };
  useEffect(() => {
    setHCaptchaToken(''); 
  }, [isRegistering]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const emailPattern = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/;
    const usernamePattern = /^[A-Za-z]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: emailPattern.test(value) ? "" : "Enter a valid email address",
        });
        break;
      case "username":
        setErrors({
          ...errors,
          username: usernamePattern.test(value)
            ? ""
            : "Username should contain only letters",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: passwordPattern.test(value)
            ? ""
            : "Password should contain at least 5 characters, letters, and numbers",
        });
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    console.log(submittedData);

    setFormData({
      username: "",
      email: "",
      password: "",
    });
    const { username, email, password } = formData;
    const url = isRegistering
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login-user";

    // Create the request body based on the action
    const requestBody = isRegistering
      ? JSON.stringify({ username, email, password, hCaptchaToken }) // Update field names here
      : JSON.stringify({ username, password: password, hCaptchaToken: hCaptchaToken }); // Update field names here
    console.log("isRegistering before fetch:", isRegistering);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Add other headers as needed
      },

      body: requestBody,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            isRegistering ? "Registration failed" : "Login failed"
          );
        }
      })
      .then((data) => {
        console.log("Server Response Data:", data);
        if (data.status.includes("ok") && !isRegistering) {
          Swal.fire("Successfully Login", "success");
          // Use localStorage.setItem() to store the token
          localStorage.setItem("token", data.data);
          localStorage.setItem("role", data.role);
          localStorage.setItem("loggedIn", true);
          if (data.role === "admin") {
            console.log("Redirecting to admin-account page...");
            window.location.href = "/admin-account";
          } else {
            // Redirect to a different page for non-admin users
            console.log("Redirecting to user-account page...");
            window.location.href = "/";
          }
        } else if (isRegistering && data.status.includes("ok")) {
          // Handle successful registration here
          Swal.fire("Successfully Registered", "success");
        } else {
          alert("Login or Registration Failed");
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'SSS verification failed!',
          });
          // Handle cases where login or registration fails
        }
      })

      .catch((error) => {
        console.error(error);
        // Handle the error and display an error message to the user
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'hCaptcha verification failed!',
        });
      });
  };


  





  
  return (
    <div className="flex justify-center items-center  md:py-24 py-10 md:w-[35%] w-11/12 m-auto">
      <form
        onSubmit={handleSubmit}
        className="md:border border-yellow-500 rounded-lg  w-full  md:py-16 py-10    md:px-12 px-5"
      >


        <p className="text-center text-gray-500  text-sm mb-10 select-none ">
          <span className="font-extrabold  gap-1 bg-slate-100 md:border border-yellow-500 px-[6px] pt-[18px] pb-[16px] rounded-full ">
            <span>
              <span
                className={`text-lg cursor-pointer  px-4 py-2 ${isRegistering
                  ? "text-gray-900 bg-slate-200 md:border rounded-full px-3 py-1"
                  : "text-gray-500"
                  }`}
                onClick={() => setIsRegistering(true)}
              >
                Register
              </span>
            </span>
            <span>
              <span
                className={`text-lg cursor-pointer  px-4 py-2 ${isRegistering
                  ? "text-gray-500"
                  : "text-gray-900 bg-slate-200 md:border rounded-full px-3 py-1"
                  }`}
                onClick={() => setIsRegistering(false)}
              >
                Sign in
              </span>
            </span>
          </span>
        </p>
        {isRegistering ? (
          <>
            <div className="mb-5">
              {errors.username && <p className="text-red-500 text-s">{errors.username}</p>}
              <label
                className="block text-gray-700 text-sm mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3  focus:border-yellow-500 focus:border  outline-none"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div className="mb-5">
              {errors.email && <p className="text-red-500 text-s">{errors.email}</p>}
              <label
                className="block text-gray-700 text-sm  mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3  focus:border-yellow-500 focus:border  outline-none"

                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
            </div>
            <div className="mb-7">
              {errors.password && <p className="text-red-500 text-s">{errors.password}</p>}
              <label
                className="block text-gray-700 text-sm  mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" text-xs appearance-none border rounded w-full py-3 px-3  focus:border-yellow-500 focus:border  outline-none"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>
          </>
        ) : (
          <>
            <div className="mb-5 ">

              <label
                className="block text-gray-700 text-sm  mb-1"
                htmlFor="login-username-email"
              >
                Username or Email Address
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3  focus:border-yellow-500 focus:border  outline-none"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username or Email Address"
              />
            </div>
            <div className="mb-7">
              <label
                className="block text-gray-700 text-sm  mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" text-xs appearance-none border rounded w-full py-3 px-3  focus:border-yellow-500 focus:border  outline-none"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

          </>
        )}
        {/* <div className="mb-4 w-full">
          <HCaptcha
            sitekey="fe5c1dc3-8d54-4667-b450-1a035da75880"
            onVerify={handleHCaptchaVerify}
            size="normal"
          />
        </div> */}
        
        {/* <div className="mb-7">
          <GoogleSignIn />
        </div> */}
        {/* Registration */}
        {isRegistering ? (
          <div>
            <p className="leading-5 mb-7 text-xs text-gray-600">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className=" cursor-pointer underline">privacy policy</span>{" "}.
            </p>

            <button
              className="  w-full bg-yellow-500  font-bold   py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="mb-3">
            <label className="block text-gray-500 font-bold   mb-2">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                name="rememberMe"
                required
                onChange={handleChange}
              />
              <span className="text-sm">Remember me</span>
            </label>
            <button
              className=" mb-3 w-full bg-yellow-500 font-bold   py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <p className=" text-gray-500 ">
              <a className="text-blue-500" href="#">
                Lost your password?
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthPage;
