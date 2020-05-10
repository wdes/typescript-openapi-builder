import { Post, Get, Delete, Patch, Put } from '../../src/decorators/api-methods.decorator';
import { Route } from '../../src/decorators/api-route.decorator';
import { ApiHeader } from '../../src/decorators/api-header.decorator';
import { ApiBearerAuth } from '../../src/decorators/api-bearer.decorator';
import { ApiResponse } from '../../src/decorators/api-response.decorator';
import { ApiOperation } from '../../src/decorators/api-operation.decorator';
import { ApiTags } from '../../src/decorators/api-use-tags.decorator';
import { ApiSecurity } from '../../src/decorators/api-security.decorator';

export interface CustomResponse {
    bool: boolean;
    bool2: true;
    bool3: false;
    bool4?: false;
    string1: 'astring';
    string2: string;
    string3?: string;
    num: number;
    num2: Number;
    num3?: number;
    num4?: 2;
    itself: CustomResponse;
    itself2?: CustomResponse;
    obj: {
        _bool: boolean;
        _bool2: true;
        _bool3: false;
        _bool4?: false;
        _string1: 'astring';
        _string2: string;
        _string3?: string;
        obj: {
            __bool: boolean;
            __bool2: true;
            __bool3: false;
            __bool4?: false;
            __string1: 'astring';
            __string2: string;
            __string3?: string;
        };
    };
    obj2: {};
    obj3: {
        ___v1: 1;
    };
}

export interface CustomError {
    num: number;
    message: string;
}

namespace express {
    export interface Request {}

    export interface Response<T> {}
}

/**
 * controller comment
 * @licence MPL-2.0
 */
@Route('/admin')
@ApiTags('admin')
@ApiSecurity('token', ['admin'])
export class ExampleController {
    /**
     * get the list of foo elements
     */
    @Get('/list')
    @ApiHeader({
        name: 'Is-Cool',
        description: 'The is cool header',
    })
    @ApiOperation({
        operationId: 'getFooList',
        deprecated: true,
    })
    public getFooList(
        req: express.Request,
        @ApiResponse() res: express.Response<CustomResponse | {} | boolean | void | CustomError>
    ): void {
        return;
    }

    @Post('/add')
    @ApiSecurity('jwt', ['admin'])
    public addToFooList(req, res): void {
        return;
    }

    @Delete('/delete')
    @ApiBearerAuth()
    @ApiTags('special')
    public deleteFromFooList(req, res): void {
        return;
    }

    @Put('/delete')
    public alsoAPutMethod(req, res): void {
        return;
    }

    @Delete('/legacy/delete')
    @Post('/legacy/delete')
    @Post('/v1/legacy/delete')
    public complicatedRoute(req, res): void {
        return;
    }

    @Patch()
    @ApiSecurity('apitoken')
    public patch(req, res): void {
        return;
    }
}
