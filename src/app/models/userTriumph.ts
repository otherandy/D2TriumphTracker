export class UserTriumph {
  state: number;
  objectives: Array<UserTriumphObjective> = new Array<UserTriumphObjective>();
}

export class UserTriumphObjective {
   complete: boolean;
   completionValue: number;
   objectiveHash: string;
   progress: number;
   visible: boolean;
}
