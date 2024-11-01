import './App.scss';
import './locales/i18n';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import UrlGroup from './components/UrlGroup'
import { useTheme } from './hooks';


export default function App() {
  const { bgColor, light } = useTheme();
  return <UrlGroup bgColor={bgColor} light={light} />
}