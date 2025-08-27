import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
    children: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({children}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
