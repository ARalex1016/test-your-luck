// Store
import useStore from "../../Store/useStore";

// Components
import Timer from "../Timer";

// Utils
import { formatDate } from "../../Utils/dateManager";

const ContestCard = ({ contest }) => {
  const { user } = useStore();

  const currency = "$";

  const participated = user?.participatedContest.includes(contest._id) || false;

  return (
    <>
      {/* Contest Card */}
      <section
        className={`w-full rounded-2xl duration-300 hover:shadow-sm hover:shadow-gray-400 hover:translate-x-1 hover:-translate-y-1 overflow-hidden relative flex flex-col justify-center items-center gap-y-4 pb-6 
         ${contest.status === "upcoming" && "opacity-80"} ${
          contest.status === "finished" && "opacity-40"
        }`}
        style={{
          backgroundImage: participated
            ? "linear-gradient(230deg, rgba(15,40,163,1) 0%, rgba(239,11,216,1) 100%)"
            : "none",
          backgroundColor: participated ? "transparent" : "hsl(0, 0%, 14%)",
        }}
      >
        {/* Card Content */}

        {/* Image */}
        <p
          className={`w-full text-secondary text-lg font-semibold text-center bg-transparent -mb-4 ${
            !participated && "hidden"
          }`}
        >
          Participated
        </p>

        <img
          src={contest.imageUrl}
          alt={`${contest.title}-Image`}
          srcSet=""
          className="w-full aspect-video bg-secondary"
        />

        {/* Timer */}
        <div
          className="bg-primary rounded-l-xl absolute top-2 right-0 px-3 py-1 z-10"
          style={{
            backgroundColor: "hsl(216, 14%, 7%,.7)",
          }}
        >
          {contest.status === "running" || contest.status === "upcoming" ? (
            <>
              <Timer endDate={contest.endDate} />
              {contest.status === "running" ? (
                <p className="text-secondary text-sm font-semibold">
                  Days to go
                </p>
              ) : (
                <p className="text-secondary text-sm font-semibold">
                  Days to Start
                </p>
              )}
            </>
          ) : (
            <p className="text-secondary text-lg font-bold">
              {contest.status.toUpperCase()}
            </p>
          )}
        </div>

        {/* Title */}
        <p className="text-yellow-400 text-2xl font-bold text-nowrap">
          {contest.title}
        </p>

        {/* Entry fee */}
        <div className="text-secondary text-sm flex flex-row justify-center items-baseline gap-x-1">
          <span className="text-yellow-400 text-2xl font-bold">
            {currency}
            {contest.entryFee}
          </span>{" "}
          Entry fee
        </div>

        {/* Button */}
        <button
          className={`text-secondary text-2xl font-semibold bg-accent rounded-xl outline-none hover:scale-105 duration-300 px-8 py-1 ${
            participated && "border-2 border-white"
          }`}
        >
          {participated
            ? "Details"
            : contest.status === "running"
            ? "Participate"
            : "Details"}
        </button>

        {/* Date Details */}
        <div className="w-11/12 text-secondary border border-white rounded-md flex flex-row justify-around py-1 mt-4">
          <div>
            Starts on:{" "}
            <span className="text-lg font-bold">
              {formatDate(contest.startDate)}
            </span>
          </div>

          <div>
            Ends on:{" "}
            <span className="text-lg font-bold">
              {formatDate(contest.endDate)}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContestCard;
