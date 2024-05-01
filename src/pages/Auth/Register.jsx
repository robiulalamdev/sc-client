import { Link, useNavigate, useParams } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useMemo, useRef, useState } from "react";
import loading from "../../assets/loading.svg";
import logo from "../../assets/new-creating.svg";
import Swal from "sweetalert2";
import { useVerifyInviteTokenMutation } from "../../features/helpers/helpersApi";

const Register = () => {
  const { token } = useParams();
  const [register, { isLoading }] = useRegisterMutation();
  const [verifyInviteToken] = useVerifyInviteTokenMutation();

  const [registering, setRegistering] = useState(false);
  const [permit, setPermit] = useState(true);

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const roleRef = useRef(null);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z\d!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    const data = {
      name,
      email,
      password,
      role,
    };
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one uppercase, one lowercase, one special character, one digit and it should be at least 8 characters long.",
      });
      setRegistering(false);
      return;
    }
    try {
      const res = await register(data);

      if (res?.error?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.error}`,
        });
      }
      if (res?.error?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.error?.data?.message}`,
        });
      }
      if (res?.data?.success) {
        const from =
          res.data.user.role === "USER"
            ? "/user"
            : res.data.user.role === "EDITOR"
            ? "/editor"
            : "/admin/internal-users";
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
    } finally {
      setRegistering(false);
    }
  };

  const handleVerifyToken = async () => {
    const result = await verifyInviteToken({ token: token });
    if (result?.data?.success && result?.data?.data?.email) {
      emailRef.current.value = result.data.data.email;
      emailRef.current.disabled = true;
      emailRef.current.readonly = true;
      roleRef.current.value = result?.data?.data?.role;
      roleRef.current.disabled = true;
      roleRef.current.readonly = true;
    } else if (result?.data?.expired) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Token is Expired`,
      });
      navigate("/register");
    }
  };

  useMemo(() => {
    if (token) {
      if (permit) {
        handleVerifyToken();
        setPermit(false);
      } else {
        return () => {};
      }
    } else {
      return () => {};
    }
  }, [token]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete={false}
                placeholder="Enter your full name"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete={false}
                placeholder="Enter your email address"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete={false}
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
            </div>
            <div className="mt-2">
              <select
                ref={roleRef}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="role"
              >
                <option selected disabled value="">
                  Choose a role
                </option>
                <option value="USER">User</option>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Account Manager</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {registering && <img width={20} src={loading} alt="" />}
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to="/"
            className="ms-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
