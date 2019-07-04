import { Triumph } from './triumph';

export class PresentationNode {
  description: string;
  name: string;
  icon: string;
  hasIcon: boolean;
  rootViewIcon: string;
  scope: number;
  children: Children;
  objectiveHash: string;
  parentNodeHashes: Array<string>;
  hash: string;
}

export class Children {
  presentationNodes: Array<string>;
  records: Array<string>;
}
