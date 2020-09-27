
export class OpInput {
    public action?: string;
    public params: {[key: string]: string};

    constructor(fields: Partial<OpResponse> = {}) {
        Object.assign(this, fields);
    }
}

export class OpResponse {
    public input?: OpInput;
    public duration?: number; // ms
    public result: any;
    
    constructor(fields: Partial<OpResponse> = {}) {
        Object.assign(this, fields);
    }
}

export class ErrorInfo {
    errorCode: number;
    errorMsg: string;
    errorData?: { [key: string]: any };
}

export class ErrorResponse {
    error: ErrorInfo;
}


export class BasicResponse {
    success: boolean;
}