export class Collection<T> {
  private data: { [key: string]: T[] } = {};

  public add(key: string, value: T) {
    if (!(key in this.data)) {
      this.data[key] = [];
    }

    this.data[key]?.push(value);
  }

  public get(key: string): T[] {
    return this.data[key] ?? [];
  }
}
