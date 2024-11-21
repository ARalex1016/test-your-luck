// Store
import useStore from "../../Store/useStore";

// Components
import ContestCard from "../../Components/ContestCard/ContestCard";

const Contest = () => {
  const { contest } = useStore();

  const runningContests = contest?.filter((c) => c.status === "running") || [];

  const upcomingContests =
    contest?.filter((c) => c.status === "upcoming") || [];

  const finishedContests =
    contest?.filter((c) => c.status === "finished") || [];

  return (
    <>
      <main className="w-full mt-menuHeight px-paddingX">
        {/* Running Contest */}

        <h2 className="text-xl text-white font-bold mb-4">Running Contest</h2>

        {runningContests.length > 0 ? (
          runningContests.map((contest) => {
            return <ContestCard key={contest._id} contest={contest} />;
          })
        ) : (
          <p className="text-red-500 text-lg font-semibold">
            There are no running contests right now.
          </p>
        )}

        <br />
        <hr />

        {/* Upcoming Contest */}
        <h2 className="text-xl text-white font-bold mt-6 mb-4">
          Upcoming Contest
        </h2>

        {upcomingContests.length > 0 ? (
          upcomingContests.map((contest) => {
            return <ContestCard key={contest._id} contest={contest} />;
          })
        ) : (
          <p className="text-red-500 text-lg font-semibold">
            There are no Upcoming Contests right now.
          </p>
        )}

        <br />
        <hr />

        {/* Finished Contest */}
        <h2 className="text-xl text-white font-bold mt-6 mb-4">
          Finished Contest
        </h2>

        {finishedContests.length > 0 ? (
          finishedContests.map((contest) => {
            return <ContestCard key={contest._id} contest={contest} />;
          })
        ) : (
          <p className="text-red-500 text-lg font-semibold">
            There are no Finished Contests right now.
          </p>
        )}
      </main>
    </>
  );
};

export default Contest;
