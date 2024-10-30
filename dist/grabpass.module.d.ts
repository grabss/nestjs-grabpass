import { DynamicModule } from '@nestjs/common';
import { GrabpassModuleArgs } from './grabpass.interface';
export declare class GrabpassModule {
    static forRoot(args: GrabpassModuleArgs): DynamicModule;
}
