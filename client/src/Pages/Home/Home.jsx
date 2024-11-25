import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referral = params.get("referral");

    if (referral) {
      localStorage.setItem("referralLink", referral);
    }
  }, [location]);

  return (
    <>
      <section className="mt-menuHeight">
        <p className="text-white">Home</p>
      </section>
    </>
  );
};

export default Home;
