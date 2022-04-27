import Head from "next/head";

export default function Home() {
  return (
    <div>
      <header className="bg-green-400  sticky top-0 h-[73px] flex justify-center items-center font-semibold uppercase drop-shadow-xl">
        Dashboard
      </header>
      <div className="flex justify-center items-center min-h-[750px]">
        <h1 className="text-5xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
}
