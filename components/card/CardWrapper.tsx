import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { CardHeading } from "@/components/card/CardHeader";
import { CardSocial } from "@/components/card/CardSocial";
import { CardBackButton } from "@/components/card/CardBackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocials?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Card className="w-[350px] bg-white">
      <CardHeader>
        <CardHeading label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <CardFooter>
          <CardSocial />
        </CardFooter>
      )}
      <CardFooter>
        <CardBackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
