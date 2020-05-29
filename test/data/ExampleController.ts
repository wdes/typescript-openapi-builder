import { Post, Get, Delete, Patch, Put } from '../../src/decorators/api-methods.decorator';
import { Route } from '../../src/decorators/api-route.decorator';
import { ApiHeader } from '../../src/decorators/api-header.decorator';
import { ApiBearerAuth } from '../../src/decorators/api-bearer.decorator';
import { ApiResponse } from '../../src/decorators/api-response.decorator';
import { ApiOperation } from '../../src/decorators/api-operation.decorator';
import { ApiTags } from '../../src/decorators/api-use-tags.decorator';
import { ApiSecurity } from '../../src/decorators/api-security.decorator';
import { CustomResponse, CustomError } from './CustomTypes';

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
