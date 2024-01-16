import Link from "next/link";
import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center justify-start h-full">
      <Image src="/wizard.png" alt="wizard" width={36} height={72} />
      <Link
        href={"/"}
        className="p-2 font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer">
        FormWizard
      </Link>
    </div>
  );
}

export default Logo;
