import { useEffect, useState } from "react"

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Низкий");
  const [status, setStatus] = useState("В процессе");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDesc(task.desc || "");
      setPriority(task.priority || "Низкий");
      setStatus(task.status || "В процессе");
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Введите название задачи");
      return;
    }

    const updatedTask = {
      ...task,
      title,
      desc,
      priority,
      status,
    };

    onSubmit(updatedTask);
  };

  return (
    <div className='absolute flex h-screen bg-[rgba(0,0,0,0.5)] w-full left-0 top-0 p-4'>
      <div className="w-3xl bg-white dark:bg-gray-900 px-10 py-16 rounded-2xl flex flex-col m-auto   space-y-2 ">
        <label className='dark:text-white pt-4' htmlFor="name">Name</label>
        <input
          className="input h-[60px]"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='dark:text-white pt-4' htmlFor="name">Description</label>
        <textarea
          className="input h-[100px]"
          placeholder="Описание"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label className='dark:text-white pt-4' htmlFor="">Status</label>
        <div className='grid grid-cols-2 gap-4'>
          <select className="input h-[60px]" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Низкий">Низкий</option>
            <option value="Средний">Средний</option>
            <option value="Высокий">Высокий</option>
          </select>
          <select className="input h-[60px]" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="В процессе">В процессе</option>
            <option value="Выполнено">Выполнено</option>
          </select>
        </div>
        
        <div className="flex gap-2 pt-4">
          <button onClick={handleSubmit} className="btn bg-blue-500">Сохранить</button>
          <button onClick={onCancel} className="btn bg-blue-500">Отмена</button>
        </div>
      </div>
    </div>
    
  );
};

export default TaskForm;
