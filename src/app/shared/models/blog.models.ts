import { IBlog } from '../interfaces/blog.interface';

export class Blog implements IBlog{
    constructor(public id: string,
                public title: string,
                public text: string,
                public date: any,
                public author: string) {}
}