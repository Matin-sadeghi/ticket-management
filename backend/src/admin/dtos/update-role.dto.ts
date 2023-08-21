import { Role } from "@prisma/client";
import { IsArray, IsEnum, IsNotEmpty } from "class-validator";

export class UpdateRoleDto {
  @IsArray()
  @IsNotEmpty()
  roles: Role[];
}
