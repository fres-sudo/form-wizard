"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

function FormLinkShare({ sharedUrl }: { sharedUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; //avoiding window not defined error

  const shareLink = `${window.location.origin}/submit/${sharedUrl}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input readOnly value={shareLink} />
      <Button
        className="max-w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied",
            description:
              "The link has successfully benn copied to the clip board",
          });
        }}>
        <ImShare className="mr-2 h-4 w-4" />
        Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;
