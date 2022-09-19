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
    const item = this.data[id - 1];

    for(const [key, value] of Object.entries(dto)) {
      item[key] = value;
    }
  }

  public softDelete(id: number) {
    const item = this.data[id - 1];

    item.deleted_at = new Date();
  }

  private isMatch(item, filter) {
    for (const [key, value] of Object.entries(filter)) {
      
      if (typeof value === 'object') {
        return this.isMatch(item[key], value);
      }
      
      if (item[key] !== value) {
        return false;
      }
    }

    return true;
  }

  public find(criteria) {
    const whereParams = criteria.where;

    return this.data.filter(item => this.isMatch(item, whereParams));
  }

  public findOne(criteria) {
    return this.find(criteria)[0];
  }

  public findOneBy(criteria) {
    return this.find({ where: criteria })[0];
  }

}