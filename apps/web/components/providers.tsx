'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <ConvexProvider client={convex}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </ConvexProvider>
  );
}
