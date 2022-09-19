import { generateId } from "./generate-id";
import { getMock } from "./get-mock";

class BaseRepositoryMock {
    private data: any[];

    constructor(path: string) {
        this.data = getMock(path);
    }

    public create = jest.fn((dto) => {
        return {
            id: generateId(this.data),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
            ...dto,
        }
    });

    public save = jest.fn((item) => {
        this.data.push(item);
    })

    public update = jest.fn((id: number, dto) => {
        const item = this.data[id - 1];

        for(const [key, value] of Object.entries(dto)) {
            item[key] = value;
        }
    });

    private isMatch(item, criteria) {
        for (const [key, value] of Object.entries(criteria)) {
            if(typeof value === 'object') {
                return this.isMatch(item[key], value);
            }
            
            if (item[key] !== value) {
                return false;
            }
        }

        return true;
    }

    public delete = jest.fn((params) => {
        if (typeof params === 'number') {
            this.data.filter(item => item.id !== params);
        } else if (Array.isArray(params)) {
            this.data.filter(item => !params.includes(item.id));
        } else if (typeof params === 'object') {
            this.data.filter(item => !this.isMatch(item, params));
        }
    });

    public softDelete = jest.fn((id: number) => {
        const item = this.data[id - 1];

        item.deleted_at = new Date();
    });

    public find = jest.fn((criteria) => {
        const params = criteria.where;
        return this.data.filter(item => this.isMatch(item, params));
    });

    public findBy = jest.fn((criteria) => {
        return this.data.filter(item => this.isMatch(item, criteria));
    });

    public findOne = jest.fn((criteria) => {
        return this.find(criteria)[0];
    });

    public findOneBy = jest.fn((criteria) => {
        return this.findBy(criteria)[0];
    });
}

export function getRepositoryMock(path: string) {
    return new BaseRepositoryMock(path);
}