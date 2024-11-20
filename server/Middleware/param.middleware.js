import Contest from "../Model/Contest.model.js";

export const contestParam = async (req, res, next, contestId) => {
  try {
    const contest = await Contest.findById(contestId);

    if (!contest) {
      return res.status(404).json({
        status: "fail",
        message: "Contest doesn't exist!",
      });
    }

    req.contest = contest;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal server error!",
    });
  }
};
