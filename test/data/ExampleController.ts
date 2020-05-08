import { Post, Get, Delete, Patch } from '../../src/decorators/api-methods';
import { Route } from '../../src/decorators/api-route.decorator';
import { ApiHeader } from '../../src/decorators/api-header.decorator';
import { ApiBearerAuth } from '../../src/decorators/api-bearer.decorator';

@Route('/admin')
export class ExampleController {
    @Get('/list')
    @ApiHeader({
        name: 'Is-Cool',
        description: 'The is cool header',
    })
    public getFooList(req, res): void {
        return;
    }

    @Post('/add')
    public addToFooList(req, res): void {
        return;
    }

    @Delete('/delete')
    @ApiBearerAuth()
    public deleteFromFooList(req, res): void {
        return;
    }

    @Patch()
    public patch(req, res): void {
        return;
    }
}

@Patch('/legacy/patch')
function legacyPatch(req, res): void {
    return;
}
