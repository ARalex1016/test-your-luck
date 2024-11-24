import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

// Store
import useStore from "../../Store/useStore";

// Components
import Input from "../../Components/Input";

const Signup = () => {
  const { signup } = useStore();
  const navigate = useNavigate();

  const initialUser = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    invitedBy: undefined,
  };

  const [userForm, setUserForm] = useState(initialUser);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserForm((pre) => ({ ...pre, [name]: value }));
  };

  const formValidation = () => {
    if (!userForm.name) {
      setMessage("Please enter your name.");

      return false;
    }

    if (!userForm.phoneNumber) {
      setMessage("Please enter your Phone Number.");

      return false;
    }

    if (!userForm.email) {
      setMessage("Please enter your email.");

      return false;
    }

    if (!userForm.password) {
      setMessage("Please enter a Strong Password.");

      return false;
    }

    if (userForm.password.length < 8 || userForm.password.length > 20) {
      setMessage("Password must be min 8 and max 20 characters");

      return false;
    }

    if (!userForm.confirmPassword) {
      setMessage("Please enter Confirm Password.");

      return false;
    }

    if (userForm.password !== userForm.confirmPassword) {
      setMessage("Password doesn't match!");

      return false;
    }

    if (!checkBoxStatus) {
      setMessage("Please check on Terms and Conditions");

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
      const res = await signup(userForm);

      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <main
        className="px-paddingX mt-menuHeight flex flex-col justify-center items-center"
        style={{
          height: "calc(100svh - var(--menuHeight))",
        }}
      >
        {/* Label for Valid Information */}
        <div className="w-screen bg-yellow-400 absolute top-menuHeight z-10">
          <p className="text-primary text-sm text-center">
            <b>Note:</b> Please give valid informaton
          </p>
          <p className="text-primary text-sm text-center">
            These information will help us to <b>Contact</b> you on your{" "}
            <b>Winnings</b>
          </p>
        </div>

        {/* Container */}
        <div className="w-full bg-primaryLight rounded-2xl flex flex-col items-center py-3 gap-y-1">
          <h2 className="text-accent text-3xl font-bold text-center">
            Sign Up
          </h2>

          <p
            className={`w-full h-6 text-secondary text-center text-base bg-red-500 my-1 ${
              message ? "visible" : "invisible"
            }`}
          >
            {message}
          </p>

          <form onSubmit={handleSubmit} className="w-4/5 flex flex-col gap-y-4">
            <div className="w-full flex gap-x-2">
              <Input
                type="text"
                placeholder="Name"
                value={userForm.name}
                name="name"
                onChange={handleInputChange}
                className="w-[60%]"
              />

              <PhoneInput
                country={"us"}
                placeholder="Phoner Number"
                countryCodeEditable={false}
                value={userForm.phoneNumber}
                onChange={(value) =>
                  setUserForm((pre) => ({ ...pre, phoneNumber: value }))
                }
                inputStyle={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "hsl(0, 0%, 100%)",
                  outline: "none",
                  border: "none",
                  color: "#666666",
                  fontWeight: "500",
                  fontSize: "12px",
                }}
                containerStyle={{
                  border: "none",
                }}
              />
            </div>

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

            <Input
              type="text"
              placeholder="Confirm Password"
              value={userForm.confirmPassword}
              name="confirmPassword"
              onChange={handleInputChange}
            />

            <Input
              type="text"
              placeholder="InvitedBy"
              readonly={true}
              value={userForm.invitedBy}
              name="invitedBy"
              onChange={handleInputChange}
            />

            <div className="flex justify-start items-center gap-x-1">
              <input
                type="checkbox"
                id="checkBox"
                checked={checkBoxStatus}
                onChange={() => setCheckBoxStatus((pre) => !pre)}
              />

              <label htmlFor="checkBox" className="text-secondary text-xs">
                Click here to accept{" "}
                <span className="text-blue-500 text-sm font-medium underline">
                  Terms and Conditions
                </span>
              </label>
            </div>

            <button className="w-full text-2xl text-secondary font-medium bg-accent rounded-md cursor-pointer py-1 mt-4">
              Sign up
            </button>
          </form>

          <p className="text-secondary text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
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

export default Signup;
