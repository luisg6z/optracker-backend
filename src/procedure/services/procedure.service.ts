import { Injectable } from '@nestjs/common';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProcedureDto } from '../dto/create-procedure.dto';
import { UpdateProcedureDto } from '../dto/update-procedure.dto';
import { GetProcedureAction } from './get-procedure.action';
import { PutProcedureAction } from './put-procedure.action';

@Injectable()
export class ProcedureService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getProcedureAction: GetProcedureAction,
    private readonly putProcedureAction: PutProcedureAction,
  ) {}

  async create(createProcedureDto: CreateProcedureDto) {
    return await this.putProcedureAction.create(createProcedureDto);
  }

  async findAll() {
    return await this.getProcedureAction.findAll();
  }

  async findOne(id: number) {
    try {
      const procedure = await this.getProcedureAction.findOne(id);

      if (procedure.deleteAt) {
        throw new NotFoundError(`A procedure with the id ${id} doesn't exists`);
      }

      return procedure;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      console.log(error.message);
      throw new UnexpectedError('An unexpected error ocurred');
    }
  }

  async update(id: number, updateProcedureDto: UpdateProcedureDto) {
    return await this.putProcedureAction.update(id, updateProcedureDto);
  }

  async remove(id: number) {
    return await this.putProcedureAction.softDelete(id);
  }

  async seed() {
    const procedure = [
      {
        name: 'Evaluación médica completa',
        description:
          'Se hacen pruebas estándares para conocer si el paciente está apto para una operación',
        durationMinutes: 30,
        durationHours: 0,
      },
      {
        name: 'Consentimiento informado',
        description:
          'Identificar que todas las partes están de acuerdo con el procedimiento a realizar',
        durationMinutes: 30,
        durationHours: 0,
      },
      {
        name: 'Preparación del paciente',
        description:
          'Desinfectar al paciente, equipo médico, sala operatoria y demás objetos que son parte del procedimiento',
        durationMinutes: 30,
        durationHours: 0,
      },
      {
        name: 'Anestesia',
        description:
          'Se busca dormir, la zona específica o al paciente, para minimizar el dolor o movimientos involuntarios durante el procedimiento',
        durationMinutes: 30,
        durationHours: 0,
      },
      {
        name: 'Incisión',
        description:
          'Se prepara la zona para acceder al órgano que se vaya a intervenir para abrir al pacinete',
        durationMinutes: 30,
        durationHours: 0,
      },
      {
        name: 'Procedimiento quirúrgico',
        description:
          'Se interviene el órgano que esté siendo el causante del malestar del paciente',
        durationMinutes: 30,
        durationHours: 0,
      },
      {
        name: 'Hemostasia',
        description:
          'Controlar las hemorragias que pueden surgir durante el procedimiento',
        durationMinutes: 30,
        durationHours: 0,
      },
      {
        name: 'Cierre de la incisión',
        description:
          'Una vez finalizado el procedimiento con respecto al punto a tratar se busca cerrar la incisión para que el paciente siga con su recuperación',
        durationMinutes: 30,
        durationHours: 1,
      },
      {
        name: 'Recuperación',
        description:
          'Se mantiene al paciente bajo observación estricta durante las siguientes horas mientras se hace seguimieto al procedimiento',
        durationMinutes: 0,
        durationHours: 4,
      },
      {
        name: 'Cuidados postoperatorios',
        description:
          'Culminó el procedimiento exitosamente y el paciente está bajo observación ante cualquier inconveniente mientras se está recuperando',
        durationMinutes: 0,
        durationHours: 6,
      },
    ];

    procedure.forEach(async (value) => {
      await this.create(value);
    });
  }
}
