import {
  applyDecorators,
  createParamDecorator,
  Injectable,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { GrabpassService } from '../grabpass.service'

import type {
  CallHandler,
  CanActivate,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import type { Request } from 'express'

const GRABPASS_AUTH_CONTEXT = 'GRABPASS_AUTH_CONTEXT'

export type AuthContext = {
  id: number
}

export const AuthContext = createParamDecorator(
  (_, context: ExecutionContext) => {
    const req: Request = GqlExecutionContext.create(context).getContext().req
    return req[GRABPASS_AUTH_CONTEXT]
  }
)

export function Auth() {
  return applyDecorators(UseGuards(GrabpassGraphqlAuthGuard))
}

@Injectable()
export class GrabpassGraphqlAuthGuard implements CanActivate {
  constructor(private readonly grabpass: GrabpassService) {}

  canActivate(context: ExecutionContext) {
    const req: Request = GqlExecutionContext.create(context).getContext().req
    const authorization = req.headers.authorization

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException()
    }

    const accessToken = authorization.replace('Bearer ', '')

    try {
      req[GRABPASS_AUTH_CONTEXT] = (({ id }: AuthContext) => {
        return {
          id
        }
      })(this.grabpass.verifyAccessToken(accessToken))
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}

export function UseAuthContext() {
  return applyDecorators(UseInterceptors(GrabpassGraphqlAuthInterceptor))
}

@Injectable()
export class GrabpassGraphqlAuthInterceptor implements NestInterceptor {
  constructor(private readonly grabpass: GrabpassService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req: Request = GqlExecutionContext.create(context).getContext().req
    const authorization = req.headers.authorization

    if (authorization && authorization.startsWith('Bearer ')) {
      const accessToken = authorization.replace('Bearer ', '')

      try {
        req[GRABPASS_AUTH_CONTEXT] = (({ id }: AuthContext) => {
          return {
            id
          }
        })(this.grabpass.verifyAccessToken(accessToken))
      } catch {}
    }
    return next.handle()
  }
}
