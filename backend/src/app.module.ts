import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432, 
      username: "myuser",
      password: "mysecretpassword",
      database: "mydatabase",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, 
    }),
    UsersModule,
    AuthModule,
    TasksModule
  ],
})
export class AppModule {}

