import * as ts from 'typescript';
export interface DecoratorArguments {
    [nbr: number]: DecoratorObjectArgument | string | string[];
}

export interface DecoratorObjectArgument {
    [key: string]: string | boolean;
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
    controllers: ControllerClass[];
}

export default class Builders {
    public static getDecorators(node: ts.Node, checker: ts.TypeChecker): BuiltDecorator[] {
        let builtDecorators: BuiltDecorator[] = [];
        if (!node.decorators) {
            return builtDecorators;
        }
        node.decorators.forEach((decorator) => {
            const theDecorator: BuiltDecorator = {};
            if (decorator.expression.kind === ts.SyntaxKind.CallExpression) {
                const call = decorator.expression as ts.CallExpression;
                //Builders.getTypeForNode(call, checker));
                if (call.expression.kind === ts.SyntaxKind.Identifier) {
                    const identifier = call.expression as ts.Identifier;
                    theDecorator.name = identifier.text;
                }
                const props = Builders.extractObject(call, checker);
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
                            } else if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
                                acc[propName.text] = true;
                            } else if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                                acc[propName.text] = false;
                            }
                        }
                        return acc;
                    }
                }, emptyObj);
                properties[i] = emptyObj;
            } else if (arg.kind === ts.SyntaxKind.StringLiteral) {
                properties[i] = (arg as ts.StringLiteral).text;
            } else if (arg.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                const propValue = arg as ts.ArrayLiteralExpression;
                const values: string[] = [];
                propValue.elements.forEach(element => {
                    if (element.kind === ts.SyntaxKind.StringLiteral) {
                        const propValue = element as ts.StringLiteral;
                        values.push(propValue.text);
                    }
                });
                properties[i] = values;
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
                controllers: [],
            };
            const visitNode = (node: ts.Node, controllerArg?: ControllerClass): ts.Node => {
                if (ts.isClassDeclaration(node)) {
                    const name = (node as ts.ClassDeclaration).name;
                    let controller: ControllerClass = {
                        name: name ? (name as ts.Identifier).text : '',
                        documentation: Builders.getDocumentationForNode(node, checker),
                        methods: [],
                        decorators: Builders.getDecorators(node, checker),
                    };
                    fileMeta.controllers.push(controller);
                    return ts.visitEachChild(node, (node) => visitNode(node, controller), context);
                }
                if (ts.isMethodDeclaration(node)) {
                    const name = (node as ts.MethodDeclaration).name;
                    let method: ControllerMethod = {
                        name: name ? (name as ts.Identifier).text : '',
                        documentation: Builders.getDocumentationForNode(node, checker),
                        decorators: Builders.getDecorators(node, checker),
                    };
                    controllerArg.methods.push(method);
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
