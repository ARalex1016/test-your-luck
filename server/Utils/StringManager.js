export const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 20;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isValidLength =
    password.length >= minLength && password.length <= maxLength;

  return isValidLength && hasUpperCase && hasLowerCase && hasNumber;
};

export const validateContestStatus = (contest) => {
  if (contest.status === "upcoming") {
    return res.status(400).json({
      status: "fail",
      message: "Contest isn't started yet!",
    });
  }

  if (contest.status === "finished") {
    return res.status(400).json({
      status: "fail",
      message: "Contest already over!",
    });
  }

  return;
};
