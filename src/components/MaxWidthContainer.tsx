import React from "react";

interface IMaxWidthContainerProps {
  children: React.ReactNode;
}

export default function MaxWidthContainer({
  children,
}: IMaxWidthContainerProps) {
  return <div className="container mx-auto my-4 space-y-6 max-w-6xl">{children}</div>;
}
