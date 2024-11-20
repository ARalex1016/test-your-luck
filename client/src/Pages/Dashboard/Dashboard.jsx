// Components
import Banner from "../../Components/Banner/Banner";
import ContestCard from "../../Components/ContestCard/ContestCard";

const Dashboard = () => {
  return (
    <>
      <main className="px-paddingX mt-menuHeight">
        <Banner />

        <h2 className="text-xl text-white font-bold pb-4">
          Participated Contest
        </h2>

        <section className="flex flex-col gap-y-10">
          <ContestCard />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
