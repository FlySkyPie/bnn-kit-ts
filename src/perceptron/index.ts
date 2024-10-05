import { getNodeValue, setNodeValue } from "./utility";

type IComputeNode = {
    // nodeId: number,
    forwards: [nodeId: number, weight: boolean][],
    backwords: [nodeId: number, weight: boolean][],
}

export class Perceptron {
    private buffer: Uint8Array;

    private memoBuffer: Uint8Array;

    private computeNodes = new Map<number, IComputeNode>()

    /**
     * Bytes of buffer.
     */
    private readonly bufferSize: number;

    constructor(
        /**
         * Network size = 2^networkBoundaryFactor.
         */
        private networkBoundaryFactor: number,
        private inputFactor: number = 3,
        private outputFactor: number = 3,
    ) {
        this.bufferSize = Math.pow(2, networkBoundaryFactor - 3);
        this.buffer = new Uint8Array(this.bufferSize);
        this.memoBuffer = new Uint8Array(this.bufferSize);
    }

    public addLink(source: number, target: number, weight: boolean): this {
        const node = this.computeNodes.get(target);
        if (!node) {
            const newNode: IComputeNode = {
                backwords: [],
                forwards: [],
            }

            if (source < target) {
                newNode.forwards.push([source, weight]);

            } else {
                newNode.backwords.push([source, weight]);
            }

            this.computeNodes.set(target, newNode);
            return this;
        }

        if (source < target) {
            node.forwards.push([source, weight]);

        } else {
            node.backwords.push([source, weight]);
        }

        return this;
    }

    public compute(input: Uint8Array) {
        /**
         * Store previous data.
         */
        for (let index = 0; index < this.bufferSize; index++) {
            this.memoBuffer[index] = this.buffer[index];
        }

        /**
         * Write data.
         */
        for (let index = 0; index < input.length; index++) {
            this.buffer[index] = input[index];
        }

        const sortedNodes = Array.from(this.computeNodes).sort((a, b) => a[0] - b[0]);
        for (let index = 0; index < sortedNodes.length; index++) {
            const [nodeId, { backwords, forwards }] = sortedNodes[index];

            let result = true;

            // Extract values from source nodes
            for (let j = 0; j < backwords.length; j++) {

                const [nodeId, weight] = backwords[j];
                const _value = getNodeValue(this.memoBuffer, nodeId);
                const value = (!weight && _value) || (weight && !_value);

                result = result && value;
            }

            for (let j = 0; j < forwards.length; j++) {

                const [nodeId, weight] = forwards[j];
                const _value = getNodeValue(this.buffer, nodeId);
                const value = (!weight && _value) || (weight && !_value);

                result = result && value;
            }

            setNodeValue(this.buffer, nodeId, result);
        }

        return this.buffer.slice(this.bufferSize - Math.pow(2, this.outputFactor - 3));
    }
};
