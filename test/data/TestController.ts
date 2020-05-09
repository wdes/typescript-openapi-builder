import { Get } from '../../src/decorators/api-methods.decorator';
import { Route } from '../../src/decorators/api-route.decorator';

@Route('/dev')
export class TestController {
    /**
     * get the list of dev tools
     */
    @Get('/tools')
    public getDevTools(req, res): void {
        return;
    }
}
