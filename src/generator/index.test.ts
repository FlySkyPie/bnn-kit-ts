import { describe, expect, it } from 'vitest'

import { ChromosomeGenerator } from './index';

describe('Generator', () => {
    it('networkBoundarySize:5, gene:64, long mode', () => new Promise<void>((resolve, reject) => {
        const stream = new ChromosomeGenerator({ gene: 64, networkBoundarySize: 5, isShort: false });

        stream.on("data", (chunk) => {
            const gene = JSON.parse(chunk);

            try {
                expect(gene.source).toBeDefined();
                expect(gene.target).toBeDefined();
                expect(gene.weight).toBeDefined();

                expect(gene.source).toBeTypeOf('number');
                expect(gene.target).toBeTypeOf('number');
                expect(gene.weight).toBeTypeOf('boolean');
            } catch (error) {
                reject(error)
            }
        });

        stream.on("end", () => {
            resolve();
        });
    }));

    it('networkBoundarySize:5, gene:64, short mode', () => new Promise<void>((resolve, reject) => {
        const stream = new ChromosomeGenerator({ gene: 64, networkBoundarySize: 5, isShort: true });

        stream.on("data", (chunk) => {
            try {
                const gene = JSON.parse(chunk);
                expect(gene.s).toBeDefined();
                expect(gene.t).toBeDefined();
                expect(gene.w).toBeDefined();

                expect(gene.s).toBeTypeOf('number');
                expect(gene.t).toBeTypeOf('number');
                expect(gene.w).toBeTypeOf('number');
                expect([0, 1]).toContain(gene.w);
            } catch (error) {
                reject(error);
            }
        });

        stream.on("end", () => {
            resolve();
        });
    }));
});
