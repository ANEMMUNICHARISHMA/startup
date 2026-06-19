import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_LEADS, INITIAL_TASKS } from '../data/mockData';

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage('crm-leads', INITIAL_LEADS);
  const [tasks, setTasks] = useLocalStorage('crm-tasks', INITIAL_TASKS);

  const addLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      history: [
        {
          id: `h-${Date.now()}-init`,
          date: new Date().toISOString(),
          type: 'Created',
          message: `Lead created manually: Assigned to ${leadData.owner || 'Unassigned'}.`
        }
      ],
      value: Number(leadData.value) || 0,
      notes: leadData.notes || '',
      ...leadData
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = (leadId, updatedFields) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => {
        if (lead.id === leadId) {
          const historyEntries = [];
          
          // Log stage transitions
          if (updatedFields.stage && updatedFields.stage !== lead.stage) {
            historyEntries.push({
              id: `h-${Date.now()}-stage`,
              date: new Date().toISOString(),
              type: 'Stage Changed',
              message: `Stage updated from '${lead.stage}' to '${updatedFields.stage}'.`
            });
          }

          // Log value adjustments
          if (updatedFields.value !== undefined && Number(updatedFields.value) !== lead.value) {
            historyEntries.push({
              id: `h-${Date.now()}-val`,
              date: new Date().toISOString(),
              type: 'Value Updated',
              message: `Deal value adjusted from $${lead.value.toLocaleString()} to $${Number(updatedFields.value).toLocaleString()}.`
            });
          }

          // Log owner updates
          if (updatedFields.owner && updatedFields.owner !== lead.owner) {
            historyEntries.push({
              id: `h-${Date.now()}-owner`,
              date: new Date().toISOString(),
              type: 'Owner Assigned',
              message: `Lead owner reassigned from ${lead.owner || 'None'} to ${updatedFields.owner}.`
            });
          }

          return {
            ...lead,
            ...updatedFields,
            value: updatedFields.value !== undefined ? Number(updatedFields.value) : lead.value,
            history: [...lead.history, ...historyEntries]
          };
        }
        return lead;
      })
    );
  };

  const deleteLead = (leadId) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    // Clean up related tasks too
    setTasks((prev) => prev.filter((task) => task.leadId !== leadId));
  };

  const addHistoryLog = (leadId, type, message) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            history: [
              ...lead.history,
              {
                id: `h-${Date.now()}-log`,
                date: new Date().toISOString(),
                type: type || 'Note Added',
                message
              }
            ]
          };
        }
        return lead;
      })
    );
  };

  const addTask = (taskText, leadId = null, date = 'Today') => {
    const newTask = {
      id: `task-${Date.now()}`,
      text: taskText,
      done: false,
      date,
      leadId
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        tasks,
        addLead,
        updateLead,
        deleteLead,
        addHistoryLog,
        addTask,
        toggleTask,
        deleteTask
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}
