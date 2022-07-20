
interface apiDiaryGetEntryNickname {
  status: boolean
  data: diaryData[]
}

type diaryData = {
  id: string;
  Food: {
    Interfood: {
      InterfoodType: {
        name: string;
      };
    };
    FoodProperite: {
      gramm: number;
      kcal: number;
      portein: number;
      fat: number;
      ch: number;
    };
    name: string;
    portion: number;
  };
  User: {
    nickname: string;
    email: string;
  };
  createdAt: Date;
}

type simpleDiaryData = {
  gramm: number;
  kcal: number;
  portein: number;
  fat: number;
  ch: number;
  id: string;
  date: Date;
  nickname: string;
  foodName: string;
  foodType: string;
  portion: number;
}

export type {
  apiDiaryGetEntryNickname,
  diaryData,
  simpleDiaryData
}