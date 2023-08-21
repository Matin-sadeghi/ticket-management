import { Module } from "@nestjs/common";
import { AdminModule } from "src/admin/admin.module";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [AuthModule, AdminModule, UserModule],
})
export class AppModule {}
