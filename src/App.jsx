import { useEffect, useReducer, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import ThemeButton from "./components/ThemeButton"
import { ThemeProvider } from './context/ThemeContext'
import "./index.css"
import { taskReducer } from "./reducers/reducer"

import { FaTasks } from "react-icons/fa"
import { MdOutlineAddTask } from "react-icons/md"

import { AnimatePresence, motion } from "framer-motion"



const getInitialTasks = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
};

const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, [], getInitialTasks);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdate = (task) => {
    if (task.id) {
      dispatch({ type: "UPDATE_TASK", payload: task });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: { ...task, id: uuidv4(), createdAt: Date.now() },
      });
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks
    .filter((t) => (filterStatus ? t.status === filterStatus : true))
    .filter((t) => (filterPriority ? t.priority === filterPriority : true))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sort === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));

  return (
    <ThemeProvider>
      <div className='w-full min-h-screen dark:bg-gray-900 bg-gray-100 text-gray-800'>
        <div className=" max-w-6xl mx-auto">
          
          <div className="flex flex-wrap items-center justify-between py-4">
            <h1 className="text-2xl flex items-center gap-3 text-gray-900 dark:text-white font-bold min-w-[120px]">
             <FaTasks /> Task Manager
            </h1>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input min-w-[200px] md:w-[60%]"
              placeholder="Поиск..."
            />

            <div className="min-w-[40px]">
              <ThemeButton />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input w-full  min-w-[150px]"
              >
                <option value="">Все статусы</option>
                <option value="В процессе">В процессе</option>
                <option value="Выполнено">Выполнено</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="input w-full min-w-[150px] "
              >
                <option value="">Все приоритеты</option>
                <option value="Низкий">Низкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
              </select>

              <div></div>

              <button
                onClick={() => setSort((prev) => (prev === "asc" ? "desc" : "asc"))}
                className="btn 	bg-blue-500 hover:bg-blue-600 "
              >
                Сортировать ({sort})
              </button>

              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingTask(null);
                }}
                className="btn flex items-center justify-center gap-2 text-lg	bg-blue-500 hover:bg-blue-600"
              >
                <MdOutlineAddTask /> Добавить
              </button>
          </div>

          <hr className='border-gray-300 my-10' />
         
          <AnimatePresence>
            {showForm && (
              <motion.div
                key="task-form"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TaskForm
                  task={editingTask}
                  onSubmit={handleAddOrUpdate}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingTask(null);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <TaskList
            tasks={filteredTasks}
            onEdit={(task) => { setEditingTask(task); setShowForm(true); }}
            onDelete={(id) => {
              if (confirm("Вы уверены?")) {
                dispatch({ type: "DELETE_TASK", payload: id });
              }
            }}
          />
        </div>
      </div>
    </ThemeProvider>
    
    
  );
};

export default App;



