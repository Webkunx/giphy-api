import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "kek",
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
