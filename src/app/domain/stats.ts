export class OperationsByDateRange {

    since!: string;
    interval!: string;

    timeline!: OpsInRange[];

    operations!: {[key: string]: number};

    count!: number;

    constructor(fields: Partial<OperationsByDateRange> = {}) {
        Object.assign(this, fields);
    }

}

export class OpsInRange {
    initRange!: string;
    count!: number;
    avgDuration!: number;
    countByOperation!: {[key: string]: number};

    constructor(fields: Partial<OpsInRange> = {}) {
        Object.assign(this, fields);
    }
}