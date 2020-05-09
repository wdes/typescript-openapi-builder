import * as ts from 'typescript';
export interface DecoratorArguments {
    [nbr: number]: DecoratorObjectArgument | string;
}

export interface DecoratorObjectArgument {
    [key: string]: string;
}

export interface BuiltDecorator {
    name?: string;
    value?: string;
    args?: DecoratorArguments;
}

export interface ControllerMethod {
    name: string;
    documentation?: string;
    decorators: BuiltDecorator[];
}
export interface ControllerClass {
    name: string;
    documentation?: string;
    methods: ControllerMethod[];
    decorators: BuiltDecorator[];
}

export interface FileMetadata {
    fileName: string;
    methods: ControllerMethod[];
    controllers: ControllerClass[];
}

export default class Builders {
    public static getDecorators(node: ts.Node, checker: ts.TypeChecker): BuiltDecorator[] {
        let builtDecorators: BuiltDecorator[] = [];
        node.decorators.forEach((decorator) => {
            const theDecorator: BuiltDecorator = {};
            if (decorator.expression.kind === ts.SyntaxKind.CallExpression) {
                const call = decorator.expression as ts.CallExpression;
                //this.getTypeForNode(call, checker));
                if (call.expression.kind === ts.SyntaxKind.Identifier) {
                    const identifier = call.expression as ts.Identifier;
                    theDecorator.name = identifier.text;
                }
                const props = this.extractObject(call, checker);
                if (Object.keys(props).length > 0) {
                    theDecorator.args = props;
                }
            }
            builtDecorators.push(theDecorator);
        });
        return builtDecorators;
    }

    private static extractObject(call: ts.CallExpression, checker: ts.TypeChecker): DecoratorArguments {
        let properties: DecoratorArguments = {};
        call.arguments.forEach((arg, i) => {
            if (arg.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                let emptyObj: DecoratorObjectArgument = {};
                const argument = arg as ts.ObjectLiteralExpression;
                argument.properties.reduce((acc, el) => {
                    if (el.kind === ts.SyntaxKind.PropertyAssignment) {
                        const prop = el as ts.PropertyAssignment;
                        if (prop.name.kind === ts.SyntaxKind.Identifier) {
                            const propName = prop.name as ts.Identifier;
                            if (prop.initializer.kind === ts.SyntaxKind.StringLiteral) {
                                const propValue = prop.initializer as ts.StringLiteral;
                                acc[propName.text] = propValue.text;
                            }
                        }
                        return acc;
                    }
                }, emptyObj);
                properties[i] = emptyObj;
            } else if (arg.kind === ts.SyntaxKind.StringLiteral) {
                properties[i] = (arg as ts.StringLiteral).text;
            }
        });
        return properties;
    }

    public static buildMetaForFiles(fileNames: string[]): FileMetadata[] {
        let program = ts.createProgram(fileNames, {});
        const checker: ts.TypeChecker = program.getTypeChecker();
        // Dummy transformation context
        let context: ts.TransformationContext = {
            startLexicalEnvironment: () => {},
            suspendLexicalEnvironment: () => {},
            resumeLexicalEnvironment: () => {},
            endLexicalEnvironment: () => [],
            getCompilerOptions: () => program.getCompilerOptions(),
            hoistFunctionDeclaration: () => {},
            hoistVariableDeclaration: () => {},
            readEmitHelpers: () => undefined,
            requestEmitHelper: () => {},
            enableEmitNotification: () => {},
            enableSubstitution: () => {},
            isEmitNotificationEnabled: () => false,
            isSubstitutionEnabled: () => false,
            onEmitNode: () => {},
            onSubstituteNode: (hint, node) => node,
        };
        let analysedFiles: FileMetadata[] = [];
        fileNames.forEach((fileToScan: string) => {
            const sourceFile = program.getSourceFile(fileToScan);
            const fileMeta: FileMetadata = {
                fileName: fileToScan,
                methods: [],
                controllers: [],
            };
            const visitNode = (node: ts.Node, controllerArg?: ControllerClass): ts.Node => {
                if (ts.isClassDeclaration(node)) {
                    let controller: ControllerClass = {
                        name: ((node as ts.ClassDeclaration).name as ts.Identifier).text,
                        documentation: this.getDocumentationForNode(node, checker),
                        methods: [],
                        decorators: Builders.getDecorators(node, checker),
                    };
                    fileMeta.controllers.push(controller);
                    return ts.visitEachChild(node, (node) => visitNode(node, controller), context);
                }
                if (ts.isMethodDeclaration(node)) {
                    let method: ControllerMethod = {
                        name: ((node as ts.MethodDeclaration).name as ts.Identifier).text,
                        documentation: this.getDocumentationForNode(node, checker),
                        decorators: Builders.getDecorators(node, checker),
                    };
                    if (controllerArg) {
                        controllerArg.methods.push(method);
                    } else {
                        // Never happens, I hope so
                        fileMeta.methods.push(method);
                    }
                }
                if (ts.isFunctionDeclaration(node)) {
                    let method: ControllerMethod = {
                        name: ((node as ts.FunctionDeclaration).name as ts.Identifier).text,
                        documentation: this.getDocumentationForNode(node, checker),
                        decorators: Builders.getDecorators(node, checker),
                    };
                    fileMeta.methods.push(method);
                }
                return ts.visitEachChild(node, (node) => visitNode(node), context);
            };
            ts.visitNode(sourceFile, visitNode);
            analysedFiles.push(fileMeta);
        });
        return analysedFiles;
    }

    private static getTypeForNode(node: ts.Decorator | ts.CallExpression, checker: ts.TypeChecker): string {
        return checker.typeToString(checker.getTypeAtLocation(node));
    }

    private static getDocumentationForNode(
        node: ts.ClassDeclaration | ts.MethodDeclaration | ts.FunctionDeclaration,
        checker: ts.TypeChecker
    ): string {
        let symbol = checker.getSymbolAtLocation(node.name);
        if (symbol) {
            return ts.displayPartsToString(symbol.getDocumentationComment(checker));
        }
        return '';
    }
}
