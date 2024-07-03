import { useAppSelector } from '../../store';
import SubmitButton from './SubmitButton'

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
              ? " mx-6 bg-white p-6 rounded-lg shadow-lg mt-8"
              : "mx-6 bg-gray-900 p-6 rounded-lg shadow-lg mt-8 text-white"
          }
        >
          <h2 className="text-2xl font-bold mb-4">
            {title}
          </h2>
          <form onSubmit={onSubmit}>
            {children}
            <SubmitButton theme={theme} />
          </form>
        </div>
  )
}

export default Form