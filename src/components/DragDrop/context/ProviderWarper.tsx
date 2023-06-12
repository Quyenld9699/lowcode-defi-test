import React, { ReactNode } from 'react';
import ManageDragDropStatesProvider from './manage-dragdrop-states';

export default function ProviderWarper({ children }: { children: ReactNode }) {
    return <ManageDragDropStatesProvider>{children}</ManageDragDropStatesProvider>;
}
