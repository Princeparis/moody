import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/journal" : "/new-user";
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[660px] mx-auto">
        <h1 className="text-6xl mb-4">The Best Journal App.</h1>
        <p className="text-xl text-white/60 mb-6">
          Your personal emotion navigator. Effortlessly track and analyze your
          moods through journaling. Gain insights, visualize trends, and make
          informed choices for a balanced life. Set reminders, explore prompts,
          and enjoy secure cloud storage. Download now and navigate your
          emotions with clarity and purpose!
        </p>
        <Link href={href}>
          <button className="bg-purple-600 hover:bg-purple-800 px-6 py-3 rounded-full">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
