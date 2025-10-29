import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SiFastly } from "react-icons/si";
import { IoIosTimer } from "react-icons/io";

type propsCardFeatures = {
  cardTitle?: string;
  cardDescription?: string;
  cardContent?: string;
  cardFooter?: string;
};

const CardFeatures = () => {
  return (
    <Card className="dark:hover:border-primary dark:bg-secondary/5 flex flex-1 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 text-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="text-primary p-0">
        <CardTitle className="material-symbols-outlined !text-3xl">
          <IoIosTimer />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5 p-0">
        <h2 className="text-lg leading-tight font-bold text-slate-900 dark:text-white">
          Visualize Your Workflow
        </h2>
        <p className="text-base leading-normal font-normal text-slate-500 dark:text-slate-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
          delectus, harum blanditiis dolorem aliquid distinctio?
        </p>
      </CardContent>
    </Card>
  );
};

export default CardFeatures;
