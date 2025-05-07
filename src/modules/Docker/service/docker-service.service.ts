import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import { ConfigService } from '@nestjs/config';
import { config } from 'src/config';
import { executeCodeDto } from './docker.type';
import { dockerCommand } from './docker.type';

const exec = promisify(childProcess.exec);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
// const unlink = promisify(fs.unlink);
// const rmDir = promisify(fs.rmdir);
const rm = promisify(fs.rm);
@Injectable()
export class DockerService {
  private readonly logger = new Logger(DockerService.name);
  private readonly baseDir;
  constructor(private readonly configService: ConfigService) {
    this.baseDir = this.configService.get<config>('DOCKER_PATH');
    this.ensureBaseDir();
  }

  private async ensureBaseDir() {
    try {
      await mkdir(this.baseDir, { recursive: true });
      this.logger.log(`Base directory created ${this.baseDir}`);
    } catch (error) {
      throw error;
    }
  }
  async executeCode(dto: executeCodeDto) {
    const { executionId, code, language, timeout } = dto;
    const fileExtensions = {
      nodejs: 'js',
      python: 'py',
      golang: 'go',
    };
    const extension = fileExtensions[language] || 'txt';
    // const extension = fileExtensions[language] ||
    const codeFilename = `code.${extension}`;

    // Create directories for this execution
    // const executionDir = path.join(this.baseDir, executionId);
    const inputDir = path.join(this.baseDir, 'input');
    const outputDir = path.join(this.baseDir, 'output');
    try {
      await mkdir(inputDir, { recursive: true });
      await mkdir(outputDir, { recursive: true });

      await writeFile(path.join(inputDir, codeFilename), code);
      const images = {
        nodejs: 'code-executor-nodejs:latest',
        python: 'code-executor-python:latest',
        go: 'code-executor-go:latest',
      };
      const image = images[language];
      if (!image) {
        throw new Error(`Unsupported language: ${language}`);
      }
      const dockerCommand = this.buildDockerCommand({
        executionId,
        inputDir,
        outputDir,
        codeFilename,
        image,
        timeout,
      });
      const startTime = Date.now();
      await exec(dockerCommand, { timeout: timeout + 1000 });
      const executionTime = Date.now() - startTime;

      const resultFilePath = path.join(outputDir, 'result.json');
      const resultData = await readFile(resultFilePath, 'utf8');
      const result = JSON.parse(resultData);

      result.language = language;
      result.executionId = executionId;
      result.systemExecutionTime = executionTime;

      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private buildDockerCommand(dto: dockerCommand): string {
    const { executionId, inputDir, outputDir, codeFilename, image, timeout } =
      dto;
    return `docker run --rm \
          --name ${executionId} \
          --network none \
          --memory=256m \
          --cpus=0.5 \
          --pids-limit=100 \
          --ulimit nproc=50:50 \
          --read-only \
          --tmpfs /tmp:size=50M,noexec \
          -v ${inputDir}:/sandbox/input:ro \
          -v ${outputDir}:/sandbox/output \
          --security-opt no-new-privileges \
          ${image} \
          "${codeFilename}"`;
  }
  async cleanUpExecution(executionId: string) {
    try {
      await exec(`docker stop ${executionId} --time=1`);

      const executionDir = path.join(this.baseDir, executionId);
      await rm(executionDir, { recursive: true, force: true });
      this.logger.log(`Execution $`);
    } catch (error) {
      this.logger.error(`Error cleaning up execution ${executionId}`);
    }
  }
}
