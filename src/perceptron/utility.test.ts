import { describe, expect, it } from 'vitest'

import { getNodeValue, setNodeValue } from './utility';


describe('utility', () => {
    it('getNodeValue', () => {
        expect(getNodeValue(new Uint8Array([0x00]), 0)).toBe(false);

        expect(getNodeValue(new Uint8Array([0x01,]), 0)).toBe(true);
        expect(getNodeValue(new Uint8Array([0x02,]), 1)).toBe(true);

        expect(getNodeValue(new Uint8Array([0b00000001]), 0)).toBe(true);
        expect(getNodeValue(new Uint8Array([0b00000001]), 1)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b00000001]), 2)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b00000001]), 3)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b00000001]), 4)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b00000001]), 5)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b00000001]), 6)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b00000001]), 7)).toBe(false);

        expect(getNodeValue(new Uint8Array([0b10000000]), 0)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b10000000]), 1)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b10000000]), 2)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b10000000]), 3)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b10000000]), 4)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b10000000]), 5)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b10000000]), 6)).toBe(false);
        expect(getNodeValue(new Uint8Array([0b10000000]), 7)).toBe(true);
    });

    it('setNodeValue case 1', () => {
        const buffer = new Uint8Array([0x00]);
        setNodeValue(buffer, 0, true);
        expect(buffer[0]).toBe(0x01);
    });

    it('setNodeValue case 2', () => {
        const buffer = new Uint8Array([0x00]);
        setNodeValue(buffer, 7, true);
        expect(buffer[0]).toBe(0b10000000);
    });

    it('setNodeValue case 3', () => {
        const buffer = new Uint8Array([0xff]);
        setNodeValue(buffer, 0, false);
        expect(buffer[0]).toBe(0b11111110);
    });

    it('setNodeValue case 4', () => {
        const buffer = new Uint8Array([0xff]);
        setNodeValue(buffer, 5, false);
        expect(buffer[0]).toBe(0b11011111);
    });
});
