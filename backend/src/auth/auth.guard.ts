import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RolesEnum[]>('role', context.getHandler());
    console.log("got some roles: " + JSON.stringify(roles));
    console.log("checking user role part: " + JSON.stringify(context.getHandler()));
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("checking user roles with user: " + JSON.stringify(user) + ", and roles: " + JSON.stringify(roles));
    return roles.some(role => user.roles.includes(role));
  }
}
