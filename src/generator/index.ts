import { Readable } from 'stream';
import { randomInt } from 'crypto'

type IChromosomeGeneratorOptions = {
    /**
     * The number would affect maximum value of node id.
     * 
     * `NODE_ID_MAX = 2^networkBoundarySize - 1`
     */
    networkBoundarySize: number;

    /**
     * Amount of genes going to generate.
     */
    gene: number;

    /**
     * Output short link.
     * 
     * @default {true}
     */
    isShort?: boolean;
}

export class ChromosomeGenerator extends Readable {
    private nodeIdMax: number;

    private gene: number;

    private geneCount: number = 0;

    private isShort: boolean;

    constructor({ gene, networkBoundarySize, isShort = true }: IChromosomeGeneratorOptions) {
        super();

        this.nodeIdMax = Math.pow(2, networkBoundarySize);
        this.gene = gene;
        this.isShort = isShort;
    }

    _read() {
        if (this.geneCount === this.gene) {
            this.push(null);
            return;
        }

        if (this.isShort) {
            this.push(JSON.stringify({
                s: randomInt(this.nodeIdMax),
                t: randomInt(this.nodeIdMax),
                w: randomInt(2) ? 1 : 0,
            }));
        } else {
            this.push(JSON.stringify({
                source: randomInt(this.nodeIdMax),
                target: randomInt(this.nodeIdMax),
                weight: !!randomInt(2),
            }));
        }

        this.geneCount++;
    }
};
