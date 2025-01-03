"use client";

import { Card,
         CardHeader,
         CardContent,
         CardFooter,
 } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonhref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonhref,
  showSocial,
}: CardWrapperProps) => {
  return ( 

    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}></Header>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
      <CardFooter>
        <Social />
      </CardFooter>
      )}
      <CardFooter>
        <BackButton 
          label={backButtonLabel}
          href={backButtonhref}
        />
      </CardFooter>
    </Card>

  );
};