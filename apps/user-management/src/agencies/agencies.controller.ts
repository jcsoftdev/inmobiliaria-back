import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import { AGENCIES_PATTERNS, Agency, AgencyProps } from '@app/contracts/agencies'

import { AgenciesService } from './agencies.service'

@Controller()
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // 🟢 gRPC: Obtener todas las agencias
  @GrpcMethod('AgencyService', AGENCIES_PATTERNS.FIND_ALL)
  findAll(@Payload() props: AgencyProps) {
    console.log('props user management', props)
    return this.agenciesService.findAll(props)
  }

  // 🟢 gRPC: Crear agencia
  @GrpcMethod('AgencyService', AGENCIES_PATTERNS.CREATE)
  create(@Payload() createAgencyDto: Agency) {
    return this.agenciesService.create(createAgencyDto)
  }

  // 🟢 gRPC: Obtener una agencia por ID
  @GrpcMethod('AgencyService', AGENCIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.agenciesService.findOne(id)
  }

  // 🟢 gRPC: Actualizar agencia
  @GrpcMethod('AgencyService', AGENCIES_PATTERNS.UPDATE)
  update(@Payload() updateAgencyDto: Agency) {
    return this.agenciesService.update(updateAgencyDto)
  }

  // 🟢 gRPC: Eliminar agencia
  @GrpcMethod('AgencyService', AGENCIES_PATTERNS.REMOVE)
  remove(@Payload() id: string) {
    return this.agenciesService.remove(id)
  }
}
