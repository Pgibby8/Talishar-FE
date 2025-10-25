import useAuth from 'hooks/useAuth';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Header.module.scss';
import TalisharLogo from '../../img/CoinLogo.png';
import { BsGithub, BsPersonFill, BsShieldFillCheck } from 'react-icons/bs';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';

const Header = () => {
  const { isLoggedIn, isMod, logOut } = useAuth();

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logOut();
  };

  return (
    <div>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <Link to="/" className={styles.logo}>
              <img
                src={TalisharLogo}
                alt={'Logo Talishar - link to homepage'}
              />
            </Link>
          </li>
          <li>
            <a
              href="https://linktr.ee/Talishar"
              target={'_blank'}
              className={styles.support}
              title={'Patreon Link'}
            >
              Support Us!
            </a>
          </li>
        </ul>
        <ul>
          <li className={styles.languageSelectorListElement}>
            <LanguageSelector />
          </li>
          <li>
            <a
              href="https://github.com/Talishar/Talishar"
              target={'_blank'}
              className={styles.social}
              title={'Github Link'}
            >
              <BsGithub></BsGithub>
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/JykuRkdd5S"
              target={'_blank'}
              className={styles.social}
              title={'Discord Link'}
            >
              <FaDiscord></FaDiscord>
            </a>
          </li>
          <li>
            <a
              href="https://bsky.app/profile/pvtvoid.bsky.social"
              target={'_blank'}
              className={styles.social}
              title={'Bluesky Link'}
            >
              <FaTwitter></FaTwitter>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/talishar_online"
              target={'_blank'}
              className={styles.social}
              title={'Twitter Link'}
            >
              <FaTwitter></FaTwitter>
            </a>
          </li>
          {/*
            <li>
            <a href="https://beta.talishar.net/game/Roguelike/CreateGame.php">
              <GiTreasureMap></GiTreasureMap> <span>RogueLike</span>
            </a>
            </li>
            */}
          {isLoggedIn && isMod && (
            <li>
              <Link to="/mod">
                <BsShieldFillCheck size="0.9em"></BsShieldFillCheck> <span>Mod Page</span>
              </Link>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <Link to="/user">
                <BsPersonFill></BsPersonFill> <span>Profile</span>
              </Link>
            ) : (
              <Link to="/user/login" className={styles.login}>
                <button>Login</button>
              </Link>
            )}
          </li>
          {isLoggedIn && (
            <li>
              <a href="" onClick={handleLogOut}>
                <RiLogoutBoxRLine></RiLogoutBoxRLine> <span>Logout</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Header;
