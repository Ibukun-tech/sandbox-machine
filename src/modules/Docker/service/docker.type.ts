export interface executeCodeDto {
  executionId: string;
  code: string;
  language: string;
  timeout: number;
}
export interface dockerCommand {
  executionId: string;
  inputDir: string;
  outputDir: string;
  codeFilename: string;
  image: string;
  timeout: number;
}
export interface LanguageConfig {
  name: string;
  extensions: string[];
  defaultTimeout: number; //in milliseconds
  image: string;
  memoryLimit: string;
  cpuLimit: string;
}
export interface CodeSubmission {
  code: string;
  language: string;
}

export interface QueuedExecution extends CodeSubmission {
  executionId: string;
}
