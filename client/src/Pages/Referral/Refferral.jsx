// Store
import useStore from "../../Store/useStore";

const Refferral = () => {
  const { user } = useStore();

  return (
    <>
      <main className="w-full mt-menuHeight px-paddingX flex flex-col gap-y-6 justify-center items-center">
        {/* Title */}
        <h2 className="text-yellow-400 text-2xl font-medium text-center">
          Referral
        </h2>

        {/* Referral Link */}
        <section className="w-full flex flex-col justify-center gap-y-4">
          <div className="w-full bg-white rounded-t-lg overflow-hidden">
            <input
              type="text"
              readOnly
              className="w-full text-base test-center rounded p-2 outline-none"
            />
            <button className="w-full text-primaryLight text-lg font-medium text-center border-2 border-gray-400">
              Click here to Copy
            </button>
          </div>

          <div>
            <p className="text-yellow-400 text-left text-xl font-medium">
              Referral Bonus / Share & Earn
            </p>

            <ul className="text-white text-sm">
              <li>
                <b>Copy & Share the Link </b>to your friends
              </li>
              <li>
                You'll get <b>20 coins</b> for each Friends that <b>Register</b>{" "}
                and <b>Participate</b> in any 1 Contest (atleast)
              </li>
              <li>
                You can <b>Exchange</b> the coins to buy <b>Tickets</b> of any
                Ongoing Contests (that you have participated)
              </li>
            </ul>
          </div>
        </section>

        {/* Referral Table */}
        <div className="w-full">
          <h2 className="text-yellow-400 text-left text-2xl font-medium">
            All Your Referrals
          </h2>

          <table className="w-full text-white bg-gray rounded-md">
            <thead className="h-8 text-accent text-base border-b-2">
              <tr>
                <th className="w-1/12">S.N</th>
                <th className="w-4/12">Referrals</th>
                <th className="w-4/12 text-sm break-words">
                  Date Of Registration
                </th>
                <th className="w-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">Aslam</td>
                <td className="text-center">2024-10-02</td>
                <td className="text-center">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Refferral;
