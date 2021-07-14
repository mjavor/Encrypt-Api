import { ContentProvider } from './ContentProvider';
import { Nullable } from '../../common/type/Nullable';
import axios from 'axios';
import { hasValue } from '../../common/function/Nullable';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export class SamplePdfProvider implements ContentProvider {
  private readonly FILE_URL =
    'http://www.africau.edu/images/default/sample.pdf';

  private fileBuffer: Nullable<Buffer>;

  getContent(): Buffer {
    if (hasValue(this.fileBuffer)) {
      return this.fileBuffer;
    }

    throw new RuntimeException('FileBuffer is empty 😢');
  }

  async downloadFile(): Promise<void> {
    const { data } = await axios.get<Buffer>(this.FILE_URL, {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf',
      },
    });
    this.fileBuffer = data as Buffer;
  }
}
