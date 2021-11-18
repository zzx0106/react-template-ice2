import { CSSModule } from '@/utils/css-module';
import styles from './index.module.scss';

function Footer() {
  return (
    <p styleName="footer">
      <span styleName="logo">Alibaba Fusion</span>
      <br />
      <span styleName="copyright">© 2019-现在 Alibaba Fusion & ICE</span>
    </p>
  );
}
export default CSSModule(Footer, styles);
