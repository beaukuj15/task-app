import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { RolesGuard } from './../auth/auth.guard';
import { Roles } from './../auth/roles.decorator';
import { RolesEnum as UserRole } from './../auth/roles.enum';

@Controller('users')
export class UsersController {

	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Roles(UserRole.Admin)
	@UseGuards(RolesGuard)
	getUsers() {
		return this.usersService.findAll();
	}
}
