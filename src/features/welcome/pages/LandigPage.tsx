import { GuestRoute } from "~/components/layouts/GuestRoute";
import { Header } from "~/components/layouts/Header";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { BiSolidDetail } from "react-icons/bi";
import { TbProgress } from "react-icons/tb";
import { VscDebugStart } from "react-icons/vsc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "~/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useRef } from "react";
import { Badge } from "~/components/ui/badge";

const LandigPage = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const constraintsRefButton = useRef<HTMLButtonElement>(null);
  return (
    <>
      <GuestRoute>
        <Header className="fixed top-0 z-50 w-full bg-white/1 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* hero section */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
            ref={constraintsRef}
          >
            <div className="mx-20 flex flex-col gap-10 text-center">
              <div className="flex flex-col gap-4 lg:mx-16">
                <h1 className="text-secondary-foreground text-center font-sans text-2xl sm:text-3xl lg:text-6xl">
                  <span className="text-primary">Fokus Tercapai,</span>{" "}
                  <span className="dark:text-shadow-primary-foreground text-shadow-primary text-shadow-[0px_0px_10px]">
                    Produktivitas
                  </span>
                  <span className="text-primary"> Terorganisir</span>
                </h1>

                <p className="sm:text-[10px] lg:text-xl">
                  Aplikasi manajemen tugas visual yang menggabungkan Papan
                  Kanban intuitif dengan Teknik Pomodoro untuk membantu Anda
                  menyelesaikan lebih banyak pekerjaan.
                </p>
              </div>
              <motion.div
                dragConstraints={constraintsRef}
                className="absolute w-fit"
                drag
                whileDrag={{ scale: 1.1 }}
              >
                <Card className="h-fit w-64 gap-2 bg-black/5 backdrop-blur-sm dark:bg-white/1">
                  <CardHeader className="justify-between text-start">
                    <CardTitle className="text-sm">
                      Projek App TaskFlow
                    </CardTitle>
                    <CardDescription className="lg:text-[9px]">
                      Aplikasi manajemen tugas visual yang menggabungkan Papan
                      Kanban intuitif dengan Teknik Pomodoro....
                    </CardDescription>
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
                      <div className="flex gap-2">
                        {/* detail todo */}
                        <HoverCard>
                          <HoverCardTrigger>
                            <BiSolidDetail />
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-background rounded-sm border p-1">
                            <div>
                              <h1 className="text-xs font-light">Detail</h1>
                              <p className="text-[9px] font-normal">
                                Untuk melihat detail todo atau task
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        {/* detail todo */}

                        <VscDebugStart />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <div className="flex justify-center gap-4">
                <Button className="dark:bg-secondary-foreground dark:hover:bg-secondary-foreground/80 dark:text-primary lg:text-md dark:border-primary border-secondary-foreground min-w-fit rounded-xl border-[1px_5px_5px_1px] text-white sm:text-sm lg:h-15 lg:px-10 lg:font-bold">
                  Daftar Gratis
                </Button>
                <Button className="hover:bg-secondary-foreground/10 text-secondary-foreground lg:text-md dark:border-primary border-secondary-foreground min-w-fit rounded-xl border-[1px_5px_5px_1px] bg-transparent sm:text-sm lg:h-15 lg:px-10">
                  Masuk Sekarang
                </Button>
              </div>
            </div>
          </SectionContainer>

          {/* Sesi Fitur Unggulan 🚀 */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
          >
            <div className="m-50 grid h-fit w-full grid-cols-3 gap-10 bg-amber-50 text-center">
              <Card className="w-full min-w-sm">
                <CardHeader>
                  <CardTitle>Fitur Unggulan</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio dignissimos ipsum nobis beatae excepturi minus.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Fitur Unggulan</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio dignissimos ipsum nobis beatae excepturi minus.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Fitur Unggulan</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio dignissimos ipsum nobis beatae excepturi minus.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </SectionContainer>

          {/* Sesi "Untuk Siapa?" (Target Pengguna) 🎯 */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
          ></SectionContainer>

          {/* Sesi Testimonial (Bukti Sosial) ❤️ */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
          ></SectionContainer>

          {/* Final Call to Action (CTA) */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
          ></SectionContainer>
        </motion.div>
      </GuestRoute>
    </>
  );
};

export default LandigPage;
