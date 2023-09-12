import { Controller } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';

@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}
}
