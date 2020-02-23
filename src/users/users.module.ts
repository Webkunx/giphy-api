import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: "kek",
      signOptions: { expiresIn: "3600s" },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
