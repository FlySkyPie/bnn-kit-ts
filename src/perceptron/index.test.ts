import { describe, expect, it } from 'vitest'

import { Perceptron } from '.';


describe('Perceptron', () => {
    it('test output size of compute', () => {
        const result0 = new Perceptron(10, 3, 4).compute(new Uint8Array([0x00]));
        expect(result0.length).toEqual(2);

        const result1 = new Perceptron(10, 3, 5).compute(new Uint8Array([0x00]));
        expect(result1.length).toEqual(4);

        const result2 = new Perceptron(10, 3, 9).compute(new Uint8Array([0x00]));
        expect(result2.length).toEqual(64);
    });

    it('compute case 1', () => {
        const perceptron = new Perceptron(10);
        perceptron.addLink(0, 500, true)
            .addLink(500, 1023, true);

        expect(perceptron.compute(new Uint8Array([0x01]))[0]).toEqual(0x80);
    });
});
