// src/pages/EmployeeDashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const { tasks, changeTaskStatus } = useTasks();
  const { t } = useLanguage();

  const myTasks = tasks.filter(task => task.assigneeId === user?.id);
  const completedTasks = myTasks.filter(task => task.status === 'Done').length;
  const totalTasks = myTasks.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto pt-8">
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{t('my_tasks')}</h1>
            <p className="text-gray-600">{t('welcome')}, {user?.name} ({t('role_employee')})</p>
          </div>
          <button onClick={logout} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors shadow-sm">
            {t('logout_btn')}
          </button>
        </div>

        {/* Progress Indicator (อัปเดตใหม่กราฟวงแหวน) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="8"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-green-500 stroke-current transition-all duration-1000 ease-in-out"
                strokeWidth="8"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={totalTasks === 0 ? 251.2 : 251.2 - (251.2 * (completedTasks / totalTasks))}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-800">
                {totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)}%
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 text-center md:text-left">
              {t('tasks_completed')}
            </h2>
            <p className="text-gray-500 text-center md:text-left mt-1">
              {completedTasks} / {totalTasks} Tasks
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {myTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t('no_assigned_tasks')}</p>
          ) : (
            myTasks.map(task => (
              <div key={task.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                    <p className="text-gray-600 mt-2">{task.description}</p>
                    <p className="text-sm text-gray-400 mt-4">{t('created_on')}: {task.createdAt}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex flex-col md:flex-row gap-4 items-end md:items-center">
                  <div className="flex-1 w-full md:w-auto flex items-center gap-3">
                    <label className="text-sm font-semibold text-gray-700 min-w-[90px]">{t('change_status')}:</label>
                    <select 
                      value={task.status}
                      onChange={(e) => changeTaskStatus(task.id, e.target.value)}
                      className="flex-1 max-w-[200px] px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <input type="text" placeholder={t('log_time')} className="flex-1 max-w-[170px] px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                      {t('request_review')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}