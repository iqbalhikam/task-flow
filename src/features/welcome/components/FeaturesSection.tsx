import { SectionContainer } from "~/components/layouts/SectionContainer";
import CardFeatures from "./ui/CardFeatures";

const FeaturesSection = () => {
    return (
      <SectionContainer
        padded
        className="flex h-screen flex-col content-center items-center justify-center border-b"
      >
        <div className=" flex w-[85%] h-[70%] justify-center items-center gap-4 rounded-2xl border bg-gradient-to-br from-secondary/10 to-primary text-center">
          <CardFeatures/>
          <CardFeatures/>
          <CardFeatures/>
        </div>
      </SectionContainer>
    );
}

export default FeaturesSection;
