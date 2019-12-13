import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  
  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath || 'test.env'));
    Logger.log(`Using ${filePath} file`, 'Environment');
  }
  
  get(key: string): string {
    return this.envConfig[key];
  }
}
