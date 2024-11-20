const Coins = () => {
  const currency = "$";
  const value = 100;

  return (
    <>
      <p className="text-xl font-medium text-yellow-400 transition-all duration-300">
        Coins:{" "}
        <span className="font-extrabold">
          {currency}
          {value}
        </span>
      </p>
    </>
  );
};

export default Coins;
