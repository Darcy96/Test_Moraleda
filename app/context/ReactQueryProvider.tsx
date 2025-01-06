'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';

interface ReactQueryProviderProps {
    children: React.ReactNode;
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, 
                refetchOnWindowFocus: false, 
                staleTime: 1000 * 60 * 5,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
