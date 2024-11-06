import { DynamicModule } from '@nestjs/common';
import { GrabpassModuleOptions } from './grabpass.interface';
export declare class GrabpassModule {
    static forRoot(options: GrabpassModuleOptions): DynamicModule;
}
