import React, { useEffect } from 'react';
import { useAppSelector } from 'app/Hooks';
import { RootState } from 'app/Store';
import Displayrow from 'interface/Displayrow';
import CardDisplay from '../../elements/cardDisplay/CardDisplay';
import styles from './PermanentsZone.module.css';
import { Card } from 'features/Card';
import isEqual from 'react-fast-compare';
import classNames from 'classnames';
import { shallowEqual } from 'react-redux';
import { HiRewind, HiFastForward } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { selectPermanentsAsStack } from '../../../../../features/game/GameSlice';

export interface CardStack {
  card: Card;
  count: number;
  id: string;
}

export default function PermanentsZone(prop: Displayrow) {
  const { isPlayer } = prop;
  const [scrollCount, setScrollCount] = React.useState(0);

  const permanents = useAppSelector((state: RootState) =>
    selectPermanentsAsStack(state, isPlayer)
  );

  useEffect(() => {
    if (!permanents.length) return;
    if (scrollCount < 0) {
      setScrollCount(0);
    }
    if (scrollCount > permanents.length - 1) {
      setScrollCount(permanents.length - 1);
    }
  }, [scrollCount, permanents.length]);

  if (!permanents.length) {
    return (
      <div className={styles.permanentsWrapper}>
        <div className={styles.permanentsText}>
          <div></div>
        </div>
      </div>
    );
  }

  const cardStackArray = permanents.slice(scrollCount);

  return (
    <div className={styles.permanentsWrapper}>
      <div
        className={classNames(styles.scrollBack, styles.scrollWidget)}
        onClick={() => {
          if (scrollCount === 0) return;
          setScrollCount(scrollCount - 1);
        }}
        onTouchStart={() => {
          if (scrollCount === 0) return;
          setScrollCount(scrollCount - 1);
        }}
      >
        <HiRewind />
      </div>
      <div className={styles.permanentsInner}>
        <motion.div className={styles.permanentsZone} layout>
          <AnimatePresence>
            {cardStackArray.map((cardStack, ix) => {
              const cardContainerStyles = classNames(
                {
                  [styles.stacked]: cardStack.count > 1
                },
                styles.cardContainer
              );
              return (
                <motion.div
                  key={cardStack.id}
                  className={cardContainerStyles}
                  initial={{ opacity: 0, left: -100 }}
                  animate={{ opacity: 1, left: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}                  
                  layout
                >
                  <CardDisplay card={cardStack.card} />
                  {cardStack.count > 1 && (
                    <div
                      title={`Stack of ${cardStack.count}`}
                      className={isPlayer ? styles.counter : styles.counterOpponent}
                      >
                      x {cardStack.count}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
      <div
        className={classNames(styles.scrollForward, styles.scrollWidget)}
        onClick={() => {
          if (scrollCount >= permanents.length - 1) return;
          setScrollCount(scrollCount + 1);
        }}
        onTouchStart={() => {
          if (scrollCount >= permanents.length - 1) return;
          setScrollCount(scrollCount + 1);
        }}
      >
        <HiFastForward />
      </div>
    </div>
  );
}
