import * as ts from 'typescript';

export interface DecoratorProperties {
    [key: string]: string;
}

export interface BuiltDecorator {
    name?: string;
    properties?: DecoratorProperties;
}

export interface ControllerMethod {
    name: string;
    decorators: BuiltDecorator[];
}

export interface FileMetadata {
    fileName: string;
    methods: ControllerMethod[];
}

export default class Builders {
    public static getDecorators(node: ts.Node): BuiltDecorator[] {
        let builtDecorators: BuiltDecorator[] = [];
        node.decorators.forEach((decorator) => {
            const theDecorator: BuiltDecorator = {};
            if (decorator.expression.kind === ts.SyntaxKind.CallExpression) {
                const call = decorator.expression as ts.CallExpression;
                if (call.expression.kind === ts.SyntaxKind.Identifier) {
                    const identifier = call.expression as ts.Identifier;
                    theDecorator.name = identifier.text;
                }
                if (call.arguments.length > 0) {
                    theDecorator.properties = this.extractObject(call);
                }
            }
            builtDecorators.push(theDecorator);
        });
        return builtDecorators;
    }

    private static extractObject(call: ts.CallExpression): DecoratorProperties {
        let properties: DecoratorProperties = {};
        call.arguments.forEach((arg) => {
            if (arg.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                properties = {};
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
                }, properties);
            }
        });
        return properties;
    }

    public static buildMetaForFiles(fileNames: string[]): FileMetadata[] {
        let program = ts.createProgram(fileNames, {});
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
            };
            const visitNode = (node: ts.Node): ts.Node => {
                if (ts.isMethodDeclaration(node)) {
                    let method: ControllerMethod = {
                        name: ((node as ts.MethodDeclaration).name as ts.Identifier).text,
                        decorators: Builders.getDecorators(node),
                    };
                    fileMeta.methods.push(method);
                }
                return ts.visitEachChild(node, visitNode, context);
            };
            ts.visitNode(sourceFile, visitNode);
            analysedFiles.push(fileMeta);
        });
        return analysedFiles;
    }
}
