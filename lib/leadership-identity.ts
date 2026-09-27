export function leadershipMonogram(slug:string){
  const map:Record<string,string>={
    "tamim-bin-hamad-al-thani":"TH",
    "abdullah-bin-hamad-al-thani":"AH",
    "mohammed-bin-abdulrahman-al-thani":"MA"
  };
  return map[slug]??"QA";
}
