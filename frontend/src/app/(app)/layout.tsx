import { ReactNode } from "react";
import NavBar from '@/components/common/NavBar';
import Sidebar from '@/components/common/Sidebar';


export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <NavBar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}