export function Route(path: string): Function {
    return () => {
        return path;
    };
}
