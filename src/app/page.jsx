import { Menu, Navbar } from "./components";

export default function Home() {
  return (
    <div className="flex flex-col px-5 md:px-72 font-poppins bg-slate-200 min-h-screen w-full overflow-hidden">
      <div className="w-full p-10">
        <Navbar />
      </div>
      <div className="mt-5">
        <Menu />
      </div>
    </div>
  );
}
