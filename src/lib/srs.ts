/**
 * SM-2 Spaced Repetition Algorithm adapted for multiple-choice questions.
 *
 * Based on the SuperMemo SM-2 algorithm.
 * Quality scale: 0 = wrong, 1 = correct
 */

export interface SRSCard {
  repetitionCount: number;
  easeFactor: number;  // default 2.5
  intervalDays: number;
}

export interface SRSResult {
  repetitionCount: number;
  easeFactor: number;
  intervalDays: number;
  dueDate: Date;
}

/**
 * Calculate next review date based on whether the answer was correct.
 */
export function calculateNextReview(card: SRSCard, correct: boolean): SRSResult {
  let { repetitionCount, easeFactor, intervalDays } = card;

  if (!correct) {
    // Wrong answer: reset to beginning, penalize ease factor
    repetitionCount = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    intervalDays = 1;
  } else {
    // Correct answer: progress interval
    repetitionCount += 1;
    easeFactor = Math.max(1.3, easeFactor + 0.1);

    if (repetitionCount === 1) {
      intervalDays = 1;
    } else if (repetitionCount === 2) {
      intervalDays = 3;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + intervalDays);

  return { repetitionCount, easeFactor, intervalDays, dueDate };
}
