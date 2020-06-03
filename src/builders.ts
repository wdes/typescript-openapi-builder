import * as ts from 'typescript';
import * as TJS from 'typescript-json-schema';
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

export interface BuiltParameter {
    name: string;
    types?: TJS.Definition[];
    decorators?: BuiltDecorator[];
}

export interface ControllerMethod {
    name: string;
    documentation?: string;
    parameters?: BuiltParameter[];
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
    public static getDecoratorsForNode(node: ts.Node, checker: ts.TypeChecker): BuiltDecorator[] {
        let builtDecorators: BuiltDecorator[] = [];
        if (!node.decorators) {
            return builtDecorators;
        }
        node.decorators.forEach((decorator) => {
            builtDecorators.push(Builders.getBuiltDecoratorFromDecorator(decorator, checker));
        });
        return builtDecorators;
    }

    private static getBuiltDecoratorFromDecorator(decorator: ts.Decorator, checker: ts.TypeChecker): BuiltDecorator {
        const theDecorator: BuiltDecorator = {};
        if (decorator.expression.kind === ts.SyntaxKind.CallExpression) {
            const call = decorator.expression as ts.CallExpression;

            if (call.expression.kind === ts.SyntaxKind.Identifier) {
                const identifier = call.expression as ts.Identifier;
                theDecorator.name = identifier.text;
            }
            const props = Builders.extractObject(call, checker);
            if (Object.keys(props).length > 0) {
                theDecorator.args = props;
            }
        }
        return theDecorator;
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
                propValue.elements.forEach((element) => {
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
        const generator = Builders.buildGeneratorForFiles(fileNames);
        fileNames.forEach((fileToScan: string) => {
            //this.buildJsonSchema(fileToScan);
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
                        decorators: Builders.getDecoratorsForNode(node, checker),
                    };
                    fileMeta.controllers.push(controller);
                    return ts.visitEachChild(node, (node) => visitNode(node, controller), context);
                }
                if (ts.isMethodDeclaration(node)) {
                    const name = (node as ts.MethodDeclaration).name;
                    let method: ControllerMethod = {
                        name: name ? (name as ts.Identifier).text : '',
                        documentation: Builders.getDocumentationForNode(node, checker),
                        decorators: Builders.getDecoratorsForNode(node, checker),
                        parameters: Builders.getMethodParameters(node, checker, generator),
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

    public static getMethodParameters(
        method: ts.MethodDeclaration,
        checker: ts.TypeChecker,
        generator: TJS.JsonSchemaGenerator
    ): BuiltParameter[] {
        let builtParameters: BuiltParameter[] = [];

        if (method.parameters) {
            method.parameters.forEach((param) => {
                const parameter: BuiltParameter = {
                    name: (param.name as ts.Identifier).text,
                };
                if (param.decorators) {
                    parameter.decorators = Builders.getDecoratorsForNode(param, checker);
                }
                if (param.type) {
                    parameter.types = [];

                    const tt = checker.getTypeAtLocation(param.type);
                    const typeArgs = checker.getTypeArguments(tt as ts.TypeReference);
                    typeArgs.forEach((arg) => {
                        const uoI = arg as ts.UnionOrIntersectionType;
                        uoI.types.forEach((ty) => {
                            if (ty.symbol && ty.symbol.escapedName && ty.symbol.members && ty.symbol.members.size > 0) {
                                const json = generator.getSchemaForSymbol(ty.symbol.getName());
                                parameter.types.push(json);
                            }
                        });
                    });
                }
                builtParameters.push(parameter);
            });
        }

        return builtParameters;
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

    public static buildJsonSchema(fileNames: string[]): TJS.Definition[] {
        const generator = Builders.buildGeneratorForFiles(fileNames);
        const symbols = generator.getUserSymbols();
        const schemas: TJS.Definition[] = [];
        symbols.forEach((element) => {
            schemas.push(generator.getSchemaForSymbol(element));
        });
        return schemas;
    }

    public static buildGeneratorForFiles(fileNames: string[]): TJS.JsonSchemaGenerator {
        const settings: TJS.PartialArgs = {
            uniqueNames: false,
            strictNullChecks: true,
            noExtraProps: true,
            required: true,
        };
        const compilerOptions: TJS.CompilerOptions = {
            strictNullChecks: true,
        };
        const program = TJS.getProgramFromFiles(fileNames, compilerOptions);
        return TJS.buildGenerator(program, settings, fileNames);
    }
}
