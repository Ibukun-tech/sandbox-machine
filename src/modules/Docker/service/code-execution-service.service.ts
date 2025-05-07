import { Injectable, Logger } from '@nestjs/common';
import { DockerService } from './docker-service.service';
import { LanguageRegistryService } from './language-registry.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueuedExecution } from './docker.type';

@Injectable()
export class CodeExecutionService {
  private readonly logger = new Logger(CodeExecutionService.name);
  constructor(
    private readonly dockerService: DockerService,
    private readonly languageService: LanguageRegistryService,
    @InjectQueue('code-execution')
    private readonly executionQueue: Queue<QueuedExecution>,
  ) {}
  private setUpQueueProcessor() {
    // this.executionQueue.add();
  }
}
