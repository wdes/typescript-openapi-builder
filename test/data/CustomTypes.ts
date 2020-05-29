export interface CustomResponse {
    bool: boolean;
    bool2: true;
    bool3: false;
    bool4?: false;
    string1: 'astring';
    string2: string;
    string3?: string;
    num: number;
    num2: Number;
    num3?: number;
    num4?: 2;
    itself: CustomResponse;
    itself2?: CustomResponse;
    obj: {
        _bool: boolean;
        _bool2: true;
        _bool3: false;
        _bool4?: false;
        _string1: 'astring';
        _string2: string;
        _string3?: string;
        obj: {
            __bool: boolean;
            __bool2: true;
            __bool3: false;
            __bool4?: false;
            __string1: 'astring';
            __string2: string;
            __string3?: string;
        };
    };
    obj2: {};
    obj3: {
        ___v1: 1;
    };
}

export interface CustomError {
    num: number;
    message: string;
}
