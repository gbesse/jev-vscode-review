export type LineCandidate={id:string;line:number;startCharacter:number;endCharacter:number;text:string};
export type Issue={id:string;label:string;instructions:string;markAbove:number;severity:'information'|'warning'};
export type ReviewPack={id:string;title:string;issues:Issue[]};
export type JevAnswer={type:'noul';noul:number}|{type:'choice';choice:string;probabilities?:Record<string,number>;confidence?:number};
export type JevResponse={model:string;answers:Record<string,JevAnswer>;usage:{input_tokens:number;output_tokens:number}};
export type Finding={issue:Issue;candidate:LineCandidate};

