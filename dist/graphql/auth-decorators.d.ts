import type { CallHandler, CanActivate, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { Grabpass } from 'grabpass';
export declare const AuthContext: (...dataOrPipes: any[]) => ParameterDecorator;
export declare function Auth(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare class GrabpassGraphqlAuthGuard implements CanActivate {
    private readonly grabpass;
    constructor(grabpass: Grabpass);
    canActivate(context: ExecutionContext): boolean;
}
export declare function UseAuthContext(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare class GrabpassGraphqlAuthInterceptor implements NestInterceptor {
    private readonly grabpass;
    constructor(grabpass: Grabpass);
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
