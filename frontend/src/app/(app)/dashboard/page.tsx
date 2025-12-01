import BasicLineChart from '@/components/charts/LineChart';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { BarChart3, HomeIcon, Settings, Users } from 'lucide-react';
const demoData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 500 },
    { name: 'Mar', value: 600 }
];
export default function DashboardPage() {
    const { setToken } = useAuthStore();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                                <HomeIcon className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>
                        <Button
                            onClick={() => setToken(null)}
                            variant="outline"
                            className="border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-600 transition-all"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome Back! 👋
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Here's what's happening with your account today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                +12.5%
                            </span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Revenue</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,231</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                +8.2%
                            </span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Active Users</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">2,845</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <Settings className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                            </div>
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                Active
                            </span>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">System Status</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">Healthy</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { action: 'New user registered', time: '2 minutes ago', color: 'bg-green-500' },
                            { action: 'Payment received', time: '15 minutes ago', color: 'bg-blue-500' },
                            { action: 'System update completed', time: '1 hour ago', color: 'bg-purple-500' },
                            { action: 'New feature deployed', time: '3 hours ago', color: 'bg-indigo-500' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white font-medium">{item.action}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}