"use client";

import DataProvider from "@/components/DataProvider";
import { ThemeProvider } from "@/components/mtexport";
import { SessionProvider } from "next-auth/react";

const theme = {
  input: {
    styles: {
      base: {
        container: {
          minWidth: "min-w-[100px]",
        }
      }
    }
  },
  select: {
    styles: {
      base: {
        container: {
          minWidth: "min-w-[100px]",
        }
      }
    }
  },
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
            

    <ThemeProvider value={theme}>
      <DataProvider>
           {children}
      </DataProvider>
    </ThemeProvider>
  
    </SessionProvider>
  );
}
