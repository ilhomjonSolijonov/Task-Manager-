import { AnimatePresence, motion } from "framer-motion"


const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="space-y-3 pb-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div key={task.id} className="p-3 rounded-xl shadow-md shadow-gray-300 dark:shadow-gray-800 dark:bg-gray-800 bg-white space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{task.title}</h3>
              <div className='flex justify-between h-auto my-5'>
                <p className="text-gray-600 dark:text-gray-300 w-3/5">
                  {task.desc.length > 130 ? task.desc.slice(0, 130) + " . . ." : task.desc}
                </p>
                <div className="text-md border w-[150px] h-[45px] flex justify-center items-center rounded-2xl dark:text-gray-300 text-gray-600">
                  {task.status} 
                </div>
              </div>
              <div className='flex justify-between '>
                <div className="text-md dark:text-gray-300 text-gray-600">
                  <span className='border px-5 py-1.5 rounded-2xl mr-2'>{task.priority}</span> | {new Date(task.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <button className="btn 	bg-blue-500 hover:bg-blue-600 " onClick={() => onEdit(task)}>Изменить</button>
                  <button className="btn 	bg-red-500 hover:bg-red-600" onClick={() => onDelete(task.id)}>Удалить</button>
                </div>
              </div>
              
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;