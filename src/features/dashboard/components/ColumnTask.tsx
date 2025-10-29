// src/features/dashboard/components/ColumnTask.tsx

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CardTask from "./CardTask";
import { useDroppable } from "@dnd-kit/core"; // <-- Ganti import

type Task = {
  id: string;
  title: string;
};

interface ColumnTaskProps {
  id: string;
  title: string;
  tasks: Task[];
}

const ColumnTask = ({ id, title, tasks }: ColumnTaskProps) => {
  // Ganti dari useSortable menjadi useDroppable
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "COLUMN",
    },
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    // Gunakan setNodeRef dari useDroppable
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        padding: "10px",
        backgroundColor: "hsl(var(--card))",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        minWidth: "280px",
        minHeight: "200px", // Beri tinggi minimum agar area drop terasa
      }}
    >
      <h3
        style={{
          marginBottom: "15px",
          paddingBottom: "10px",
          borderBottom: "2px solid hsl(var(--border))",
          textTransform: "capitalize",
        }}
      >
        {title}
      </h3>
      <SortableContext
        id={id}
        items={taskIds}
        strategy={verticalListSortingStrategy}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {tasks.map((task) => (
            <CardTask key={task.id} id={task.id} title={task.title} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default ColumnTask;
