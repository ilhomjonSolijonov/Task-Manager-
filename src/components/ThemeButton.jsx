
import { useDarkMode } from '../context/ThemeContext'

const ThemeButton = () => {

  const {darkMode, setDarkMode} = useDarkMode()

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="dark:text-white text-lg px-6 py-2 border rounded-xl border-gray-300 transition-all cursor-pointer"
      aria-label="Toggle Theme"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeButton;
