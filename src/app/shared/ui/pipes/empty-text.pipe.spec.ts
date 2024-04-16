import { EmptyTextPipe } from './empty-text.pipe';

describe('EmptyTextPipe', () => {
  let pipe: EmptyTextPipe;

  beforeEach(() => {
    pipe = new EmptyTextPipe();
  });

  it('should return original text', () => {
    const result = pipe.transform('hola');
    expect(result).toEqual('hola');
  });

  it('should return hyphen', () => {
    const result = pipe.transform(null);
    expect(result).toEqual('-');
  });
});
