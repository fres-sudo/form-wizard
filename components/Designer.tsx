"use client";

import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/igGenerator";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesigner();

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20"
          )}>
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].deisgnerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ting-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}>
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}>
              <BiSolidTrash clasName="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-none">
            <p className="text-muted-foreground text-sm">
              Click for properties on drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-4 pointer-events-none opacity-100 rounded-b-none",
          mouseIsOver && "opacity-30"
        )}>
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  );
}

export default Designer;
