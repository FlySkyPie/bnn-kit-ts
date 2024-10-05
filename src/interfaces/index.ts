export type ILink = {
    source: number;
    target: number;
    weight: boolean;
};


export type ILinkShort = {
    s: number;
    t: number;
    w: 0 | 1;
};

export type INetwork = {
    links: ILink[];
};