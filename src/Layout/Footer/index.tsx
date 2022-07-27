import { chAppconfig } from '../../config';
import './index.scss'

function Footer() {
  return (
    <div className="footer">
      <h4>Version: {chAppconfig.appVersion}</h4>
    </div>
  );
}

export default Footer;