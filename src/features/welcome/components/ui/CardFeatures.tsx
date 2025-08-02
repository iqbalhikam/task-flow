
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
    <Card className="h-fit w-xs gap-2 justify-center bg-white/10 backdrop-blur-xl">
      <CardHeader className="text-center">
        <CardTitle>Fitur Unggulan</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        <IoIosTimer className="text-primary m-auto text-6xl" />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia delectus, harum blanditiis dolorem aliquid distinctio?</p>
      </CardFooter>
    </Card>
  );
};

export default CardFeatures;
