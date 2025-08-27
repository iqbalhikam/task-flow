import React from "react";
import { useDraggable } from "@dnd-kit/core";

// 1. Definisikan tipe untuk props komponen
interface DraggableProps {
  children: React.ReactNode;
}

// 2. Gunakan tipe React.FC (Functional Component) dan terapkan tipe props
const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  // TypeScript akan secara otomatis mengenali tipe 'style'
  // sebagai React.CSSProperties | undefined
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

export default Draggable;
