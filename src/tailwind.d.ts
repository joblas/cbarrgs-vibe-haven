// tailwind.d.ts
declare module 'tailwind-styled-components' {
  import * as React from 'react';
  import { StyledConfig } from 'styled-components';

  export default function tw<
    T extends keyof JSX.IntrinsicElements | React.ComponentType<any>
  >(
    component: T
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.ComponentProps<T>> & React.RefAttributes<any>
  >;
}

// This allows TypeScript to understand string literals containing tailwind classes
declare namespace JSX {
  interface IntrinsicAttributes {
    tw?: string;
    css?: string;
  }
}
