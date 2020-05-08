import { Post, Get, Delete } from '../../src/decorators/api-methods';
import { ApiHeader } from '../../src/decorators/api-header.decorator';
import { ApiBearerAuth } from '../../src/decorators/api-bearer.decorator';
export class ExampleController {
    @Get()
    @ApiHeader({
        name: 'Is-Cool',
        description: 'The is cool header',
    })
    public async getFooList(req, res): void {
        return;
    }

    @Post()
    public async addToFooList(req, res): void {
        return;
    }

    @Delete()
    @ApiBearerAuth()
    public async deleteFromFooList(req, res): void {
        return;
    }
}
