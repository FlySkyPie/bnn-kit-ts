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
        perceptron.addLink(0, 1023, false);

        expect(perceptron.compute(new Uint8Array([0x01]))[0]).toEqual(0x80);
    });

    it('compute case 2', () => {
        const perceptron = new Perceptron(10);
        perceptron.addLink(0, 500, true)
            .addLink(500, 1023, true);

        expect(perceptron.compute(new Uint8Array([0x01]))[0]).toEqual(0x80);
    });

    it(`Link shound't override input value`, () => {
        const perceptron = new Perceptron(10);
        perceptron.addLink(0, 1, true)
            .addLink(1, 1023, false);

        const dummyInput = new Uint8Array([0x00]);

        expect(perceptron.compute(dummyInput)[0]).toEqual(0x00);
    });

    it(`Test recurrent connection`, () => {
        const perceptron = new Perceptron(10);
        perceptron.addLink(1023, 1023, true);

        const dummyInput = new Uint8Array([0x00]);

        expect(perceptron.compute(dummyInput)[0]).toEqual(0x80);
        expect(perceptron.compute(dummyInput)[0]).toEqual(0x00);
        expect(perceptron.compute(dummyInput)[0]).toEqual(0x80);
        expect(perceptron.compute(dummyInput)[0]).toEqual(0x00);
    });
});
