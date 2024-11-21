// Components
import Banner from "../../Components/Banner/Banner";
import ParticipatedContest from "../../Components/participatedContest";

const Dashboard = () => {
  return (
    <>
      <main className="px-paddingX mt-menuHeight">
        <Banner />
        <ParticipatedContest />
      </main>
    </>
  );
};

export default Dashboard;
