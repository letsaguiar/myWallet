import { generateId } from "./generate-id";

import { getMock } from "./get-mock";

export class BaseRepositoryMock {
  public data: any[];

  constructor(path: string) {
    this.data = getMock(path);
  }

  public create(dto) {
    return {
        id: generateId(this.data),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        ...dto,
    }
  }

  public save(item) {
    this.data.push(item);
  }

  public update(id: number, dto) {
    const item = this.data[id];

    for(const [key, value] of Object.entries(dto)) {
      item[key] = value;
    }
  }

  public findOneBy(criteria) {
    const [key, value] = Object.entries(criteria)[0];
    const entries = this.data.find(item => item[key] === value);

    return entries[0];
  }

  public softDelete(id: number) {
    const item = this.data[id];

    item.deleted_at = new Date();
  }
}