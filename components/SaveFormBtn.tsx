import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSave } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { FaSpinner } from "react-icons/fa";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form is successfully saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong during the saving process",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}>
      <HiSave className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="h-4 w-4" />}
    </Button>
  );
}

export default SaveFormBtn;
