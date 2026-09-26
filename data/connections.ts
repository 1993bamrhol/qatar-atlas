import type {RelationshipType,VerificationStatus} from "@/types";
export type GraphNodeKind="Leadership"|"Institution"|"Strategy"|"Project"|"Place";
export type GraphNode={id:string;label:string;kind:GraphNodeKind;href?:string;verification:VerificationStatus};
export type GraphEdge={id:string;from:string;to:string;relationship:RelationshipType;label:string;evidence:string;sourceUrl:string};
export const graphNodes:GraphNode[]=[
{id:"tamim",label:"Sheikh Tamim bin Hamad Al Thani",kind:"Leadership",href:"/leadership/tamim-bin-hamad-al-thani",verification:"VERIFIED"},
{id:"qatar-rail",label:"Qatar Rail",kind:"Institution",verification:"VERIFIED"},
{id:"qnv2030",label:"Qatar National Vision 2030",kind:"Strategy",verification:"VERIFIED"},
{id:"doha-metro",label:"Doha Metro",kind:"Project",href:"/projects/doha-metro",verification:"VERIFIED"},
{id:"doha",label:"Doha",kind:"Place",verification:"VERIFIED"}];
export const graphEdges:GraphEdge[]=[
{id:"e1",from:"tamim",to:"qnv2030",relationship:"DIRECT",label:"Planning role before launch",evidence:"The official Amiri Diwan biography states that, while Heir Apparent, he chaired the Supreme Committee responsible for planning Qatar National Vision 2030.",sourceUrl:"https://diwan.gov.qa/hh-the-amir/biography?sc_lang=en"},
{id:"e2",from:"qatar-rail",to:"doha-metro",relationship:"DIRECT",label:"Network manager",evidence:"The Government Communications Office identifies Qatar Rail as the manager of the Doha Metro network.",sourceUrl:"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/programs-projects/"},
{id:"e3",from:"qnv2030",to:"doha-metro",relationship:"DIRECT",label:"QNV programme / project context",evidence:"The Government Communications Office presents Doha Metro among Qatar National Vision 2030 programmes and projects.",sourceUrl:"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/programs-projects/"}];
export function nodeById(id:string){return graphNodes.find(node=>node.id===id)}
