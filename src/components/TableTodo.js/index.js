function TableToDo({currentData, headers, actions = [], startIndex, onStatusToggle, onEditTask, editingId, editTitle, setEditTitle, setEditingId,
}) {
  return (
    <div className="task-table__container">
      <table className="task-table__table">
        <thead>
          <tr className="task-table__header">
            {headers.map(header => (
              <th key={header.key} className="task-table__header-cell">{header.label}</th>
            ))}
            <th className="task-table__header-cell">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((task, index) => (
              <tr key={task.id}>
                <td className="task-table__cell stt">{startIndex + index + 1}</td>
                <td className="task-table__cell title">{task.title}</td>
                <td className="task-table__cell status">
                  <span 
                    className={`task-table__status ${task.status}`}
                    onClick={() => onStatusToggle(task.id, task.status)}
                  >
                    {task.status === "complete" ?"complete": "incomplete"  }
                  </span>
                </td>
                <td className="task-table__cell actions">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      className={`task-table__action-btn ${action.className}`}
                      onClick={() => action.onClick(task)}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="task-table__no-data">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableToDo;


