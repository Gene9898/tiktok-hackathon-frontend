import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flexbox">
      <div className="flex items-center justify-between">
        <h1>Finance App</h1>
        <div className="flex items-center sm:gap-2">
          <Link href="/">Home</Link>
          <Link href="/wallet">Wallet</Link>
          <Link href="/">Logout</Link>
        </div>
      </div>
    </header>
  );
}
