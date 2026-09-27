export type SourceAccessStatus="ACCESSIBLE"|"REDIRECTED"|"REVIEW_REQUIRED";
export type SourceAccessAudit={checkedOn:string;nextCheckOn:string;status:SourceAccessStatus;note?:string};

export const sourceHealthByUrl:Record<string,SourceAccessAudit>={
"https://diwan.gov.qa/hh-the-amir/biography?sc_lang=en":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.diwan.gov.qa/en/hh-deputy-amir/biography":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.diwan.gov.qa/en/about-qatar/qatars-rulers":{checkedOn:"2026-09-27",nextCheckOn:"2027-03-26",status:"ACCESSIBLE"},
"https://diwan.gov.qa/en/About-Qatar/History-of-Qatar":{checkedOn:"2026-09-27",nextCheckOn:"2027-03-26",status:"ACCESSIBLE"},
"https://diwan.gov.qa/en/About-Qatar/Qatars-Rulers/Sheikh-Jassim-Bin-Mohammed-Bin-Thani":{checkedOn:"2026-09-27",nextCheckOn:"2027-03-26",status:"ACCESSIBLE",note:"Canonical Amiri Diwan URL confirmed during the 2026-09-27 source audit."},
"https://diwan.gov.qa/about-qatar/qatars-rulers/sheikh-abdullah-bin-jassim-al-thani?sc_lang=en":{checkedOn:"2026-09-27",nextCheckOn:"2027-03-26",status:"ACCESSIBLE",note:"Current Amiri Diwan canonical/indexed URL confirmed during the 2026-09-27 source audit."},
"https://www.diwan.gov.qa/en/about-qatar/qatars-rulers/sheikh-ali-bin-abdullah-al-thani":{checkedOn:"2026-09-27",nextCheckOn:"2027-03-26",status:"ACCESSIBLE"},
"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/our-story/":{checkedOn:"2026-09-27",nextCheckOn:"2026-12-26",status:"ACCESSIBLE"},
"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/programs-projects/":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.gco.gov.qa/en/state-of-qatar/leadership/prime-minister-and-minister-of-foreign-affairs/":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.ashghal.gov.qa/en/Projects/Pages/The-Expressway-Programme.aspx":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.qatarenergy.qa/en/WhoWeAre/Pages/WhatIsLNG.aspx":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.qatarenergy.qa/en/Sustainability/Pages/ClimateChangeAction.aspx":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE",note:"Used to track the separate post-2030 capacity horizon alongside the end-2030 North Field target."},
"https://www.mwani.com.qa/English/Ports/HamadPort/Pages/default.aspx":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.qatarairways.com/en-au/press-releases/2014/May/pressrelease_270514_hia_operations.html":{checkedOn:"2026-09-27",nextCheckOn:"2027-03-26",status:"ACCESSIBLE"},
"https://www.lusail.com/services/lcac/lusail-master-plan/":{checkedOn:"2026-09-27",nextCheckOn:"2026-11-26",status:"ACCESSIBLE"},
"https://www.lusail.com/the-city-of-a-lifetime/":{checkedOn:"2026-09-27",nextCheckOn:"2026-12-26",status:"ACCESSIBLE"},
"https://qfz.gov.qa/why_qfz/free-zones/":{checkedOn:"2026-09-27",nextCheckOn:"2026-11-26",status:"ACCESSIBLE"},
"https://qfz.gov.qa/authority/":{checkedOn:"2026-09-27",nextCheckOn:"2026-12-26",status:"ACCESSIBLE"},
"https://qfz.gov.qa/_umm_alhoul/":{checkedOn:"2026-09-27",nextCheckOn:"2026-12-26",status:"ACCESSIBLE"},
"https://qfz.gov.qa/ras-bufontas-4/":{checkedOn:"2026-09-27",nextCheckOn:"2026-12-26",status:"ACCESSIBLE"},
"https://www.mcit.gov.qa/en/nda":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.mcit.gov.qa/en/artificial-intelligence-committee/":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"},
"https://www.mcit.gov.qa/-/media/mcit/documents/strategies/national_artificial_intelligence_strategy_for_qatar_2019_en.pdf":{checkedOn:"2026-09-27",nextCheckOn:"2027-03-26",status:"ACCESSIBLE"},
"https://www.mcit.gov.qa/en/news/he-the-minister-we-envision-fanar-as-high-accuracy-arabic-llm-capable-of-processing-and-understanding-natural-arabic":{checkedOn:"2026-09-27",nextCheckOn:"2026-11-26",status:"ACCESSIBLE",note:"Canonical no-trailing-slash URL confirmed during the source audit."},
"https://visitqatar.com/intl-en/plan-your-trip/getting-around/doha-metro":{checkedOn:"2026-09-27",nextCheckOn:"2026-10-27",status:"ACCESSIBLE"}
};
