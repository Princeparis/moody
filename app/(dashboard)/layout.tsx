import { UserButton } from "@clerk/nextjs";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute top-0 left-0 h-full w-[200px] border-r border-black/10 ">
        Moody
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex justify-end items-center">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)] w-[calc(100vw-200px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
