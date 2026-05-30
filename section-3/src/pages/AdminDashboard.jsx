// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_USERS } from '../data/mockData';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', assigneeId: '', status: 'To Do', priority: 'Medium'
  });

  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAssignee = filterAssignee ? task.assigneeId === filterAssignee : true;
    const matchStatus = filterStatus ? task.status === filterStatus : true;
    return matchSearch && matchAssignee && matchStatus;
  });

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', assigneeId: MOCK_USERS.find(u => u.role === 'employee')?.id || '', status: 'To Do', priority: 'Medium' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({ ...task });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.assigneeId) return;

    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask({ ...formData, createdAt: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto pt-8">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('admin_dashboard')}</h1>
            <p className="text-gray-600 mt-1">{t('welcome')}, {user?.name} ({t('role_admin')})</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleOpenCreateModal} className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors shadow-sm">
              {t('create_task')}
            </button>
            <button onClick={logout} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm">
              {t('logout_btn')}
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder={t('search_placeholder')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full" />
          <select value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg outline-none w-full bg-white">
            <option value="">{t('all_assignees')}</option>
            {MOCK_USERS.filter(u => u.role === 'employee').map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg outline-none w-full bg-white">
            <option value="">{t('all_statuses')}</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('all_tasks')} ({filteredTasks.length})</h2>
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-10 bg-white rounded-xl shadow-sm border border-gray-200">{t('no_tasks')}</p>
          ) : (
            filteredTasks.map(task => {
              const assignee = MOCK_USERS.find(u => u.id === task.assigneeId);
              return (
                <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between gap-4 transition-all hover:shadow-md">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'}`}>{task.priority}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-2">
                      <span>👤 {t('assigned_to')}: <span className="font-medium text-gray-700">{assignee?.name || 'Unknown'}</span></span>
                      <span>📅 {t('created')}: {task.createdAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-3 sm:items-end min-w-[120px]">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${task.status === 'Done' ? 'bg-green-50 border-green-200 text-green-700' : task.status === 'In Progress' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>{task.status}</span>
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => handleOpenEditModal(task)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Edit">✏️</button>
                      <button onClick={() => { if(window.confirm(`${t('delete_confirm')} '${task.title}'?`)) deleteTask(task.id) }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">🗑️</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingTask ? t('edit_task') : t('new_task')}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">{t('title')}</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">{t('description')}</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">{t('priority')}</label>
                  <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">{t('status')}</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">{t('assignee')}</label>
                <select required value={formData.assigneeId} onChange={e => setFormData({...formData, assigneeId: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" disabled>{t('select_employee')}</option>
                  {MOCK_USERS.filter(u => u.role === 'employee').map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">{t('cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
                  {editingTask ? t('btn_update_task') : t('btn_create_task')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}