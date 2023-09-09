import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flexbox">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
        <img className="image ml-1" src="./logo.png"/>
        <h2>FraudNow</h2>
        </div>
        <div className="flex items-center sm:gap-2">
          <Link href="/">Home</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/option">Payment</Link>
        </div>
      </div>
    </header>
  );
}
