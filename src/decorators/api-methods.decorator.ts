enum methods {
    HEAD,
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
}

export function Head(value?: string): methods.HEAD {
    return methods.HEAD;
}

export function Get(value?: string): methods.GET {
    return methods.GET;
}

export function Post(value?: string): methods.POST {
    return methods.POST;
}

export function Put(value?: string): methods.PUT {
    return methods.PUT;
}

export function Patch(value?: string): methods.PATCH {
    return methods.PATCH;
}

export function Delete(value?: string): methods.DELETE {
    return methods.DELETE;
}
