import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IOpenGame } from '../gameList/GameList';
import styles from './OpenGame.module.css';
import { generateCroppedImageUrl } from '../../../../utils/cropImages';

const OpenGame = ({
  ix,
  entry,
  isOther
}: {
  ix: number;
  entry: IOpenGame;
  isOther?: boolean;
}) => {
  const navigate = useNavigate();
  const buttonClass = classNames(styles.button, 'secondary');

  return (
    <div 
      key={ix} 
      className={styles.gameItem}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/game/join/${entry.gameName}`);
      }}
      >
      <div>
      {!!entry.p1Hero ? (
        <img className={styles.heroImg} src={generateCroppedImageUrl(entry.p1Hero)} />
      ) : (
        <img className={styles.heroImg} src="https://images.talishar.net/public/crops/UNKNOWNHERO_cropped.png" />
      )}
      </div>
      <div>{entry.description}</div>
      {isOther && <div>{entry.formatName}</div>}
      <div>
        <a
          className={buttonClass}
          href={`/game/join/${entry.gameName}`}
          role="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/game/join/${entry.gameName}`);
          }}
        >
          Join
        </a>
      </div>
    </div>
  );
};

export default OpenGame;
