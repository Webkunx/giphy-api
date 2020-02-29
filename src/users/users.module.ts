import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { appConfig } from "src/config/app.config";

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: appConfig.secretKeyJwt,
      signOptions: { expiresIn: appConfig.expirationJwtTokenTime },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
