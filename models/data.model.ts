export interface TranslateModel {
  aIndex: number;
  candidates: string[];
  original: string;
  target: string;
}

export interface MainModel {
  data: TranslateModel;
  handleNextSentence?: any;
}

export interface TextModel {
  index: number;
  text: string;
}

export interface CandidatesModel {
  candidates: string[];
  checkable: boolean;
  handleChangeCandidate: any;
}

export interface TargetTextModel {
  index: number;
  text: string;
  candidate: string;
}
