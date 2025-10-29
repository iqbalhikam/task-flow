import { SectionContainer } from "~/components/layouts/SectionContainer";
import CardFeatures from "./ui/CardFeatures";

const FeaturesSection = () => {
  return (
    <SectionContainer className="flex h-screen  flex-col content-center items-center justify-center gap-10">
      {/* <div className="flex flex-col items-center gap-6 text-center"> */}
      <div className="flex flex-col gap-4  items-center">
        <h1 className="max-w-2xl  text-4xl leading-tight font-black tracking-tighter text-slate-900 sm:text-5xl dark:text-white">
          All the tools you need to flow
        </h1>
        <p className="max-w-3xl text-center  text-lg leading-normal font-normal text-slate-600 dark:text-slate-400">
          TaskFlow helps you visualize your workflow, focus on deep work, and
          collaborate seamlessly with your team to achieve your goals.
        </p>
      </div>
      {/* </div> */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-0">
        <CardFeatures />
        <CardFeatures />
        <CardFeatures />
      </div>
    </SectionContainer>
  );
};

export default FeaturesSection;
