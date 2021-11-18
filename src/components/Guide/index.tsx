import { RootDispatch } from '@/store/store';
import { CSSModule } from '@/utils/css-module';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';

const Guide = () => {
  console.log('guide', new URL(import.meta.url));
  const dispatch = useDispatch<RootDispatch>().common;
  return (
    <div styleName="container">
      <h2 styleName="title">Welcome to ice</h2>

      <p styleName="description">This is a awesome project, enjoy it!</p>

      <div styleName="action">
        <button onClick={() => dispatch.add(2)}>add</button>
      </div>
    </div>
  );
};

export default CSSModule(Guide, styles);
