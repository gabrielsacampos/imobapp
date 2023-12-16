import { Controller, Get } from '@nestjs/common';
import { FinancesRepository } from './finances.repository';

@Controller('finances')
export class FinancesController {
	constructor(private readonly financesRepository: FinancesRepository) { }

	@Get('')
	async getPaidItems() {
		return this.financesRepository.getPaidItems();
	}
}
