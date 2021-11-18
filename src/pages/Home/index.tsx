import Guide from '@/components/Guide';
import { RootState } from '@/store/store';
import { CSSModule } from '@/utils/css-module';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

import img_logo from '../../assets/images/logo.png';

const Home = () => {
  const useState = useSelector((state: RootState) => state.common);
  return (
    <div styleName="home">
      <img styleName="img" src={img_logo} alt="" />
      <div style={{ textAlign: 'center' }}>{useState.count}</div>
      <Guide />
    </div>
  );
};

export default CSSModule(Home, styles);
