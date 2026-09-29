// Central Shared Data & Storage Helper
// You can replace localStorage methods here with Firebase SDK calls in production

const studentData = [
  { rollNo: "25248101", name: "AASHRITHA K" },
  { rollNo: "25248102", name: "ABIRAMI M" },
  { rollNo: "25248103", name: "ABISHAN A" },
  { rollNo: "25248104", name: "ADAM ARAFATH RASHEED" },
  { rollNo: "25248105", name: "ANNAMALAI" },
  { rollNo: "25248106", name: "ANTONY PAUL V" },
  { rollNo: "25248107", name: "ARAVIND D" },
  { rollNo: "25248108", name: "ATIN FOSBERRY" },
  { rollNo: "25248109", name: "BHUVANESHWARI R" },
  { rollNo: "25248110", name: "BOOMIKESH R" },
  { rollNo: "25248111", name: "DEEPIKAA P" },
  { rollNo: "25248112", name: "FAYAZ AHAMED J" },
  { rollNo: "25248113", name: "GOKUL KRISHNA S R" },
  { rollNo: "25248114", name: "HALAN ROCH KAVIDOSS A" },
  { rollNo: "25248115", name: "HARIHARAN M" },
  { rollNo: "25248116", name: "HARINI K" },
  { rollNo: "25248117", name: "HARISH J" },
  { rollNo: "25248118", name: "JANANI K" },
  { rollNo: "25248119", name: "JEFFY JOE J" },
  { rollNo: "25248120", name: "JERESH J" },
  { rollNo: "25248121", name: "KARTHIKEYAN P" },
  { rollNo: "25248122", name: "KAVIARASU T" },
  { rollNo: "25248123", name: "KISHORE K" },
  { rollNo: "25248124", name: "MADESHWAR P" },
  { rollNo: "25248125", name: "MADHUMITHA M" },
  { rollNo: "25248126", name: "M KRITHIKA" },
  { rollNo: "25248127", name: "MOHAMED RAHMAN K S" },
  { rollNo: "25248128", name: "MOHAMMED ASHIK J" },
  { rollNo: "25248129", name: "NAVEEN KUMAR M" },
  { rollNo: "25248130", name: "NAVIN KUMAR S" },
  { rollNo: "25248131", name: "PRADEESH G" },
  { rollNo: "25248132", name: "PRAHAAN ADI D" },
  { rollNo: "25248133", name: "PRATHAP P" },
  { rollNo: "25248134", name: "RAIVATHY S" },
  { rollNo: "25248135", name: "ROHINTH J" },
  { rollNo: "25248136", name: "ROSHAN G" },
  { rollNo: "25248137", name: "SAI PREETHI G" },
  { rollNo: "25248138", name: "SAI PRIYANKA V" },
  { rollNo: "25248139", name: "SANJAY KUMAR M" },
  { rollNo: "25248140", name: "SARIEFA PARVEEN S" },
  { rollNo: "25248141", name: "SARON KUMAR M" },
  { rollNo: "25248142", name: "SHANMUGAPRIYAN K" },
  { rollNo: "25248143", name: "SURIYA PRAKASH K" },
  { rollNo: "25248144", name: "SURIYA S" },
  { rollNo: "25248145", name: "TANISHA SUNILKUMAR" },
  { rollNo: "25248146", name: "THEJUS K" },
  { rollNo: "25248147", name: "THILAGARAJ M" },
  { rollNo: "25248148", name: "THULASIRAM V" },
  { rollNo: "25248149", name: "TUSHAR ZAVIER" },
  { rollNo: "25248150", name: "UMA MAKESHWARI A" },
  { rollNo: "25248151", name: "V DEEPAK" },
  { rollNo: "25248152", name: "VISHNUPRASAD BALARAMAN" },
  { rollNo: "25248153", name: "VISHWA S" },
  { rollNo: "25248154", name: "VIVEK V NAIR" },
  { rollNo: "25248155", name: "V POOJA" },
  { rollNo: "25248156", name: "LOKESHWARAN V" },
  { rollNo: "25248157", name: "SHUBAN M" },
  { rollNo: "25248158", name: "PRAJIN KUMAR" },
  { rollNo: "25248159", name: "SUSHMITHA S" }
];

function getStorageData() {
  return JSON.parse(localStorage.getItem('spd_uploads') || '{}');
}

function saveStorageData(data) {
  localStorage.setItem('spd_uploads', JSON.stringify(data));
}