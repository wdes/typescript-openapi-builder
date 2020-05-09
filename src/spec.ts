import { FileMetadata, BuiltDecorator, ControllerMethod, ControllerClass } from './builders';
import { OpenAPIObject } from './interfaces';
import { DocumentBuilder } from './scan/document-builder';
import { ApiOperationOptions } from './decorators';

const methodNames = ['Get', 'Post', 'Patch', 'Put', 'Delete', 'Head'];

interface MethodRoute {
    method: string;
    path: string;
}

export default class Spec {
    private static getRouteFromDecorators(decs: BuiltDecorator[], defaultRoute: string): string[] {
        const paths: string[] = [];
        decs.forEach((dec) => {
            if (dec.name && ['Route'].includes(dec.name)) {
                let path = defaultRoute;
                if (dec.args as any) {
                    path = (dec.args as any)['0'];
                }
                paths.push(path);
            }
        });
        return paths;
    }

    private static getTagsFromDecorators(decs: BuiltDecorator[]): string[] {
        const tags: string[] = [];
        decs.forEach((dec) => {
            if (dec.name && ['ApiTags'].includes(dec.name)) {
                tags.push(...Object.values(dec.args));
            }
        });
        return tags;
    }

    private static getApiOperationOptionsFromDecorators(decs: BuiltDecorator[]): ApiOperationOptions {
        let options: ApiOperationOptions = {};
        decs.forEach((dec) => {
            if (dec.name && ['ApiOperation'].includes(dec.name)) {
                options = (dec.args as any)['0'];
            }
        });
        return options;
    }

    private static getSecurityFromDecorators(decs: BuiltDecorator[]): [string, string[]][] {
        const tags: [string, string[]][] = [];
        decs.forEach((dec) => {
            if (dec.name && ['ApiSecurity'].includes(dec.name)) {
                const reqs: string[] = Object.values(dec.args).slice(1);
                const obj: [string, string[]] = [(dec.args as any)['0'], [...reqs]];
                tags.push(obj);
            }
        });
        return tags;
    }

    private static getMethodsFromDecorators(
        decs: BuiltDecorator[],
        controllerRoute: string,
        defaultRoute: string
    ): MethodRoute[] {
        const paths: MethodRoute[] = [];
        decs.forEach((dec) => {
            if (dec.name && methodNames.includes(dec.name)) {
                let path = defaultRoute;
                if (dec.args as any) {
                    path = controllerRoute + (dec.args as any)['0'];
                }
                paths.push({
                    method: dec.name.toLowerCase(),
                    path: path,
                });
            }
        });
        return paths;
    }

    public static buildSpecFromCollectedMeta(fileMetas: FileMetadata[], document: DocumentBuilder): OpenAPIObject {
        const oa = document.build() as OpenAPIObject;

        const registerMethod = (method: ControllerMethod, controller: ControllerClass) => {
            const controllerRoutes: string[] = Spec.getRouteFromDecorators(controller.decorators, '/');
            const controllerTags: string[] = Spec.getTagsFromDecorators(controller.decorators);
            const methodTags: string[] = Spec.getTagsFromDecorators(method.decorators);
            const controllerSecurity = Spec.getSecurityFromDecorators(controller.decorators);
            const methodSecurity = Spec.getSecurityFromDecorators(method.decorators);
            const methodOperationOptions = Spec.getApiOperationOptionsFromDecorators(method.decorators);
            controllerRoutes.forEach((controllerRoute) => {
                const methodRoutes = this.getMethodsFromDecorators(
                    method.decorators,
                    controllerRoute,
                    controllerRoute + '/' + method.name
                );
                methodRoutes.forEach((methodRoute) => {
                    if (oa.paths[methodRoute.path]) {
                        oa.paths[methodRoute.path] = {
                            ...oa.paths[methodRoute.path],
                            [methodRoute.method]: {
                                tags: controllerTags.concat(methodTags),
                                security: controllerSecurity.concat(methodSecurity),
                                responses: {},
                                summary: method.documentation,
                                description: method.documentation,
                                ...methodOperationOptions,
                            },
                        };
                    } else {
                        oa.paths[methodRoute.path] = {
                            [methodRoute.method]: {
                                tags: controllerTags.concat(methodTags),
                                security: controllerSecurity.concat(methodSecurity),
                                responses: {},
                                summary: method.documentation,
                                description: method.documentation,
                                ...methodOperationOptions,
                            },
                        };
                    }
                });
            });
        };
        oa.paths = {};
        fileMetas.forEach((fileMeta) => {
            fileMeta.controllers.forEach((controller) => {
                controller.methods.forEach((method) => registerMethod(method, controller));
            });
        });
        return oa;
    }
}
