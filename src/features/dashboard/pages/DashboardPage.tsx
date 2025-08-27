import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { AuthRoute } from "~/components/layouts/AuthRoute";
import SideNav from "~/components/layouts/SideNav";
import { supabase } from "~/lib/supabase/client";
import Draggable from "../components/Draggable";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import ColumnTask from "../components/ColumnTask";

type Task = {
  id: string;
  title: string;
};
type TasksByGroup = Record<string, Task[]> ;

const DashboardPage = () => {
  const router = useRouter();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Gagal keluar");
      throw error;
    }
    await router.push("/login");
  };

  const [tasksByGroup, setTasksByGroup] = useState<TasksByGroup>({
    "group-todo": [
      { id: "1", title: "Mendesain UI/UX" },
      { id: "2", title: "Membuat Komponen Button" },
      { id: "3", title: "Integrasi API Login" },
    ],
    "group-in-progress": [
      { id: "4", title: "Mengerjakan Halaman Dashboard" },
      { id: "5", title: "Memperbaiki Bug Responsi" },
    ],
    "group-done": [{ id: "6", title: "Setup Proyek Next.js" }],
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const findContainer = (id: string): string | undefined=> {
    if (id in tasksByGroup) {
      return id;
    }

    Object.keys(tasksByGroup).find((key) => {
      if (!tasksByGroup[key]) return false;
      return tasksByGroup[key].find((task) => task.id === id)
    }
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    if (!activeContainerId || !overContainerId) return;

    // Kasus 1: Memindahkan kartu di kolom yang sama (reordering)
    if (activeContainerId === overContainerId) {
      setTasksByGroup((prev) => {
        const activeIndex = prev[activeContainerId]?.findIndex(
          (t) => t.id === activeId,
        );
        const overIndex = prev[overContainerId]?.findIndex(
          (t) => t.id === overId,
        );

        // Hanya lakukan perubahan jika posisinya berbeda
        if (activeIndex !== overIndex) {
          return {
            ...prev,
            [activeContainerId]: arrayMove(
              prev[activeContainerId],
              activeIndex,
              overIndex,
            ),
          };
        }
        return prev;
      });
    }
    // Kasus 2: Memindahkan kartu antar kolom
    else {
      setTasksByGroup((prev) => {
        const newTasks = { ...prev };
        const activeItems = newTasks[activeContainerId];
        const overItems = newTasks[overContainerId];

        if (!activeItems || !overItems) return prev;
        const activeIndex = activeItems.findIndex((t) => t.id === activeId);
        const overIndex = overItems.findIndex((t) => t.id === overId);

        const [movedItem] = activeItems.splice(activeIndex, 1);

        // Masukkan item ke posisi baru di kolom tujuan
        if (!movedItem) return prev;
        overItems.splice(overIndex, 0, movedItem);

        return newTasks;
      });
    }
  };

  return (
    <AuthRoute>
      <SideNav>
        <div className="flex h-full gap-4 p-4">
          <div className="flex min-h-full w-full flex-col items-center gap-4 rounded-2xl border border-purple-300 p-4">
            <h1>todo</h1>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center gap-5 p-5">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    {Object.keys(tasksByGroup).map((groupId) => (
                      <ColumnTask
                        key={groupId}
                        id={groupId}
                        title={groupId.replace("group-", "").toUpperCase()}
                        tasks={tasksByGroup[groupId]}
                      />
                    ))}
                  </div>
                </DndContext>
              </div>
            </div>
          </div>
          {/* <div className="min-h-full w-full rounded-2xl border border-purple-300 p-4">
            <h1>on progress</h1>
          </div>
          <div className="min-h-full w-full rounded-2xl border border-purple-300 p-4">
            <h1>done</h1>
          </div> */}
        </div>
      </SideNav>
    </AuthRoute>
  );
};

export default DashboardPage;
function setIsDropped(arg0: boolean) {
  throw new Error("Function not implemented.");
}

