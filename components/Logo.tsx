import Link from "next/link";
import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center justify-start h-full">
      <Link
        href={"/"}
        className="p-2 font-bold text-3xl text-muted-foreground">
        Form 
        <span className=" font-bold text-3xl text-blue-500">
        Wizard 🧙🏻
        </span>
      </Link>
    

    </div>
  );
}

export default Logo;
