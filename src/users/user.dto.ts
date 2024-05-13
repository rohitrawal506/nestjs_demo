import { IsBoolean, IsOptional } from "class-validator";

export class UserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly isAdmin:boolean;
}
