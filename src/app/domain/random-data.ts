
export enum Gender {
    FEMALE = 'FEMALE',
    MALE = 'MALE'
}

export enum Lang {
    SPANISH = 'ES',
    ENGLISH = 'EN'
}

export class RandomName {
    public firstName: string;
      public lastName: string;
      public lastName2?: string;
      
      
      public gender? : Gender;
      public lang? : Lang;
  }
  