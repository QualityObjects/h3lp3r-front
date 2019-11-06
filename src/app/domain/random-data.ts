
export enum Gender {
    FEMALE = 'F',
    MALE = 'M'
}

export enum Lang {
    SPANISH = 'ES',
    ENGLISH = 'EN'
}

export class RandomName {
    public first_name: string;
      public last_name: string;
      public last_name2?: string;
      
      
      public gender? : Gender;
      public lang? : Lang;
  }
  