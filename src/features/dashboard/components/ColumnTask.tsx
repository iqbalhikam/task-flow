import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CardTask from "./CardTask";

type Task = {
    id: string;
    title: string;
    // Tambahkan properti lain jika ada, contoh: description?: string;
};

interface ColumnTaskProps {
  id: string;
  title: string;
  tasks: Task[];
}

const ColumnTask = ({id, title, tasks} : ColumnTaskProps) => {
    const { setNodeRef } = useSortable({ id });
    return (
      <div
        style={{
          flex: 1,
          padding: "10px",
          backgroundColor: "#f4f5f7",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            marginBottom: "15px",
            paddingBottom: "10px",
            borderBottom: "2px solid #ccc",
          }}
        >
          {title}
        </h3>
        <SortableContext
          id={id}
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ flexGrow: 1 }}>
            {tasks.map((task) => (
              <CardTask key={task.id} id={task.id} title={task.title} />
            ))}
          </div>
        </SortableContext>
      </div>
    );
}

export default ColumnTask;
