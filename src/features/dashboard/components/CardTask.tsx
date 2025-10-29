// src/features/dashboard/components/CardTask.tsx

import { TbProgress } from "react-icons/tb";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Task = {
  id: string;
  title: string;
};

const CardTask = ({ id, title }: Task) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, // <-- Tambahkan ini
  } = useSortable({
    id,
    data: {
      type: "TASK",
      task: { id, title },
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Saat dragging, buat kartu asli menjadi transparan
    opacity: isDragging ? 0 : 1, // <-- Tambahkan ini
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="shadow-secondary h-fit w-64 gap-2 bg-black/5 shadow-none backdrop-blur-sm dark:bg-white/1"
    >
      <CardHeader className="justify-between text-start">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <TbProgress className="text-amber-300" />
            <div className="grid grid-cols-2 gap-1">
              <Badge className="bg-accent h-3 text-[7px] font-light">
                In Progress
              </Badge>
              <Badge className="bg-primary h-3 text-[7px] font-light">
                In Progress
              </Badge>
              <Badge
                variant={"destructive"}
                className="h-3 text-[7px] font-light"
              >
                In Progress
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTask;
