import { TbProgress } from "react-icons/tb";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { useSortable } from "@dnd-kit/sortable";

type Task = {
  id: string;
  title: string;
};

type TasksByGroup = Record<string, Task[]>;


const CardTask = ({ id, title }: Task) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners} className="shadow-secondary h-fit w-64 gap-2 bg-black/5 shadow-none backdrop-blur-sm even:not-focus:shadow-[0px_0px_10px_10px] dark:bg-white/1"
    >
      <CardHeader className="justify-between text-start">
        <CardTitle className="text-sm">{title}</CardTitle>
        {/* <CardDescription className="lg:text-[9px]">
                  Aplikasi manajemen tugas visual yang menggabungkan Papan
                  Kanban intuitif dengan Teknik Pomodoro....
                </CardDescription> */}
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
