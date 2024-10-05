

export const getNodeValue = (buffer: Uint8Array, nodeId: number): boolean => {
    const targetIndex = Math.floor(nodeId / 8);
    const bitIndex = nodeId % 8;
    const mask = 1 << bitIndex;

    return Boolean(buffer[targetIndex] & mask);
};


export const setNodeValue = (buffer: Uint8Array, nodeId: number, value: boolean): void => {
    const targetIndex = Math.floor(nodeId / 8);
    const bitIndex = nodeId % 8;
    const mask = 1 << bitIndex;
    const maskWithValue = (+value) << bitIndex;

    buffer[targetIndex] = (buffer[targetIndex] & (~mask)) | maskWithValue;
};
