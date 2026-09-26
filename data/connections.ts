import type {RelationshipType,VerificationStatus} from "@/types";
export type GraphNodeKind="Leadership"|"Institution"|"Strategy"|"Project"|"Place";
export type GraphNode={id:string;label:string;kind:GraphNodeKind;href?:string;verification:VerificationStatus};
export type GraphEdge={id:string;from:string;to:string;relationship:RelationshipType;label:string;evidence:string;sourceUrl:string};
export const graphNodes:GraphNode[]=[
{id:"tamim",label:"Sheikh Tamim bin Hamad Al Thani",kind:"Leadership",href:"/leadership/tamim-bin-hamad-al-thani",verification:"VERIFIED"},
{id:"abdullah",label:"Sheikh Abdullah bin Hamad Al Thani",kind:"Leadership",href:"/leadership/abdullah-bin-hamad-al-thani",verification:"VERIFIED"},
{id:"mohammed",label:"Sheikh Mohammed bin Abdulrahman bin Jassim Al Thani",kind:"Leadership",href:"/leadership/mohammed-bin-abdulrahman-al-thani",verification:"VERIFIED"},
{id:"qatar-rail",label:"Qatar Rail",kind:"Institution",verification:"VERIFIED"},
{id:"qatarenergy",label:"QatarEnergy",kind:"Institution",verification:"VERIFIED"},
{id:"sceai",label:"Supreme Council for Economic Affairs and Investment",kind:"Institution",verification:"VERIFIED"},
{id:"mwani",label:"Mwani Qatar",kind:"Institution",verification:"VERIFIED"},
{id:"mot",label:"Ministry of Transport",kind:"Institution",verification:"VERIFIED"},
{id:"qnv2030",label:"Qatar National Vision 2030",kind:"Strategy",verification:"VERIFIED"},
{id:"doha-metro",label:"Doha Metro",kind:"Project",href:"/projects/doha-metro",verification:"VERIFIED"},
{id:"hamad-port",label:"Hamad Port",kind:"Project",href:"/projects/hamad-port",verification:"VERIFIED"},
{id:"lusail-city",label:"Lusail City",kind:"Project",href:"/projects/lusail-city",verification:"VERIFIED"},
{id:"doha",label:"Doha",kind:"Place",verification:"VERIFIED"},
{id:"lusail",label:"Lusail",kind:"Place",verification:"VERIFIED"}];
export const graphEdges:GraphEdge[]=[
{id:"e1",from:"tamim",to:"qnv2030",relationship:"DIRECT",label:"Planning role before launch",evidence:"The official Amiri Diwan biography states that, while Heir Apparent, he chaired the Supreme Committee responsible for planning Qatar National Vision 2030.",sourceUrl:"https://diwan.gov.qa/hh-the-amir/biography?sc_lang=en"},
{id:"e2",from:"qatar-rail",to:"doha-metro",relationship:"DIRECT",label:"Network manager",evidence:"The Government Communications Office identifies Qatar Rail as the manager of the Doha Metro network.",sourceUrl:"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/programs-projects/"},
{id:"e3",from:"qnv2030",to:"doha-metro",relationship:"DIRECT",label:"QNV programme / project context",evidence:"The Government Communications Office presents Doha Metro among Qatar National Vision 2030 programmes and projects.",sourceUrl:"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/programs-projects/"},
{id:"e4",from:"abdullah",to:"qatarenergy",relationship:"DIRECT",label:"Chairman of the Board",evidence:"The official Deputy Amir biography identifies Sheikh Abdullah as Chairman of the Board of Directors of QatarEnergy.",sourceUrl:"https://www.diwan.gov.qa/en/hh-deputy-amir/biography"},
{id:"e5",from:"abdullah",to:"sceai",relationship:"DIRECT",label:"Vice Chairman",evidence:"The official Deputy Amir biography identifies Sheikh Abdullah as Vice Chairman of the Supreme Council for Economic Affairs and Investment.",sourceUrl:"https://www.diwan.gov.qa/en/hh-deputy-amir/biography"},
{id:"e6",from:"mohammed",to:"sceai",relationship:"DIRECT",label:"Council member",evidence:"The official Government Communications Office biography identifies the Prime Minister as a member of the Supreme Council for Economic Affairs and Investment.",sourceUrl:"https://www.gco.gov.qa/en/state-of-qatar/leadership/prime-minister-and-minister-of-foreign-affairs/"},
{id:"e7",from:"mwani",to:"hamad-port",relationship:"DIRECT",label:"Port manager",evidence:"Mwani Qatar states that Hamad Port is managed by Mwani Qatar.",sourceUrl:"https://www.mwani.com.qa/English/Ports/HamadPort/Pages/default.aspx"},
{id:"e8",from:"mot",to:"hamad-port",relationship:"DIRECT",label:"Supervising ministry",evidence:"Mwani Qatar states that Hamad Port is under the supervision of the Ministry of Transport.",sourceUrl:"https://www.mwani.com.qa/English/Ports/HamadPort/Pages/default.aspx"},
{id:"e9",from:"qnv2030",to:"hamad-port",relationship:"DIRECT",label:"QNV 2030 relationship",evidence:"Mwani Qatar describes Hamad Port as a long-term physical manifestation of Qatar National Vision 2030.",sourceUrl:"https://www.mwani.com.qa/English/Ports/HamadPort/Pages/default.aspx"},
{id:"e10",from:"qnv2030",to:"lusail-city",relationship:"DIRECT",label:"QNV 2030 relationship",evidence:"Lusail's official master-plan page states that the city embodies Qatar National Vision 2030 in real-estate development.",sourceUrl:"https://www.lusail.com/services/lcac/lusail-master-plan/"},
{id:"e11",from:"lusail-city",to:"lusail",relationship:"DIRECT",label:"Project place",evidence:"Lusail City's official site describes the development as Qatar's largest master-planned city.",sourceUrl:"https://www.lusail.com/the-city-of-a-lifetime/"}];
export function nodeById(id:string){return graphNodes.find(node=>node.id===id)}
