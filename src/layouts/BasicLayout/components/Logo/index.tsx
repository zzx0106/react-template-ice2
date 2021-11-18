/*
 * @Author: linzhihai
 * @Date: 2021-08-26 19:11:49
 * @LastEditTime: 2021-09-22 18:24:38
 * @Description:
 */
import { Link } from 'ice';
import styles from './index.module.scss';
import { CSSModule } from '@/utils/css-module';

export interface ILogoProps {
  image?: string;
  text?: string;
  url?: string;
}

function Logo({ image, text, url }: ILogoProps) {
  return (
    <div className="logo">
      <Link to={url || '/'} styleName="logo">
        {image && <img src={image} styleName="logo-img" alt="logo" />}
        <h1 styleName="logo-title">{text}</h1>
      </Link>
    </div>
  );
}
export default CSSModule(Logo, styles);
