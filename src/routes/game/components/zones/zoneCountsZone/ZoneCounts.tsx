import React, { useState } from 'react';
import { GiAngelOutfit, GiGroundSprout } from 'react-icons/gi';
import { GiDroplets } from "react-icons/gi";
import { FaPrayingHands } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from 'app/Hooks';
import { RootState } from 'app/Store';
import { setCardListLoadFocus } from 'features/game/GameSlice';
import Displayrow from 'interface/Displayrow';
import styles from './ZoneCounts.module.css';
import classNames from 'classnames';

export const ZoneCounts = (prop: Displayrow) => {
  const soulCount = useAppSelector((state: RootState) =>
    prop.isPlayer
      ? state.game.playerOne.SoulCount
      : state.game.playerTwo.SoulCount
  );

  const bloodDebt = useAppSelector((state: RootState) =>
    prop.isPlayer
      ? state.game.playerOne.bloodDebtCount
      : state.game.playerTwo.bloodDebtCount
  );

  const earthCount = useAppSelector((state: RootState) =>
    prop.isPlayer
      ? state.game.playerOne.earthCount
      : state.game.playerTwo.earthCount
  );

  const blessingsCount = useAppSelector((state: RootState) =>
    prop.isPlayer
      ? state.game.playerOne.blessingsCount
      : state.game.playerTwo.blessingsCount
  );

  if (!soulCount && !bloodDebt && !earthCount && !blessingsCount) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <SoulCount {...prop} />
        <BloodDebtCount {...prop} />
        <EarthCount {...prop} />
        <BlessingsCount {...prop} />
      </div>
    </div>
  );
};

const SoulCount = (prop: Displayrow) => {
  const [hasSoul, setHasSoul] = useState(false);
  const dispatch = useAppDispatch();
  const { isPlayer } = prop;
  const soulCount = useAppSelector((state: RootState) =>
    isPlayer ? state.game.playerOne.SoulCount : state.game.playerTwo.SoulCount
  );

  const soulDisplay = () => {
    const playerPronoun = isPlayer ? 'Your' : "Opponent's";
    const popUpName = isPlayer ? 'mySoulPopup' : 'theirSoulPopup';
    dispatch(
      setCardListLoadFocus({
        query: popUpName,
        name: `${playerPronoun} Soul`
      })
    );
  };

  if (!hasSoul && soulCount != undefined && soulCount > 0) {
    setHasSoul(true);
  }

  return (
    <>
      {!!hasSoul && (
        <div
          title="Soul"
          className={styles.clickableItem}
          onClick={soulDisplay}
        >
          <GiAngelOutfit /> {soulCount}
        </div>
      )}
    </>
  );
};

const EarthCount = (prop: Displayrow) => {
  const [hasEarth, setHasEarth] = useState(false);
  const dispatch = useAppDispatch();
  const { isPlayer } = prop;
  const earthCount = useAppSelector((state: RootState) =>
    isPlayer ? state.game.playerOne.earthCount : state.game.playerTwo.earthCount
  );

  if (!hasEarth && earthCount != undefined && earthCount > 0) {
    setHasEarth(true);
  }

  return (
    <>
      {!!hasEarth && (
        <div
          title="Earth Cards Count"
          className={styles.NotClickableItem}
        >
          <GiGroundSprout /> {earthCount}
        </div>
      )}
    </>
  );
};

const BlessingsCount = (prop: Displayrow) => {
  const [hasBlessings, setHasBlessings] = useState(false);
  const dispatch = useAppDispatch();
  const { isPlayer } = prop;
  const blessingsCount = useAppSelector((state: RootState) =>
    isPlayer ? state.game.playerOne.blessingsCount : state.game.playerTwo.blessingsCount
  );

  if (!hasBlessings && blessingsCount != undefined && blessingsCount > 0) {
    setHasBlessings(true);
  }

  return (
    <>
      {!!hasBlessings && (
        <div
          title="Count Your Blessings"
          className={styles.NotClickableItem}
        >
          <FaPrayingHands /> {blessingsCount}
        </div>
      )}
    </>
  );
};

const BloodDebtCount = (prop: Displayrow) => {
  const [hasBloodDebt, setHasBloodDebt] = useState(false);
  const dispatch = useAppDispatch();
  const { isPlayer } = prop;
  const bloodDebtCount = useAppSelector((state: RootState) =>
    isPlayer
      ? state.game.playerOne.bloodDebtCount
      : state.game.playerTwo.bloodDebtCount
  );
  const isImmune = useAppSelector((state: RootState) =>
    isPlayer
      ? state.game.playerOne.bloodDebtImmune
      : state.game.playerTwo.bloodDebtImmune
  );

  const BloodDebtDisplay = () => {
    const playerPronoun = isPlayer ? 'Your' : "Opponent's";
    const popUpName = isPlayer ? 'myBloodDebtPopup' : 'theirBloodDebtPopup';
    dispatch(
      setCardListLoadFocus({
        query: popUpName,
        name: `${playerPronoun} BloodDebt`
      })
    );
  };

  if (!hasBloodDebt && bloodDebtCount != undefined && bloodDebtCount > 0) {
    setHasBloodDebt(true);
  }

  const bloodDebtItem = classNames(
    { [styles.isRed]: !isImmune },
    styles.NotClickableItem
  );

  return (
    <>
      {!!hasBloodDebt ? (
        <div title={`Blood Debt${bloodDebtCount === 1 ? '' : 's'}`} className={bloodDebtItem}>
          <GiDroplets /> {bloodDebtCount}
        </div>
      ) : (
        <div className={styles.item}> </div>
      )}
    </>
  );
};

export default ZoneCounts;
