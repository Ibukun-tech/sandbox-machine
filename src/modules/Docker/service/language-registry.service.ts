import { Injectable, Logger } from '@nestjs/common';
import { LanguageConfig } from './docker.type';
@Injectable()
export class LanguageRegistryService {
  logger = new Logger(LanguageRegistryService.name);
  private readonly languages: Map<string, LanguageConfig> = new Map();
  constructor() {}
  registerLanguages() {
    this.registerLanguage({
      name: 'nodejs',
      extensions: ['js'],
      defaultTimeout: 5000,
      image: 'code-executor-nodejs:latest',
      memoryLimit: '256m',
      cpuLimit: '0.5',
    });

    this.registerLanguage({
      name: 'golang',
      extensions: ['go'],
      defaultTimeout: 10000, // Go compilations takes longer
      image: 'code-executor-go:latest',
      memoryLimit: '256m',
      cpuLimit: '0.5',
    });

    // this.registerLanguage({
    //   name: 'python',
    //   extensions: ['py'],
    //   defaultTimeout: 5000,
    //   image: 'code-executor-python:latest',
    //   memoryLimit: '256m',
    //   cpuLimit: '0.5',
    // });
  }
  private registerLanguage(config: LanguageConfig) {
    this.languages.set(config.name, config);
  }

  getLanguages(): LanguageConfig[] {
    return Array.from(this.languages.values());
  }

  getLanguageByName(name: string) {
    return this.languages.get(name);
  }

  getLanguageByExtension(ext: string): LanguageConfig | undefined {
    ext = ext.startsWith('.') ? ext.substring(1) : ext;
    for (const lang of this.languages.values()) {
      if (lang.extensions.includes(ext)) {
        return lang;
      }
    }
    return undefined;
  }
  isSupported(name: string): boolean {
    return this.languages.has(name);
  }
}
