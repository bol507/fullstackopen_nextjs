declare module '*.mdx' {
  import { type JSX } from 'react';
  
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  
  
}