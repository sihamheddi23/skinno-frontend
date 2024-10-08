import { useAppSelector } from '../../store';

type FormProps = {
    children: React.ReactNode;
    title: string;
    onSubmit: () => void;
};

const Form: React.FC<FormProps> = ({ children, title, onSubmit }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  
  return (
   
        <div
          className={
            theme === "light"
              ? " mx-6 bg-white p-6  rounded-lg shadow-lg my-8 max-h-[1200px]"
              : "mx-6 bg-gray-900 p-6 rounded-lg shadow-lg my-8 text-white max-h-[1200px]"
          }
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {title}
          </h2>
          <form onSubmit={onSubmit}>
            {children}
          </form>
        </div>
  )
}

export default Form