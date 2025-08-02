import { useRef, type RefObject } from "react";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import { Button } from "~/components/ui/button";
import { motion} from "framer-motion";
import { BiSolidDetail } from "react-icons/bi";
import { TbProgress } from "react-icons/tb";
import { VscDebugStart } from "react-icons/vsc";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "~/components/ui/hover-card";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/router";
type propsConstraintsRef = {
    constraintsRef?: RefObject<HTMLDivElement | null>
}


const HeroScetion = ( props: propsConstraintsRef) => {
const route = useRouter()
  const heandleRegister = async () => {
    await route.replace("/register")
  }

    return (
      <SectionContainer
        padded
        className="flex min-h-screen flex-col content-center items-center justify-center border-b"
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
              Aplikasi manajemen tugas visual yang menggabungkan Papan Kanban
              intuitif dengan Teknik Pomodoro untuk membantu Anda menyelesaikan
              lebih banyak pekerjaan.
            </p>
          </div>
          <motion.div
            dragConstraints={props.constraintsRef}
            className="absolute z-50 w-fit"
            drag
            whileDrag={{ scale: 1.1 }}
          >
            <Card className="shadow-secondary h-fit w-64 gap-2 bg-black/5 backdrop-blur-sm shadow-none even:not-focus:shadow-[0px_0px_10px_10px] dark:bg-white/1">
              <CardHeader className="justify-between text-start">
                <CardTitle className="text-sm">Projek App TaskFlow</CardTitle>
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
                  <div className="flex gap-2">
                    {/* detail todo */}
                    <HoverCard>
                      <HoverCardTrigger>
                        <BiSolidDetail />
                      </HoverCardTrigger>
                      <HoverCardContent className="z-50 rounded-sm border bg-white/1 p-1 backdrop-blur-sm">
                        <div>
                          {/* <h1 className="text-xs font-light">Detail</h1> */}
                          <p className="text-[8px]">
                            Untuk melihat detail todo atau task
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>

                    {/* Start Pomodoro todo */}
                    <HoverCard>
                      <HoverCardTrigger>
                        <VscDebugStart />
                      </HoverCardTrigger>
                      <HoverCardContent className="z-50 rounded-sm border bg-white/1 p-1 backdrop-blur-sm">
                        <div>
                          {/* <h1 className="text-xs font-light">Detail</h1> */}
                          <p className="text-[8px]">
                            mulai pomodoro untuk menyelesaikan todo
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <div className="flex justify-center gap-4">
            <Button onClick={heandleRegister} className="dark:bg-secondary-foreground dark:hover:bg-secondary-foreground/80 dark:text-primary lg:text-md dark:border-primary border-secondary-foreground min-w-fit rounded-xl border-[1px_5px_5px_1px] text-white sm:text-sm lg:h-15 lg:px-10 lg:font-bold">
              Daftar Gratis
            </Button>
            <Button className="hover:bg-secondary-foreground/10 text-secondary-foreground lg:text-md dark:border-primary border-secondary-foreground min-w-fit rounded-xl border-[1px_5px_5px_1px] bg-transparent sm:text-sm lg:h-15 lg:px-10">
              Masuk Sekarang
            </Button>
          </div>
        </div>
      </SectionContainer>
    );
}

export default HeroScetion;
