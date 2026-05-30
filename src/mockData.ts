import { 
  Patient, Encounter, PmjayClaim, HospitalBed, ConsentLog, 
  HfrRegistry, HprRegistry, AbhaMaster, Department, Appointment, 
  Admission, BillingRecord, PmjayPackage, AuditLogEntry,
  InventoryItem, Vendor, GoodsReceivedNote
} from "./types";

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "UHID-108291",
    name: "Ramesh Chandra Kumar",
    guardianName: "Bihari Lal Kumar",
    gender: "Male",
    dob: "1968-08-15",
    phone: "9876543210",
    aadhaar: "1234-5678-9012",
    abhaId: "ramesh.kumar@sbx",
    abhaNumber: "45-9102-3342-8812",
    pmjayId: "P-78192-33",
    address: "12, Gole Market, Near Central Post Office",
    state: "Delhi",
    district: "New Delhi",
    bloodGroup: "O+",
    socioeconomicCategory: "BPL (Below Poverty Line)",
    insuranceType: "Cashless PM-JAY",
    registeredAt: "2026-05-20T08:30:00Z"
  },
  {
    id: "UHID-291024",
    name: "Priyanka Devi Patel",
    guardianName: "Sanjay Patel",
    gender: "Female",
    dob: "1983-11-23",
    phone: "8899001122",
    aadhaar: "9876-5432-1088",
    abhaId: "priyanka.patel@sbx",
    abhaNumber: "12-8871-2918-0012",
    pmjayId: "P-12883-99",
    address: "Village Rampur, P.O. Sadar",
    state: "Uttar Pradesh",
    district: "Lucknow",
    bloodGroup: "B+",
    socioeconomicCategory: "SECC Eligible",
    insuranceType: "Cashless PM-JAY",
    registeredAt: "2026-05-22T10:15:00Z"
  },
  {
    id: "UHID-881290",
    name: "Amit Sharma",
    guardianName: "RK Sharma",
    gender: "Male",
    dob: "1995-04-05",
    phone: "7654321098",
    aadhaar: "4532-1245-9988",
    address: "Block C, Sector 4",
    state: "Haryana",
    district: "Gurugram",
    bloodGroup: "A+",
    socioeconomicCategory: "General / APL",
    insuranceType: "Self-Pay",
    registeredAt: "2026-05-24T14:22:00Z"
  }
];

export const INITIAL_ENCOUNTERS: Encounter[] = [
  {
    id: "ENC-1001",
    patientId: "UHID-108291",
    patientName: "Ramesh Chandra Kumar",
    doctorId: "HPR-33290",
    doctorName: "Dr. Arvind Swaminathan",
    department: "Cardiology",
    date: "2026-05-24T09:15:00Z",
    chiefComplaints: "Exertional dyspnea and retrosternal heaviness for last 2 weeks.",
    allergies: "NKA (No Known Allergies)",
    vitals: {
      bp: "138/88",
      pulse: 82,
      temp: 98.4,
      spo2: 96,
      respRate: 18
    },
    soapNotes: {
      subjective: "Patient describes retrosternal compressive chest pain radiating to left arm when climbing stairs. Relieved by rest.",
      objective: "S1 S2 normal. No added murmurs. Lungs clear to auscultation. Minimal pedal edema.",
      assessment: "Chronic Stable Angina, NYHA Class II. R/O Coronary Artery Disease. Hypertension controlled.",
      plan: "Schedule ECG & Echo. Advise coronary angiograph. Double antiplatelets and nitrate support started."
    },
    diagnoses: [
      { code: "I20.9", display: "Angina pectoris, unspecified", system: "ICD-10" },
      { code: "371073007", display: "Retro-sternal chest pain", system: "SNOMED-CT" }
    ],
    prescriptions: [
      {
        medicine: "Ecosprin 75",
        generic: "Aspirin 75 mg",
        dosage: "1 Tab",
        frequency: "Once daily (1-0-0)",
        duration: "30 Days",
        instructions: "After Breakfast",
        substitutionAllowed: true,
        dispensed: true
      },
      {
        medicine: "Clopilet 75",
        generic: "Clopidogrel 75 mg",
        dosage: "1 Tab",
        frequency: "Once daily (0-1-0)",
        duration: "30 Days",
        instructions: "After Lunch",
        substitutionAllowed: true,
        dispensed: true
      },
      {
        medicine: "Monotrate 20",
        generic: "Isosorbide Mononitrate 20 mg",
        dosage: "1 Tab",
        frequency: "Twice daily (1-0-1)",
        duration: "15 Days",
        instructions: "Before Food",
        substitutionAllowed: false,
        dispensed: true
      }
    ],
    labOrders: [
      {
        testCode: "883-9",
        testName: "ECG 12 Lead",
        category: "Radiology",
        status: "Completed",
        resultValue: "Sinus Rhythm with T-wave inversions in V4-V6.",
        criticalAlert: false,
        reportNotes: "Ischemic changes noted in lateral leads. Match with clinical profile."
      },
      {
        testCode: "29258-2",
        testName: "Troponin I",
        category: "Biochemistry",
        status: "Completed",
        resultValue: "0.02 ng/mL (Normal Range: <0.04 ng/mL)",
        criticalAlert: false,
        reportNotes: "No acute myocardial necrosis detected at present."
      }
    ],
    treatmentStatus: "OPD Ongoing"
  }
];

export const INITIAL_CLAIMS: PmjayClaim[] = [
  {
    id: "CLM-9912",
    patientId: "UHID-291024",
    patientName: "Priyanka Devi Patel",
    pmjayId: "P-12883-99",
    diagnosisCode: "K80.20",
    procedureCode: "SG013",
    procedureName: "Laparoscopic Cholecystectomy",
    packageCost: 24000,
    preAuthStatus: "Approved",
    claimStatus: "Approved for Settlement",
    clinicalDocUrl: "/docs/usg_cholelithiasis.pdf",
    investigationDocUrl: "/docs/cbc_lft.pdf",
    submissionDate: "2026-05-23T11:00:00Z",
    queries: [],
    fraudAnalysis: {
      score: 12,
      flags: ["Valid ultrasound attached", "Direct clinical mismatch resolved"],
      explanation: "No anomalies detected. Ultrasound confirms gall bladder calculi (9mm). Surgical indication correlates perfectly with pain history in upper abdomen.",
      recommendation: "Approve",
      auditedAt: "2026-05-23T11:45:00Z"
    }
  }
];

export const INITIAL_BEDS: HospitalBed[] = [
  { id: "B-101", type: "General Ward", bedNumber: "GW-01", pricePerDay: 450, status: "Occupied", patientId: "UHID-291024", patientName: "Priyanka Devi Patel", admittedAt: "2026-05-23T14:30:00Z" },
  { id: "B-102", type: "General Ward", bedNumber: "GW-02", pricePerDay: 450, status: "Available" },
  { id: "B-103", type: "General Ward", bedNumber: "GW-03", pricePerDay: 450, status: "Available" },
  { id: "B-201", type: "Semi Private", bedNumber: "SP-01", pricePerDay: 1200, status: "Available" },
  { id: "B-202", type: "Semi Private", bedNumber: "SP-02", pricePerDay: 1200, status: "Available" },
  { id: "B-301", type: "Private", bedNumber: "PV-01", pricePerDay: 2800, status: "Available" },
  { id: "B-401", type: "ICU", bedNumber: "ICU-01", pricePerDay: 6500, status: "Available" },
  { id: "B-402", type: "ICU", bedNumber: "ICU-02", pricePerDay: 6500, status: "Available" }
];

export const INITIAL_CONSENTS: ConsentLog[] = [
  {
    id: "CNS-4902",
    patientId: "UHID-108291",
    patientName: "Ramesh Chandra Kumar",
    doctorName: "Dr. Arvind Swaminathan",
    purpose: "Longitudinal Clinical History Review for Cardiac Evaluation",
    scope: ["Prescriptions", "Diagnostic Reports", "Discharge Summaries"],
    status: "Active",
    validUntil: "2026-06-25T10:15:00Z",
    grantedAt: "2026-05-24T09:10:00Z"
  }
];

export const INITIAL_HFR: HfrRegistry[] = [
  { id: "HFR-IN-1200", facilityName: "Central Health City Hospital", type: "Multi-Specialty Private", abdmId: "chcity.hfr@ndhm", state: "Delhi", district: "New Delhi", validationStatus: "Verified" },
  { id: "HFR-IN-2500", facilityName: "Sadar District Government Hospital", type: "District General Hospital", abdmId: "sadar.gov@ndhm", state: "Uttar Pradesh", district: "Lucknow", validationStatus: "Verified" }
];

export const INITIAL_HPR: HprRegistry[] = [
  { id: "HPR-33290", name: "Dr. Arvind Swaminathan", role: "Doctor", abdmNumber: "arvind@hpr", specialty: "Cardiology (DM)", registrationNo: "MCI/12839/DL", credentialVerified: true, signatureLinked: true },
  { id: "HPR-90112", name: "Dr. Shruti Aggarwal", role: "Doctor", abdmNumber: "shruti@hpr", specialty: "General Medicine (MD)", registrationNo: "MCI/77812/UP", credentialVerified: true, signatureLinked: true },
  { id: "HPR-44120", name: "Sister Rosamma Varughese", role: "Nurse", abdmNumber: "rosamma@hpr", specialty: "Critical Care / ICU", registrationNo: "INC/9102/DL", credentialVerified: true, signatureLinked: false }
];

export const INITIAL_ABHA_MASTER: AbhaMaster[] = [
  { id: "12-8871-2918-0012", abhaId: "priyanka.patel@sbx", name: "Priyanka Devi Patel", aadhaar: "9876-5432-1088", gender: "Female", dob: "1983-11-23", phone: "8899001122", status: "Active", updatedAt: "2026-05-22T10:15:00Z" },
  { id: "45-9102-3342-8812", abhaId: "ramesh.kumar@sbx", name: "Ramesh Chandra Kumar", aadhaar: "1234-5678-9012", gender: "Male", dob: "1968-08-15", phone: "9876543210", status: "Active", updatedAt: "2026-05-20T08:30:00Z" },
  { id: "55-2201-9988-3412", abhaId: "amit.sharma@sbx", name: "Amit Sharma", aadhaar: "4532-1245-9988", gender: "Male", dob: "1995-04-05", phone: "7654321098", status: "Active", updatedAt: "2026-05-24T14:22:00Z" }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  { code: "CARD", name: "Cardiology", hod: "Dr. Arvind Swaminathan", totalBeds: 25, occupiedBeds: 8, opdCharge: 600, status: "Operational" },
  { code: "MED", name: "General Medicine", hod: "Dr. Shruti Aggarwal", totalBeds: 50, occupiedBeds: 22, opdCharge: 400, status: "Operational" },
  { code: "OPHT", name: "Ophthalmology", hod: "Dr. Arvind Swaminathan", totalBeds: 10, occupiedBeds: 1, opdCharge: 350, status: "Operational" },
  { code: "NEUR", name: "Neurology", hod: "Dr. Shruti Aggarwal", totalBeds: 15, occupiedBeds: 12, opdCharge: 800, status: "Operational" }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "APT-1002", patientId: "UHID-108291", patientName: "Ramesh Chandra Kumar", doctorName: "Dr. Arvind Swaminathan", department: "Cardiology", dateTime: "2026-05-25T11:00:00Z", roomNo: "Room 101", consultType: "OPD", status: "Scheduled" },
  { id: "APT-1003", patientId: "UHID-291024", patientName: "Priyanka Devi Patel", doctorName: "Dr. Shruti Aggarwal", department: "General Medicine", dateTime: "2026-05-25T14:30:00Z", roomNo: "Room 205", consultType: "Follow-up", status: "Checked In" }
];

export const INITIAL_ADMISSIONS: Admission[] = [
  { id: "ADM-8001", patientId: "UHID-291024", patientName: "Priyanka Devi Patel", bedId: "B-101", bedNumber: "GW-01", bedType: "General Ward", admittingDoctor: "Dr. Shruti Aggarwal", admittedAt: "2026-05-23T14:30:00Z", dailyRate: 450, status: "Admitted" }
];

export const INITIAL_BILLING: BillingRecord[] = [
  {
    id: "INV-1004",
    patientId: "UHID-291024",
    patientName: "Priyanka Devi Patel",
    billDate: "2026-05-25T09:00:00Z",
    items: [
      { name: "General Ward Bed Charges (2 Days)", quantity: 2, unitPrice: 450 },
      { name: "Laparoscopic Cholecystectomy Kit", quantity: 1, unitPrice: 12500 },
      { name: "Consumables & PPE Kit", quantity: 1, unitPrice: 1500 }
    ],
    totalAmount: 14900,
    insuranceStatus: "Cashless PM-JAY",
    paymentStatus: "Paid"
  }
];

export const INITIAL_PMJAY_PACKAGES: PmjayPackage[] = [
  { code: "SG013", specialty: "General Surgery", procedureName: "Laparoscopic Cholecystectomy", packageCost: 24000, defaultSlaHours: 48, status: "Active" },
  { code: "CR001", specialty: "Cardiology", procedureName: "Coronary Angiography", packageCost: 15000, defaultSlaHours: 24, status: "Active" },
  { code: "NE005", specialty: "Neurology", procedureName: "Brain MRI with Contrast", packageCost: 9500, defaultSlaHours: 12, status: "Active" }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: "AUD-5091", timestamp: "2026-05-25T10:00:00Z", eventType: "LOGIN", actor: "SuperAdmin (NHA Administrator)", endpoint: "/api/session/login", resourceId: "SYS-ADMIN", status: "SUCCESS", integrityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
  { id: "AUD-5092", timestamp: "2026-05-25T10:15:00Z", eventType: "EMR_ACCESS", actor: "Dr. Arvind (Doctor)", endpoint: "/api/patients/UHID-108291", resourceId: "UHID-108291", status: "SUCCESS", integrityHash: "f68c34ea81a5a92a559d80327e5ec01cd7a2fcf88cb6de990a424a7cf500e212" },
  { id: "AUD-5093", timestamp: "2026-05-25T10:20:00Z", eventType: "CLAIM_SUBMISSION", actor: "Ayushman Mitra (NHA Coordinator)", endpoint: "/api/claims", resourceId: "CLM-9912", status: "SUCCESS", integrityHash: "7a26fba4c13a0fc35292c2a05cf25470d069b1876bd692138a0fcf60021b3cd9" }
];

export const INITIAL_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Surgical Gloves (Size 7.5, Sterile)",
    category: "Critical Consumables",
    centralStockUnits: 2500,
    departmentIssuedUnits: 1200,
    unissuedGrnUnits: 0,
    batchNumber: "B-GLV-9912",
    expiryDate: "2026-12-15",
    vendorId: "VND-101",
    vendorName: "Medisurge Healthcare India",
    unitCost: 15,
    reorderLevel: 500
  },
  {
    id: "INV-002",
    name: "Propofol Injection 10mg/mL (20mL)",
    category: "Anesthetics",
    centralStockUnits: 80,
    departmentIssuedUnits: 140,
    unissuedGrnUnits: 0,
    batchNumber: "B-PPF-2210",
    expiryDate: "2026-06-18",
    vendorId: "VND-102",
    vendorName: "Bharat Anesthetics Pharmachem",
    unitCost: 210,
    reorderLevel: 100
  },
  {
    id: "INV-003",
    name: "Disposable N95 Face Masks",
    category: "Personal Protective Equipment",
    centralStockUnits: 4200,
    departmentIssuedUnits: 3000,
    unissuedGrnUnits: 0,
    batchNumber: "B-N95-8822",
    expiryDate: "2028-04-30",
    vendorId: "VND-103",
    vendorName: "Suraksha Medical Tex",
    unitCost: 8,
    reorderLevel: 1000
  },
  {
    id: "INV-004",
    name: "Ceftriaxone Injection 1g (Antibiotic)",
    category: "General Medicines",
    centralStockUnits: 450,
    departmentIssuedUnits: 720,
    unissuedGrnUnits: 1000,
    batchNumber: "B-CFT-3304",
    expiryDate: "2026-05-29",
    vendorId: "VND-101",
    vendorName: "Medisurge Healthcare India",
    unitCost: 45,
    reorderLevel: 250
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: "VND-101",
    name: "Medisurge Healthcare India",
    contactPerson: "Mr. Rajeev Mehra",
    phone: "9810234567",
    email: "orders@medisurge.in",
    gstNumber: "07AAACM4829J1Z1",
    contractStatus: "Active"
  },
  {
    id: "VND-102",
    name: "Bharat Anesthetics Pharmachem",
    contactPerson: "Dr. Sandeep Kapoor",
    phone: "9888123456",
    email: "gov@bharatpharmachem.co.in",
    gstNumber: "09AABCB1029R2Z0",
    contractStatus: "Active"
  },
  {
    id: "VND-103",
    name: "Suraksha Medical Tex",
    contactPerson: "Mrs. Anita Rao",
    phone: "7011928374",
    email: "sales@surakshamask.com",
    gstNumber: "33AAFCS9924K1Z2",
    contractStatus: "Under Review"
  }
];

export const INITIAL_GRNS: GoodsReceivedNote[] = [
  {
    id: "GRN-9901",
    grnNumber: "NDHM-GRN-2026-1022",
    dateReceived: "2026-05-24T11:20:00Z",
    purchaseOrderId: "PO-2026-9904",
    vendorName: "Medisurge Healthcare India",
    itemsReceived: [
      {
        name: "Surgical Gloves (Size 7.5, Sterile)",
        quantity: 1000,
        unitPrice: 15,
        batchNumber: "B-GLV-9912",
        expiryDate: "2026-12-15"
      }
    ],
    qualityCheckedBy: "Inventory Analyst R. Verma",
    status: "Approved"
  }
];
