// Store
import useStore from "../../Store/useStore";

// Components
import Timer from "../Timer";

// Utils
import { formatDate } from "../../Utils/dateManager";

const ContestCard = ({ contest }) => {
  const { user } = useStore();

  const currency = import.meta.env.VITE_SERVER_CURRENCY;

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

        {/* Label */}
        <p
          className={`w-full text-secondary text-xl font-semibold text-center py-1 -mb-4 ${
            contest.status === "finished" && "bg-accent"
          } ${contest.status === "running" && "bg-transparent"}
          ${contest.status === "upcoming" && "hidden"}`}
        >
          {contest.status === "running" && participated && "Participated"}
          {contest.status === "finished" && "User Won"}
        </p>

        {/* Image */}
        <img
          src={contest.imageUrl}
          alt={`${contest.title}-Image`}
          srcSet=""
          className="w-full aspect-video bg-secondary"
        />

        {/* Timer */}
        <div
          className={`rounded-l-xl absolute top-2 right-0 px-2 z-10 flex flex-col justify-center items-center 
          ${contest.status === "running" && "bg-greenTransparent"} ${
            contest.status === "upcoming" && "bg-blueTransparent"
          } ${contest.status === "finished" && "bg-primaryTransparent px-6"}`}
        >
          {contest.status === "running" || contest.status === "upcoming" ? (
            <>
              <p
                className={`text-secondary text-base font-bold ${
                  contest.status === "running" && "text-blue"
                }`}
              >
                {contest.status === "running" ? "Live Now" : "Starts In"}
              </p>
              <Timer
                endDate={contest.endDate}
                className={`${contest.status === "running" && "text-blue"}`}
              />
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
        {contest.status !== "finished" && (
          <div className="text-secondary text-sm flex flex-row justify-center items-baseline gap-x-1">
            <span className="text-yellow-400 text-2xl font-bold">
              {currency}
              {contest.entryFee}
            </span>{" "}
            Entry fee
          </div>
        )}

        {/* Button */}
        {contest.status !== "finished" && (
          <button
            className={`text-secondary text-2xl font-semibold bg-accent rounded-xl outline-none hover:scale-105 duration-300 px-8 py-1 ${
              participated && "border-2 border-primaryTransparent"
            }`}
          >
            {participated
              ? "Details"
              : contest.status === "running"
              ? "Participate"
              : "Details"}
          </button>
        )}

        {/* Date Details */}
        {contest.status !== "finished" && (
          <div className="w-11/12 text-secondary border border-white rounded-md flex flex-row flex-wrap justify-around gap-x-4 px-2 py-1 mt-4">
            <div className="mobilesm:text-xs mobile:text-base">
              Starts on:{" "}
              <span className="mobilesm:text-sm mobile:text-lg font-bold">
                {formatDate(contest.startDate)}
              </span>
            </div>

            <div className="mobilesm:text-xs mobile:text-base">
              Ends on:{" "}
              <span className="mobilesm:text-sm mobile:text-lg font-bold">
                {formatDate(contest.endDate)}
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ContestCard;
