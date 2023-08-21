import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext){
       
        const rolesHandler = this.reflector.get("roles",context.getHandler())
        const rolesClass = this.reflector.get("roles",context.getClass())
        let roles = [];
        if(rolesHandler&&rolesClass){
             roles = [...rolesHandler,...rolesClass];

        }else if(rolesClass){
             roles = [...rolesClass];
        }else if(rolesHandler){
             roles = [...rolesHandler];
        }
        const {user} = context.switchToHttp().getRequest();
        if(!user){
            return false
        }
       let bool = false;

       for(let i=0;i<user.role.length;i++){
        if(bool) break;
        for(let j = 0 ;j<roles.length;j++){
            if(user.role[i]==roles[j]){
                bool=true;
                break;
            }
        }
       }
 
       return bool;
    }
}