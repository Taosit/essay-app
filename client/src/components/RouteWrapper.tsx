import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export const RouteWrapper = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
