interface RoutePath extends String {}
export function Route(path: string): RoutePath {
    return path;
}
