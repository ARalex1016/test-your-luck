// Models
import User from "../Model/User.model.js";

export const getReferrals = async (req, res) => {
  const { user } = req;

  try {
    const referrals = await User.aggregate([
      { $match: { invitedBy: user._id } }, // Filter referrals based on the inviter
      {
        $project: {
          email: {
            $let: {
              vars: {
                localEmail: "$email",
                localEmailLength: { $strLenCP: "$email" }, // Get the length of the email
                localAtIndex: { $indexOfBytes: ["$email", "@"] }, // Find the position of "@"
                localNameLength: {
                  $subtract: [{ $indexOfBytes: ["$email", "@"] }, 0],
                }, // Get length before "@"
              },
              in: {
                $concat: [
                  { $substr: ["$email", 0, 2] }, // Keep the first 2 characters
                  { $cond: [{ $gte: ["$$localNameLength", 4] }, "****", ""] }, // Mask part of the name before "@"
                  {
                    $substr: [
                      "$email",
                      "$$localAtIndex",
                      { $subtract: ["$$localEmailLength", "$$localAtIndex"] },
                    ],
                  }, // Keep the domain intact
                ],
              },
            },
          },
          firstPaid: 1,
          createdAt: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: referrals,
      message: "Referrals retrieved Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};
