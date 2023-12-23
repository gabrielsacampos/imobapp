import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ClerkCreateUserDTO } from 'src/modules/entities/users/dtos/clerk.dtos';
import { CreateUserDTO } from 'src/modules/entities/users/dtos/create-user.dtos';

@Injectable()
export class ClerkService {
	constructor() { }

	formatData({ data }: ClerkCreateUserDTO): CreateUserDTO {
		const { id: clerk_id, last_name, first_name, email_addresses: emails } = data;

		return {
			name: `${first_name} ${last_name}`,
			email: emails[0].email_address,
			clerk_id,
		};
	}
}
