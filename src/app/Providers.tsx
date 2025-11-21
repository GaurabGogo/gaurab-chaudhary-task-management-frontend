"use client";

import ErrorBoundaryPage from "@/components/pages/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import NProgressHandler from "./NProgressHandler";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundaryPage>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            <Toaster closeButton />
            <NProgressHandler />
            {children}
          </QueryClientProvider>
        </NuqsAdapter>
      </PersistGate>
    </ReduxProvider>
    </ErrorBoundaryPage>
  );
};

export default Providers;
