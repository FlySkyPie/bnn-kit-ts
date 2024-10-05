export type ILink = {
    source: number;
    target: number;
    weight: boolean;
};


export type ILinkShort = {
    /**
     * Node id of source.
     */
    s: number;

    /**
     * Node id of target.
     */
    t: number;

    /**
     * Weight of the link.
     */
    w: 0 | 1;
};

export type INetwork = {
    links: ILink[];
};