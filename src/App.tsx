/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Fingerprint, BookOpen } from "lucide-react";
import Navbar from "./components/Navbar";
import { supabase, mapPatientToDb, mapDbToPatient } from "./supabaseClient";
import UserManual from "./components/UserManual";
import ReceptionistView from "./components/ReceptionistView";
import DoctorView from "./components/DoctorView";
import NurseView from "./components/NurseView";
import AyushmanMitraView from "./components/AyushmanMitraView";
import AncillaryViews from "./components/AncillaryViews";
import SuperAdminAnalytics from "./components/SuperAdminAnalytics";
import InventoryView from "./components/InventoryView";
import MultiPayerWorkflow from "./components/MultiPayerWorkflow";
import LoginPanel, { UserSession, PRESET_PANELISTS } from "./components/LoginPanel";
import { 
  Patient, Encounter, PmjayClaim, HospitalBed, ConsentLog, 
  HfrRegistry, HprRegistry, AbhaMaster, Department, Appointment, 
  Admission, BillingRecord, PmjayPackage, AuditLogEntry 
} from "./types";
import { 
  INITIAL_PATIENTS, INITIAL_ENCOUNTERS, INITIAL_CLAIMS, INITIAL_BEDS, 
  INITIAL_CONSENTS, INITIAL_HFR, INITIAL_HPR, INITIAL_ABHA_MASTER, 
  INITIAL_DEPARTMENTS, INITIAL_APPOINTMENTS, INITIAL_ADMISSIONS, 
  INITIAL_BILLING, INITIAL_PMJAY_PACKAGES, INITIAL_AUDIT_LOGS
} from "./mockData";

export default function App() {
  const [activeUser, setActiveUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem("active_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem("active_user");
    if (saved) {
      try {
        return JSON.parse(saved).role;
      } catch (e) {
        return "Receptionist";
      }
    }
    return "Receptionist";
  });
  const [isManualOpen, setIsManualOpen] = useState(false);

  const handleLogin = (user: UserSession) => {
    setActiveUser(user);
    setCurrentRole(user.role);
    localStorage.setItem("active_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setActiveUser(null);
    localStorage.removeItem("active_user");
  };

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
    const matched = PRESET_PANELISTS.find(p => p.role === role);
    if (matched) {
      setActiveUser(matched);
      localStorage.setItem("active_user", JSON.stringify(matched));
    }
  };
  
  // States holding our hospital records synced with backend mock
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem("hms_patients");
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });
  const [encounters, setEncounters] = useState<Encounter[]>(() => {
    const saved = localStorage.getItem("hms_encounters");
    return saved ? JSON.parse(saved) : INITIAL_ENCOUNTERS;
  });
  const [claims, setClaims] = useState<PmjayClaim[]>(() => {
    const saved = localStorage.getItem("hms_claims");
    return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
  });
  const [beds, setBeds] = useState<HospitalBed[]>(() => {
    const saved = localStorage.getItem("hms_beds");
    return saved ? JSON.parse(saved) : INITIAL_BEDS;
  });
  const [consents, setConsents] = useState<ConsentLog[]>(() => {
    const saved = localStorage.getItem("hms_consents");
    return saved ? JSON.parse(saved) : INITIAL_CONSENTS;
  });
  const [hfr, setHfr] = useState<HfrRegistry[]>(() => {
    const saved = localStorage.getItem("hms_hfr");
    return saved ? JSON.parse(saved) : INITIAL_HFR;
  });
  const [hpr, setHpr] = useState<HprRegistry[]>(() => {
    const saved = localStorage.getItem("hms_hpr");
    return saved ? JSON.parse(saved) : INITIAL_HPR;
  });

  // States holding extended database master tables
  const [abhaMaster, setAbhaMaster] = useState<AbhaMaster[]>(() => {
    const saved = localStorage.getItem("hms_abha_master");
    return saved ? JSON.parse(saved) : INITIAL_ABHA_MASTER;
  });
  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem("hms_departments");
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("hms_appointments");
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });
  const [admissions, setAdmissions] = useState<Admission[]>(() => {
    const saved = localStorage.getItem("hms_admissions");
    return saved ? JSON.parse(saved) : INITIAL_ADMISSIONS;
  });
  const [billing, setBilling] = useState<BillingRecord[]>(() => {
    const saved = localStorage.getItem("hms_billing");
    return saved ? JSON.parse(saved) : INITIAL_BILLING;
  });
  const [pmjayPackages, setPmjayPackages] = useState<PmjayPackage[]>(() => {
    const saved = localStorage.getItem("hms_pmjay_packages");
    return saved ? JSON.parse(saved) : INITIAL_PMJAY_PACKAGES;
  });
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem("hms_audit_logs");
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });
  const [sharedPatientId, setSharedPatientId] = useState<string>("");

  // Sync to localStorage
  useEffect(() => { localStorage.setItem("hms_patients", JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem("hms_encounters", JSON.stringify(encounters)); }, [encounters]);
  useEffect(() => { localStorage.setItem("hms_claims", JSON.stringify(claims)); }, [claims]);
  useEffect(() => { localStorage.setItem("hms_beds", JSON.stringify(beds)); }, [beds]);
  useEffect(() => { localStorage.setItem("hms_consents", JSON.stringify(consents)); }, [consents]);
  useEffect(() => { localStorage.setItem("hms_hfr", JSON.stringify(hfr)); }, [hfr]);
  useEffect(() => { localStorage.setItem("hms_hpr", JSON.stringify(hpr)); }, [hpr]);
  useEffect(() => { localStorage.setItem("hms_abha_master", JSON.stringify(abhaMaster)); }, [abhaMaster]);
  useEffect(() => { localStorage.setItem("hms_departments", JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem("hms_appointments", JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem("hms_admissions", JSON.stringify(admissions)); }, [admissions]);
  useEffect(() => { localStorage.setItem("hms_billing", JSON.stringify(billing)); }, [billing]);
  useEffect(() => { localStorage.setItem("hms_pmjay_packages", JSON.stringify(pmjayPackages)); }, [pmjayPackages]);
  useEffect(() => { localStorage.setItem("hms_audit_logs", JSON.stringify(auditLogs)); }, [auditLogs]);

  const loadData = async () => {
    try {
      const safeJsonFetch = async (url: string, currentFallback: any) => {
        try {
          const r = await fetch(url);
          if (!r.ok) return currentFallback;
          const contentType = r.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return await r.json();
          }
          return currentFallback;
        } catch {
          return currentFallback;
        }
      };

      const [
        pRes, eRes, cRes, bRes, cnRes, hfrRes, hprRes,
        abhaRes, deptRes, aptRes, admRes, billRes, pkgRes, auditRes
      ] = await Promise.all([
        safeJsonFetch("/api/patients", patients),
        safeJsonFetch("/api/encounters", encounters),
        safeJsonFetch("/api/claims", claims),
        safeJsonFetch("/api/beds", beds),
        safeJsonFetch("/api/consents", consents),
        safeJsonFetch("/api/hfr", hfr),
        safeJsonFetch("/api/hpr", hpr),
        safeJsonFetch("/api/abha_master", abhaMaster),
        safeJsonFetch("/api/departments", departments),
        safeJsonFetch("/api/appointments", appointments),
        safeJsonFetch("/api/admissions", admissions),
        safeJsonFetch("/api/billing", billing),
        safeJsonFetch("/api/pmjay_packages", pmjayPackages),
        safeJsonFetch("/api/audit_logs", auditLogs)
      ]);

      // Attempt to load from Supabase - merging results on the fly
      let mergedPatients: Patient[] = [...pRes];
      try {
        const { data: sPats, error: sErr } = await supabase
          .from("patients")
          .select("*")
          .order("registered_at", { ascending: false });
        
        if (sErr) {
          console.warn("Could not query 'patients' table from Supabase yet, default mock dataset will be used. Error:", sErr.message);
        } else if (sPats && sPats.length > 0) {
          const fetchedPats = sPats.map(mapDbToPatient);
          // Merge avoiding duplicates by id (UHID)
          const localIds = new Set(mergedPatients.map(p => p.id));
          fetchedPats.forEach(fp => {
            if (!localIds.has(fp.id)) {
              mergedPatients.unshift(fp); // insert supabase ones at the beginning of the list
            }
          });
          console.log(`Successfully synced and mapped ${sPats.length} patients from Supabase. Total visible: ${mergedPatients.length}`);
        }
      } catch (sbErr) {
        console.warn("Supabase query bypass error:", sbErr);
      }

      setPatients(mergedPatients);
      if (mergedPatients.length > 0) {
        setSharedPatientId(prev => prev || mergedPatients[0].id);
      }
      setEncounters(eRes);
      setClaims(cRes);
      setBeds(bRes);
      setConsents(cnRes);
      setHfr(hfrRes);
      setHpr(hprRes);
      
      // Hydrate extended master tables
      setAbhaMaster(abhaRes);
      setDepartments(deptRes);
      setAppointments(aptRes);
      setAdmissions(admRes);
      setBilling(billRes);
      setPmjayPackages(pkgRes);
      setAuditLogs(auditRes);
    } catch (err) {
      console.error("Failed to load full-stack HMS state indexes:", err);
    }
  };

  // On mount: Fetch state from Express mock API database
  useEffect(() => {
    loadData();
  }, []);

  // Sync callbacks
  const handleAddPatient = async (pat: Patient) => {
    // 1. Write to Supabase (if database schema is set up)
    try {
      const dbRow = mapPatientToDb(pat);
      const { error } = await supabase.from("patients").insert([dbRow]);
      if (error) {
        console.warn("Supabase patient insert failed - make sure you ran the SQL creation script from the database panel! Error:", error.message);
      } else {
        console.log("Patient successfully written to Supabase Cloud Table");
      }
    } catch (sErr) {
      console.error("Supabase client error:", sErr);
    }

    // 2. Also save to current backend
    try {
      const resp = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pat)
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setPatients(prev => {
          if (!prev.some(p => p.id === data.id)) {
            return [...prev, data];
          }
          return prev;
        });
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, fallback directly to memory", err);
    }

    // Fallback state updater
    setPatients(prev => {
      if (!prev.some(p => p.id === pat.id)) {
        return [...prev, pat];
      }
      return prev;
    });
  };

  const handleScanShareRegister = async (abhaId: string, name: string) => {
    try {
      const resp = await fetch("/api/abdm/scan-share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ abhaId, name })
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        if (data.success) {
          // Also write Scan & Share patients to Supabase!
          try {
            const dbRow = mapPatientToDb(data.patient);
            await supabase.from("patients").insert([dbRow]);
          } catch (sErr) {
            console.warn("Supabase skipped for ABDM Token:", sErr);
          }

          // Append patient to state if not exists
          setPatients(prev => {
            if (!prev.some(p => p.id === data.patient.id)) {
              return [...prev, data.patient];
            }
            return prev;
          });
        }
        return data;
      }
    } catch (err) {
      console.warn("Express backend unavailable, executing local scanned client registration", err);
    }

    // Local Scan & Share Mock Flow
    const tokenNo = String(Math.floor(101 + Math.random() * 899));
    let existingPat = patients.find(p => p.abhaId === abhaId);
    if (!existingPat) {
      existingPat = {
        id: `UHID-${Math.floor(100000 + Math.random() * 900000)}`,
        name: name || "Scanned ABDM Patient",
        guardianName: "Self / Relative",
        gender: "Other",
        dob: "1990-01-01",
        phone: "9911223344",
        aadhaar: "XXXX-XXXX-XXXX",
        abhaId,
        address: "Address synchronized from ABDM profile",
        state: "Delhi",
        district: "New Delhi",
        bloodGroup: "O+",
        socioeconomicCategory: "General",
        insuranceType: "Self-Pay",
        registeredAt: new Date().toISOString()
      };
      setPatients(prev => [...prev, existingPat!]);
    }
    return {
      success: true,
      token: tokenNo,
      timeEstimated: "10 mins",
      queueSize: encounters.length + 4,
      patient: existingPat
    };
  };

  const handleAddEncounter = async (enc: Encounter) => {
    const rawRecord = {
      ...enc,
      id: enc.id || `ENC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: enc.date || new Date().toISOString()
    };
    try {
      const resp = await fetch("/api/encounters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enc)
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setEncounters(prev => [...prev, data]);
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, fallback directly to memory", err);
    }
    setEncounters(prev => [...prev, rawRecord]);
  };

  const handleAddClaim = async (claim: PmjayClaim) => {
    const rawRecord = {
      ...claim,
      id: claim.id || `CLM-${Math.floor(4000 + Math.random() * 5999)}`,
      submissionDate: claim.submissionDate || new Date().toISOString()
    };
    try {
      const resp = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claim)
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setClaims(prev => [...prev, data]);
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, fallback directly to memory", err);
    }
    setClaims(prev => [...prev, rawRecord]);
  };

  const handleUpdateClaimStatus = async (claimId: string, action: 'approve' | 'query' | 'reject' | 'pay', queryText?: string) => {
    try {
      const resp = await fetch("/api/claims/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimId, action, queryText })
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setClaims(prev => prev.map(c => c.id === claimId ? data : c));
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, executing local claims operation", err);
    }

    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        const updated = { ...c };
        if (action === "approve") {
          updated.preAuthStatus = "Approved";
          updated.claimStatus = "Approved for Settlement";
        } else if (action === "reject") {
          updated.preAuthStatus = "Rejected";
        } else if (action === "query") {
          updated.preAuthStatus = "Queried";
          if (!updated.queries) updated.queries = [];
          updated.queries.push(queryText || "NHA auditor requested additional verification logs.");
        } else if (action === "pay") {
          updated.claimStatus = "Paid";
        }
        return updated;
      }
      return c;
    }));
  };

  const handleAllocateBed = async (bedId: string, patientId: string, patientName: string) => {
    try {
      const resp = await fetch("/api/beds/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bedId, patientId, patientName })
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setBeds(prev => prev.map(b => b.id === bedId ? data : b));
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, executing local allocation", err);
    }

    setBeds(prev => prev.map(b => {
      if (b.id === bedId) {
        return {
          ...b,
          status: "Occupied",
          patientId,
          patientName,
          admittedAt: new Date().toISOString()
        };
      }
      return b;
    }));
  };

  const handleReleaseBed = async (bedId: string) => {
    try {
      const resp = await fetch("/api/beds/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bedId })
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setBeds(prev => prev.map(b => b.id === bedId ? data : b));
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, executing local bed release", err);
    }

    setBeds(prev => prev.map(b => {
      if (b.id === bedId) {
        const copy = { ...b, status: "Available" as const };
        delete copy.patientId;
        delete copy.patientName;
        delete copy.admittedAt;
        return copy;
      }
      return b;
    }));
  };

  const handleDispenseMedication = async (encounterId: string, medIndex: number) => {
    try {
      const resp = await fetch("/api/pharmacy/dispense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encounterId, medicineIndex: medIndex })
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setEncounters(prev => prev.map(e => e.id === encounterId ? data : e));
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, executing local dispense", err);
    }

    setEncounters(prev => prev.map(e => {
      if (e.id === encounterId) {
        const copy = { ...e };
        if (copy.prescriptions && copy.prescriptions[medIndex]) {
          copy.prescriptions = [...copy.prescriptions];
          copy.prescriptions[medIndex] = { ...copy.prescriptions[medIndex], dispensed: true };
        }
        return copy;
      }
      return e;
    }));
  };

  const handleLabSubmit = async (encounterId: string, orderIndex: number, resultValue: string, criticalAlert: boolean, reportNotes: string) => {
    try {
      const resp = await fetch("/api/lab/submit-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encounterId, orderIndex, resultValue, criticalAlert, reportNotes })
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setEncounters(prev => prev.map(e => e.id === encounterId ? data : e));
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, executing local laboratory result sync", err);
    }

    setEncounters(prev => prev.map(e => {
      if (e.id === encounterId) {
        const copy = { ...e };
        if (copy.labOrders && copy.labOrders[orderIndex]) {
          copy.labOrders = [...copy.labOrders];
          copy.labOrders[orderIndex] = {
            ...copy.labOrders[orderIndex],
            status: "Completed",
            resultValue,
            criticalAlert,
            reportNotes
          };
        }
        return copy;
      }
      return e;
    }));
  };

  const handleAddConsent = async (consent: ConsentLog) => {
    const rawRecord = {
      ...consent,
      id: consent.id || `CNS-${Math.floor(1000 + Math.random() * 9000)}`,
      grantedAt: consent.grantedAt || new Date().toISOString(),
      status: consent.status || "Active"
    };
    try {
      const resp = await fetch("/api/consents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consent)
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const data = await resp.json();
        setConsents(prev => [...prev, data]);
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, executing local consent log update", err);
    }
    setConsents(prev => [...prev, rawRecord]);
  };

  const handleAddRow = async (tableName: string, data: any) => {
    try {
      const resp = await fetch("/api/admin/add-row", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableName, rowData: data })
      });
      if (resp.ok && resp.headers.get("content-type")?.includes("application/json")) {
        const res = await resp.json();
        if (res.success) {
          switch (tableName) {
            case "patients": setPatients(prev => [...prev, res.record]); break;
            case "abha_master": setAbhaMaster(prev => [...prev, res.record]); break;
            case "doctors": setHpr(prev => [...prev, res.record]); break;
            case "departments": setDepartments(prev => [...prev, res.record]); break;
            case "appointments": setAppointments(prev => [...prev, res.record]); break;
            case "admissions": setAdmissions(prev => [...prev, res.record]); break;
            case "billing": setBilling(prev => [...prev, res.record]); break;
            case "claims": setClaims(prev => [...prev, res.record]); break;
            case "pmjay_packages": setPmjayPackages(prev => [...prev, res.record]); break;
            case "consent_log": setConsents(prev => [...prev, res.record]); break;
            case "audit_log": setAuditLogs(prev => [...prev, res.record]); break;
          }
          return;
        }
      }
    } catch (err) {
      console.warn("Express backend unavailable, parsing local master row insertion", err);
    }

    const record = { ...data };
    if (!record.id && !record.code) {
      record.id = `LOCAL-${Math.floor(1000 + Math.random() * 8999)}`;
    }
    switch (tableName) {
      case "patients": setPatients(prev => [...prev, record]); break;
      case "abha_master": setAbhaMaster(prev => [...prev, record]); break;
      case "doctors": setHpr(prev => [...prev, record]); break;
      case "departments": setDepartments(prev => [...prev, record]); break;
      case "appointments": setAppointments(prev => [...prev, record]); break;
      case "admissions": setAdmissions(prev => [...prev, record]); break;
      case "billing": setBilling(prev => [...prev, record]); break;
      case "claims": setClaims(prev => [...prev, record]); break;
      case "pmjay_packages": setPmjayPackages(prev => [...prev, record]); break;
      case "consent_log": setConsents(prev => [...prev, record]); break;
      case "audit_log": setAuditLogs(prev => [...prev, record]); break;
    }
  };

  const handleVerifyIntegrity = async () => {
    try {
      const resp = await fetch("/api/admin/audit-verify", { method: "POST" });
      if (resp.ok) {
        const auditRes = await fetch("/api/audit_logs").then(r => r.json());
        setAuditLogs(auditRes);
        return;
      }
    } catch (err) {
      console.warn("Express backend unavailable, using local audit sync log validation", err);
    }

    // Local Verify Audit log fallback
    const verificationLog: AuditLogEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 8999)}`,
      timestamp: new Date().toISOString(),
      eventType: "BIOMETRIC_VERIFY",
      actor: "SuperAdmin (National Security Officer)",
      endpoint: "/api/admin/audit-verify",
      resourceId: "CRYPTO-LEDGER",
      status: "SUCCESS",
      integrityHash: "bd2c3fa7e12918bb05c75deae12cfdc811cfa5920de65cc529bfa59dd6c801e8"
    };
    setAuditLogs(prev => [verificationLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-image1-teal flex flex-col font-sans text-slate-900">
      {/* Prime Agency Govt Banner Header */}
      <Navbar
        currentRole={currentRole}
        onChangeRole={handleRoleChange}
        syncStatus="connected"
        hfrCounts={hfr.length}
        hprCounts={hpr.length}
      />

      {!activeUser ? (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-20 flex items-center justify-center">
          <LoginPanel onLoginSuccess={handleLogin} />
        </main>
      ) : (
        <>
          {/* Active Session Dashboard Officer Bar */}
          <div className="max-w-7xl w-full mx-auto px-4 md:px-6 mt-4">
            <div className="bg-white/95 border border-indigo-200/40 p-4 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 font-sans select-none animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 bg-indigo-50 text-2xl rounded-xl flex items-center justify-center border border-indigo-200 shadow-2xs">
                  {activeUser.avatar}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900">{activeUser.name}</span>
                    <span className="text-[9px] font-bold bg-indigo-750 text-white px-2 py-0.5 rounded-full uppercase">
                      {activeUser.role === "AyushmanMitra" ? "Ayushman Mitra" : activeUser.role} Panel
                    </span>
                    <span className="text-[9px] font-bold font-mono text-emerald-800 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                      ID: {activeUser.badgeId}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {activeUser.designation} &bull; <strong className="text-indigo-950 font-mono text-[10px] uppercase bg-indigo-50/70 px-1.5 py-0.5 rounded">{activeUser.department}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <span className="text-[9.5px] font-extrabold text-slate-400 block uppercase tracking-tight">Access Authority Scope</span>
                  <span className="text-[10.5px] font-bold text-teal-850 font-mono">{activeUser.authorizedScope}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-extrabold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs transition active:scale-95"
                >
                  <Fingerprint className="h-4 w-4 text-rose-600 animate-pulse" />
                  <span>Lock Terminal</span>
                </button>
              </div>
            </div>
          </div>

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-20">
            
            {/* VIEW ROUTER FOR ROLE DESKS */}
            {currentRole === "Receptionist" && (
              <ReceptionistView
                patients={patients}
                abhaMaster={abhaMaster}
                encounters={encounters}
                onAddPatient={handleAddPatient}
                onScanShareRegister={handleScanShareRegister}
                onAddAbhaMaster={(record) => handleAddRow("abha_master", record)}
                onRefreshData={loadData}
                sharedPatientId={sharedPatientId}
                onSharedPatientIdChange={setSharedPatientId}
              />
            )}

            {currentRole === "Doctor" && (
              <DoctorView
                patients={patients}
                encounters={encounters}
                onAddEncounter={handleAddEncounter}
                hprVerifiedDoctors={hpr.filter(u => u.role === "Doctor")}
                sharedPatientId={sharedPatientId}
                onSharedPatientIdChange={setSharedPatientId}
              />
            )}

            {currentRole === "Nurse" && (
              <NurseView
                patients={patients}
                beds={beds}
                encounters={encounters}
                onAllocateBed={handleAllocateBed}
                onReleaseBed={handleReleaseBed}
                onDispenseMedication={handleDispenseMedication}
              />
            )}

            {currentRole === "AyushmanMitra" && (
              <AyushmanMitraView
                patients={patients}
                claims={claims}
                encounters={encounters}
                abhaMaster={abhaMaster}
                onAddClaim={handleAddClaim}
                onUpdateClaimStatus={handleUpdateClaimStatus}
                onRefreshData={loadData}
              />
            )}

            {currentRole === "MultiPayer" && (
              <MultiPayerWorkflow
                patients={patients}
                encounters={encounters}
                beds={beds}
                onAddPatient={handleAddPatient}
                onRefreshData={loadData}
              />
            )}

            {(currentRole === "LabStaff" || currentRole === "Pharmacy" || currentRole === "Patient" || currentRole === "Billing") && (
              <AncillaryViews
                currentRole={currentRole as any}
                patients={patients}
                encounters={encounters}
                beds={beds}
                consents={consents}
                onLabSubmit={handleLabSubmit}
                onPharmacyDispense={handleDispenseMedication}
                onAddConsent={handleAddConsent}
                doctors={hpr}
              />
            )}

            {currentRole === "SuperAdmin" && (
              <SuperAdminAnalytics
                patients={patients}
                claims={claims}
                encounters={encounters}
                beds={beds}
                abhaMaster={abhaMaster}
                doctors={hpr}
                departments={departments}
                appointments={appointments}
                admissions={admissions}
                billing={billing}
                pmjayPackages={pmjayPackages}
                consentLogs={consents}
                auditLogs={auditLogs}
                onAddRow={handleAddRow}
                onVerifyIntegrity={handleVerifyIntegrity}
              />
            )}

            {currentRole === "Inventory" && (
              <InventoryView />
            )}

          </main>
        </>
      )}

      {/* Persistent National NHA Footer info block */}
      <footer className="bg-white border-t border-slate-200 py-4.5 text-center text-xs text-slate-500 font-mono mt-auto">
        <p className="font-semibold text-slate-600">
          🇮🇳 National Health Authority • ABDM Ecosystem Sandbox Desk
        </p>
        <p className="text-[10px] text-slate-400 mt-1">
          Complies completely with HL7 FHIR standard v4.0.1, ICD-10 clinical diagnosis guidelines, and CDSCO Schedule protocols.
        </p>
      </footer>

      {/* Floating User Manual Launch Button */}
      <button
        onClick={() => setIsManualOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs py-3.5 px-5 rounded-full flex items-center gap-2 shadow-2xl transition-all duration-150 cursor-pointer border border-indigo-500 hover:border-indigo-400 select-none group"
        title="Open Interactive Desk Handbook"
      >
        <BookOpen className="h-4.5 w-4.5 animate-pulse group-hover:scale-110 transition-transform" />
        <span className="tracking-tight">NHA User Manual & Guide</span>
      </button>

      {/* Global User Manual Drawer/Overlay Component */}
      <UserManual 
        isOpen={isManualOpen} 
        onClose={() => setIsManualOpen(false)} 
        activeRole={currentRole} 
        onSwitchRole={handleRoleChange} 
      />
    </div>
  );
}
