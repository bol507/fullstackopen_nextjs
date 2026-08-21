import { ReactNode } from "react";

interface MDXContentProps {
  children: ReactNode;
}

export default function MDXContent({ children }: MDXContentProps) {
  return (
    <div className="prose prose-zinc max-w-4xl mx-auto dark:prose-invert">
      {children}
    </div>
  );
}