import Link from 'next/link';
export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-100 p-4">
            <ul>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/settings">Settings</Link></li>
            </ul>
        </aside>
    );
}