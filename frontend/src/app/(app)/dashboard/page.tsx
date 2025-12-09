"use client";

import { Eye, FileText, Users, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const tasks = [
    { type: "Payroll", client: "ABC Ltd", dueDate: "14/11/2025", status: "In Progress", priority: "high" },
    { type: "Management Accounts", client: "Roberts Partners", dueDate: "31/10/2025", status: "Estimate Accepted", priority: "medium" },
    { type: "Year-End Final Accounts", client: "XYZ Ltd", dueDate: "28/11/2025", status: "Estimate Accepted", priority: "medium" },
    { type: "VAT Returns", client: "ABC Ltd", dueDate: "01/09/2025", status: "Completed", priority: "low" },
    { type: "VAT Returns", client: "ABC Ltd", dueDate: "23/08/2025", status: "Customer Review", priority: "medium" },
    { type: "Bookkeeping", client: "ABC Ltd", dueDate: "20/08/2025", status: "Completed", priority: "low" },
  ];

  const statusColors: Record<string, string> = {
    "In Progress": "bg-blue-100 text-blue-800",
    "Estimate Accepted": "bg-green-100 text-green-800",
    "Completed": "bg-gray-100 text-gray-800",
    "Customer Review": "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="flex-1 p-6 bg-[#F4F4F5] overflow-hidden">
      {/* Content wrapper with internal scroll */}
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#5321A9]" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-700">Type</th>
                    <th className="text-left p-4 font-medium text-gray-700">Client</th>
                    <th className="text-left p-4 font-medium text-gray-700">Due Date</th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                    <th className="text-left p-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...tasks, ...tasks, ...tasks].map((task, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-gray-900">{task.type}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{task.client}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{task.dueDate}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                            {task.status}
                          </span>
                          {task.priority === 'high' && <AlertCircle className="h-4 w-4 text-red-500" />}
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-[#5321A9] hover:text-[#4a1d96] font-medium text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
