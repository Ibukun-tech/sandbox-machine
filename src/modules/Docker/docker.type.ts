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
