import React from 'react';
import { Clock } from 'lucide-react';

const RecentActivity = ({ passwords }) => {
  const recent = [...passwords]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 5);
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
      {recent.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No recent activity.</div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recent.map((item) => (
            <li key={item._id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-100">{item.website}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{item.username}</div>
              </div>
              <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(item.updatedAt || item.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity; 