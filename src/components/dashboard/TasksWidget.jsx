import { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { Plus, CheckCircle2, Circle, Calendar, Trash2, Link } from 'lucide-react';

export default function TasksWidget() {
  const { tasks, addTask, toggleTask, deleteTask, leads } = useLeads();
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [taskDate, setTaskDate] = useState('Today');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addTask(newTaskText, selectedLeadId || null, taskDate);
    setNewTaskText('');
    setSelectedLeadId('');
    setTaskDate('Today');
  };

  // Find lead name for display
  const getLeadName = (leadId) => {
    const lead = leads.find((l) => l.id === leadId);
    return lead ? `${lead.name} (${lead.company})` : '';
  };

  return (
    <div className="bg-surface border border-border dark:border-border/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border dark:border-border/80">
        <div>
          <h3 className="font-display font-semibold text-sm text-text dark:text-slate-50">
            Tasks & Follow-ups
          </h3>
          <p className="text-[11px] text-text/50 dark:text-text/60">
            Keep track of your client engagements
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 dark:bg-blue-950/40 text-primary dark:text-primary">
          {tasks.filter((t) => !t.done).length} pending
        </span>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto max-h-[220px] mt-4 space-y-3 pr-1">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-xs text-text/50 dark:text-text/60">No tasks on your list. Sit back!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start justify-between gap-3 p-2.5 rounded-lg border border-slate-100 dark:border-border dark:border-border/50 hover:bg-background dark:hover:bg-slate-700/50 dark:hover:bg-surface/30 transition-all ${
                task.done ? 'bg-background/30 dark:bg-surface/10' : 'bg-surface'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 text-text/50 hover:text-primary dark:text-text/60 dark:hover:text-primary transition-colors"
                >
                  {task.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>
                <div>
                  <p className={`text-xs font-medium leading-normal ${
                    task.done 
                      ? 'line-through text-text/50 dark:text-text/60' 
                      : 'text-text dark:text-text dark:text-text/30'
                  }`}>
                    {task.text}
                  </p>
                  
                  {/* Metadata: Date and Lead details */}
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-text/50 dark:text-text/60">
                      <Calendar className="w-3 h-3" />
                      {task.date}
                    </span>
                    {task.leadId && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary dark:text-primary/80 max-w-[160px] truncate">
                        <Link className="w-2.5 h-2.5 flex-shrink-0" />
                        {getLeadName(task.leadId)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action: Delete Task */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-text/40 hover:text-red-500 dark:text-text/70 dark:text-text/40 dark:hover:text-red-400 p-0.5 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-surface dark:hover:bg-slate-700 dark:hover:bg-surface transition-all"
                style={{ opacity: 1 /* Force visible for touchability */ }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-slate-100 dark:border-border dark:border-border/80 space-y-2">
        <input
          type="text"
          placeholder="Add follow-up task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="w-full h-8 px-2.5 text-xs text-text dark:text-text/20 bg-background hover:bg-surface dark:hover:bg-slate-700/70 dark:bg-background dark:hover:bg-background/80 border border-border dark:border-border focus:border-primary dark:focus:border-primary rounded-lg outline-none transition-all"
        />

        <div className="flex items-center gap-2">
          {/* Link to Lead Select */}
          <select
            value={selectedLeadId}
            onChange={(e) => setSelectedLeadId(e.target.value)}
            className="flex-1 h-7.5 px-2 text-[11px] text-text/60 dark:text-text/50 bg-background border border-border dark:border-border rounded-md outline-none cursor-pointer"
          >
            <option value="">Link to Lead (None)</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name} ({lead.company})
              </option>
            ))}
          </select>

          {/* Date Select */}
          <select
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="h-7.5 px-2 text-[11px] text-text/60 dark:text-text/50 bg-background border border-border dark:border-border rounded-md outline-none cursor-pointer"
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="Next Week">Next Week</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="h-7.5 w-7.5 flex items-center justify-center bg-primary hover:bg-primary text-text rounded-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
