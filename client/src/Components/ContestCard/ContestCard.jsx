const ContestCard = () => {
  return (
    <>
      {/* Contest Card */}
      <section
        className="w-full rounded-2xl duration-300 hover:shadow-sm hover:shadow-gray-400 hover:translate-x-1 hover:-translate-y-1 overflow-hidden relative flex flex-col justify-center items-center gap-y-4 pb-6"
        style={{
          backgroundColor: "hsl(0, 0%, 14%)",
        }}
      >
        {/* Card Content */}

        <img
          src="https://geotoko.com/wp-content/uploads/2024/09/iPhone-16-Pro-Max-Giveaway-by-Geotoko.webp"
          alt=""
          srcSet=""
          className="w-full aspect-video"
        />

        <div
          className="text-secondary text-lg font-bold bg-primary rounded-l-xl absolute top-2 right-0 px-3 py-1 z-10"
          style={{
            backgroundColor: "hsl(216, 14%, 7%,.7)",
          }}
        >
          00 : 00 : 00 : 00
        </div>

        <p className="text-yellow-400 text-2xl font-bold text-nowrap">
          Iphone 16 Pro Max Giveaway
        </p>

        <div className="text-secondary text-sm flex flex-row justify-center items-baseline gap-x-1">
          <span className="text-yellow-400 text-2xl font-bold">$5</span> Entry
          fee
        </div>

        <button className="text-secondary text-2xl font-semibold bg-accent rounded-3xl hover:scale-105 duration-300 px-8 py-1">
          Participate
        </button>

        <div className="w-11/12 text-secondary border border-white rounded-md flex flex-row justify-around py-1 mt-4">
          <div>
            Starts on: <span className="text-lg font-bold">18-10-2024</span>
          </div>

          <div>
            Ends on: <span className="text-lg font-bold">08-11-2024</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContestCard;
