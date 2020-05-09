import { DocumentBuilder } from './scan/document-builder';
import { OpenAPIObject } from './interfaces';
import * as fs from 'fs';
import * as path from 'path';
import Builders from './builders';
import Spec from './spec';

export class TypeScriptOpenAPIBuilder {
    private static walk(directory: string, callback: (filePath: string) => void): void {
        fs.readdirSync(directory).forEach(function (name) {
            var filePath = path.join(directory, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath);
            } else if (stat.isDirectory()) {
                this.walkSync(filePath, callback);
            }
        });
    }

    private static getAllFilesInDir(directory: string, regex: RegExp): string[] {
        const files: string[] = [];
        this.walk(directory, (filePath) => {
            if (filePath.match(regex)) {
                files.push(filePath);
            }
        });
        return files;
    }

    public static buildSpec(document: DocumentBuilder, directory: string, fileRegex: RegExp): OpenAPIObject {
        const filesToScan = this.getAllFilesInDir(directory, fileRegex);
        const metas = Builders.buildMetaForFiles(filesToScan);
        return Spec.buildSpecFromCollectedMeta(metas, document);
    }

    public static buildJsonSpec(document: DocumentBuilder, directory: string, fileRegex: RegExp): string {
        return JSON.stringify(this.buildSpec(document, directory, fileRegex));
    }
}
