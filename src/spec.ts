import { FileMetadata, BuiltDecorator, ControllerMethod, ControllerClass } from './builders';
import { OpenAPIObject } from './interfaces';
import { DocumentBuilder } from './scan/document-builder';

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

        const registerMethod = (method: ControllerMethod, controller?: ControllerClass) => {
            const controllerRoutes: string[] = controller
                ? this.getRouteFromDecorators(controller.decorators, '/')
                : [''];
            controllerRoutes.forEach((controllerRoute) => {
                const methodRoutes = this.getMethodsFromDecorators(
                    method.decorators,
                    controllerRoute,
                    controllerRoute + '/' + method.name
                );
                methodRoutes.forEach((methodRoute) => {
                    oa.paths[methodRoute.path] = {
                        [methodRoute.method]: {
                            responses: {},
                            summary: method.documentation,
                            description: method.documentation,
                        },
                    };
                });
            });
        };
        oa.paths = {};
        fileMetas.forEach((fileMeta) => {
            fileMeta.controllers.forEach((controller) => {
                controller.methods.forEach((method) => registerMethod(method, controller));
            });
            fileMeta.methods.forEach((method) => registerMethod(method));
        });
        return oa;
    }
}
