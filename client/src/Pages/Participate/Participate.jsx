import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Store
import useStore from "../../Store/useStore";

const Participate = () => {
  const { contestId } = useParams();
  const { getContest } = useStore();

  const [contest, setContest] = useState(null);

  useEffect(() => {
    const fetchContest = async (contestId) => {
      try {
        const contest = await getContest(contestId);

        setContest(contest);
      } catch (error) {}
    };

    fetchContest(contestId);
  }, [contestId, getContest]);

  return (
    <>
      {contest && (
        <main className="mt-menuHeight px-paddingX flex flex-col justify-center items-center gap-y-4 pb-8">
          {/* Image */}
          <img
            src={contest.imageUrl}
            alt={`${contest.title}-Image`}
            className="w-full aspect-video object-cover text-primary bg-secondaryDim rounded-md"
          />

          {/* Title */}
          <h2 className="w-full text-greenTransparent text-xl text-center font-bold">
            {contest.title}
          </h2>
        </main>
      )}
    </>
  );
};

export default Participate;
