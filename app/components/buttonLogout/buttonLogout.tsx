import { CSSProperties, FC } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { AuthService } from '@/services/auth/auth.service';
interface ButtonLogoutProps {
  style?: CSSProperties;
  redirect?: string;
}

const ButtonLogout: FC<ButtonLogoutProps> = ({ style, redirect }) => {
  const logout = () => {
    AuthService.logout();
    window?.location?.reload();
    if (redirect) window?.location.replace(redirect);
  };

  return (
    <div style={style} className={styles.buttonLogoutContainer}>
      <button onClick={logout} style={style} className={styles.buttonLogout}>
        <Image src={'/icons/logout.svg'} alt={'logout'} width={24} height={24}></Image>
        <p>Log out</p>
      </button>
    </div>
  );
};

export default ButtonLogout;
