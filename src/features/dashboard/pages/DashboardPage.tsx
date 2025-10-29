import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthRoute } from "~/components/layouts/AuthRoute";
import SideNav from "~/components/layouts/SideNav";
import { supabase } from "~/lib/supabase/client";
import CardTask from "../components/CardTask";
import ColumnTask from "../components/ColumnTask";
import { Button } from "~/components/ui/button";

// Tipe data untuk Task
type Task = {
  id: string;
  title: string;
};

// Tipe data untuk grup task, di mana key adalah ID kolom
type TasksByGroup = Record<string, Task[]>;

const DashboardPage = () => {
  const router = useRouter();

  // Fungsi untuk logout
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Gagal keluar");
      throw error;
    }
    await router.push("/login");
  };

  // State awal untuk data papan Kanban
  const [tasksByGroup, setTasksByGroup] = useState<TasksByGroup>({
    todo: [
      { id: "1", title: "Mendesain UI/UX" },
      { id: "2", title: "Membuat Komponen Button" },
      { id: "3", title: "Integrasi API Login" },
    ],
    "in-progress": [
      { id: "4", title: "Mengerjakan Halaman Dashboard" },
      { id: "5", title: "Memperbaiki Bug Responsi" },
    ],
    done: [{ id: "6", title: "Setup Proyek Next.js" }],
  });

  // State untuk menyimpan data task yang sedang di-drag
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Konfigurasi sensor untuk mendeteksi input drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  /**
   * Fungsi untuk menemukan ID kolom (container) dari sebuah task.
   */
  const findContainerId = (id: string) => {
    if (id in tasksByGroup) {
      return id;
    }
    return Object.keys(tasksByGroup).find((key) =>
      tasksByGroup[key]?.some((task) => task.id === id),
    );
  };

  /**
   * Handler yang dieksekusi saat drag dimulai.
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = Object.values(tasksByGroup)
      .flat()
      .find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  /**
   * Handler utama yang dieksekusi saat drag selesai.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId) return;

    const activeContainer = findContainerId(activeId);
    const overContainer = findContainerId(overId);

    if (!activeContainer || !overContainer) return;

    setTasksByGroup((prev) => {
      // --- PERBAIKAN UTAMA ADA DI SINI ---
      // Gunakan metode 'reduce' untuk membuat salinan state yang type-safe
      const newTasks: TasksByGroup = Object.keys(prev).reduce((acc, key) => {
        acc[key] = [...prev[key]!];
        return acc;
      }, {} as TasksByGroup);

      const activeItems = newTasks[activeContainer]!;
      const overItems = newTasks[overContainer]!;

      const activeIndex = activeItems.findIndex((t) => t.id === activeId);
      const [movedItem] = activeItems.splice(activeIndex, 1);

      if (!movedItem) return prev;

      if (activeContainer === overContainer) {
        // Skenario 1: Reorder di kolom yang sama
        const overIndex = overItems.findIndex((t) => t.id === overId);
        overItems.splice(overIndex, 0, movedItem);
      } else {
        // Skenario 2: Pindah ke kolom berbeda
        const isOverAColumn = over.data.current?.type === "COLUMN";
        if (isOverAColumn) {
          overItems.push(movedItem);
        } else {
          const overIndex = overItems.findIndex((t) => t.id === overId);
          overItems.splice(overIndex, 0, movedItem);
        }
      }

      return newTasks;
    });
  };

  return (
    <AuthRoute>
      <SideNav>
        <Button onClick={signOut}>Keluar</Button>
        <div className="flex h-full gap-4 overflow-x-auto p-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex min-h-full items-start gap-4 p-4">
              {Object.keys(tasksByGroup).map((groupId) => (
                <ColumnTask
                  key={groupId}
                  id={groupId}
                  title={groupId.replace("-", " ")}
                  tasks={tasksByGroup[groupId]!}
                />
              ))}
            </div>
            <DragOverlay>
              {activeTask ? (
                <CardTask id={activeTask.id} title={activeTask.title} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </SideNav>
    </AuthRoute>
  );
};

export default DashboardPage;
