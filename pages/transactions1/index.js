import { currencyFormatter } from "../../lib/utils";
import Transaction from "components/Transactions/TransactionObj";

const DummyData = [
  {
    id: 1,
    title: "Food",
    bank: "DBS",
    color: "lime",
    amount: 800,
  },
  {
    id: 2,
    title: "Movies",
    bank: "OCBC",
    color: "lime",
    amount: 100,
  },
  {
    id: 3,
    title: "Google",
    bank: "DBS",
    color: "red",
    amount: 500,
  },
  {
    id: 4,
    title: "Bus / MRT",
    bank: "TrustBank",
    color: "lime",
    amount: 8,
  },
];

export default function Transactions() {
  return (
    <main className="container max-w-3xl px-4 mx-auto">
      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        <h2>{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary-outline">+ Incoming</button>
        <button className="btn btn-primary">+ Outgoing</button>
      </section>

      <section className="py-6">
        <h3>Transactions</h3>
        <div className="flex flex-col gap-4 mt-6">
          <h4 className="text-gray-400 py-2 text-sm sm:text-lg">Thu, 31 Aug 2023</h4>

          {DummyData.map((transaction, index) => {
            return (
              <Transaction
                key={"transaction-" + index}
                color={transaction.color}
                title={transaction.title}
                bank={transaction.bank}
                amount={transaction.amount}
                id={transaction.id}
              />
            );
          })}

          <h4 className="text-gray-400 py-2 text-sm sm:text-lg">Tue, 1 Aug 2023</h4>

          <Transaction color="red" title="Bus / MRT" amount={10000} />
        </div>
      </section>
    </main>
  );
}
