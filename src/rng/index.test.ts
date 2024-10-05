import { describe, expect, it } from 'vitest'
import { mean, standardDeviation } from 'simple-statistics';
import { randomInt } from 'crypto'

describe('crypto', () => {
    it('Boolean distribution', () => {
        let isTrue = 0;
        let isFalse = 0;

        for (let index = 0; index < 1000000; index++) {
            if (randomInt(2)) {
                isTrue++;
            } else {
                isFalse++;
            }
        }
        expect(isTrue / isFalse).toBeCloseTo(1);
    });

    it('Int distribution', () => {
        const record: Record<number, number> = {};

        for (let index = 0; index < 10000000; index++) {
            const value = randomInt(100);

            record[value] = record[value] === undefined ? 1 :
                record[value] + 1;
        }

        const values = Object.values(record);
        const meanValue = mean(values);
        const standardDeviationValue = standardDeviation(values);

        // All 100 items should be fulfilled.
        expect(values.length).toEqual(100);

        // Mean value.
        expect(meanValue / 100000).toBeCloseTo(1);

        expect(standardDeviationValue/meanValue).toBeLessThan(0.01);
    });
});
