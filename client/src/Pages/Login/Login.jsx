import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Store
import useStore from "../../Store/useStore";

// Components
import Input from "../../Components/Input";

const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();

  const initialUser = {
    email: "",
    password: "",
  };

  const [userForm, setUserForm] = useState(initialUser);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserForm((pre) => ({ ...pre, [name]: value }));
  };

  const formValidation = () => {
    if (!userForm.email) {
      setMessage("Please enter your email.");

      return false;
    }

    if (!userForm.password) {
      setMessage("Please enter your password.");

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValidation()) {
      return;
    }

    try {
      // Server Response
      await login(userForm);

      navigate(`/dashboard`);
    } catch (error) {}
  };

  return (
    <>
      <main
        className="px-paddingX mt-menuHeight flex justify-center items-center"
        style={{
          height: "calc(100svh - var(--menuHeight))",
        }}
      >
        {/* Container */}
        <div className="w-full bg-primaryLight rounded-2xl flex flex-col items-center py-6 gap-y-2">
          <h2 className="text-accent text-3xl font-bold text-center">Log in</h2>

          <p
            className={`w-full h-6 text-secondary text-center text-base bg-red-500 my-1 ${
              message ? "visible" : "invisible"
            }`}
          >
            {message}
          </p>

          <form onSubmit={handleSubmit} className="w-4/5 flex flex-col gap-y-6">
            <Input
              type="email"
              placeholder="Email"
              value={userForm.email}
              name="email"
              onChange={handleInputChange}
            />

            <Input
              type="text"
              placeholder="Password"
              value={userForm.password}
              name="password"
              onChange={handleInputChange}
            />

            <button className="w-full text-2xl text-secondary font-medium bg-accent rounded-md cursor-pointer py-1 mt-4">
              Login
            </button>
          </form>

          <p className="text-secondary text-sm">
            Don't have account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-accent text-center text-lg font-bold"
            >
              Click here
            </span>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
