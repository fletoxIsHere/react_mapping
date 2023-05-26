/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import * as XLSX from "xlsx";

const people = [
  { name: "patient" },
  { name: "encounter" },
  { name: "transfer" },
  { name: "diagnosis" },
  { name: "procedure" },
];
const patient = [
  "PatientNumber",
  "DateOfBirth",
  "Gender",
  "Extra:PatientDeceased",
  "Extra:DateofDeath",
  "Extra:PlaceOfBirth",
  "EthnicOrigin",
  "Extra:Nationality",
  "LastName",
  "FirstName",
  "Title",
  "TitleExtra:MothersLastName",
  "Extra:MothersFirstName",
  "Extra:FathersLastName",
  "Extra:FathersFirstName",
  "Extra:FamilyDoctor",
  "Extra:BloodRefusal",
  "Extra:OrganDonor",
  "Extra:PrefLanguage",
  "Extra:LastUpdateDateTime",
  "NationalIdentifier",
];

const encounter = [
  "PatientNumber",
  "Hospital",
  "StartDateTime",
  "EndDateTime",
  "EncounterNumber",
  "Age",
  "EncounterType",
  "EncounterCategory",
  "LengthOfStay",
  "AdmitWard",
  "DischargeWard",
  "ReferringConsultant",
  "Extra:ReferringConsultantName",
  "ReferringConsultantSpecialty",
  "AdmittingConsultant",
  "Extra:AdmittingConsultantName",
  "AdmittingConsultantSpecialty",
  "AttendingConsultant",
  "Extra:AttendingConsultantName",
  "AttendingConsultantSpecialty",
  "DischargeConsultant",
  "Extra:DischargeConsultantName",
  "DischargeConsultantSpecialty",
  "Extra:TransferToHospital",
  "Extra:CauseOfDeath",
  "Extra:TypeOfDeath",
  "Extra:DateofDeath",
  "Extra:Autopsy",
  "DRG1",
  "DRG1Version",
  "Extra:DRGGravity",
  "Extra:MDC",
  "Extra:LastUpdateDateTime",
  "DischargeDestination",
  "Address",
  "PostCode",
  "Extra:Municipality",
  "Suburb",
  "Extra:Region",
  "Extra:Country",
  "Extra:LivingArrangements",
  "MaritalStatus",
  "AdmissionCategory",
  "AdmissionSource",
  "AdmissionElection",
  "HealthFund",
  "FinancialClass",
  "Extra:TransferFromHospital",
  "EXTRA:ClinicName",
  "EXTRA:ClinicSpecialtyCode",
  "EXTRA:ClinicSpecialty",
  "EXTRA:ModeOfArrival",
  "EXTRA:PreTriageTime",
  "EXTRA:TriageStartTime",
  "EXTRA:TriageEndTime",
  "EXTRA:DiagnosisOnDischarge",
  "EXTRA:PhysicianSpecialityKey",
  "EXTRA:CancellationDate",
  "EXTRA:CancellationFlag",
  "Extra:VisitType",
  "Extra:Site",
  "Extra:DischargeStatus",
  "Extra:ComplaintDesc",
  "Extra:TriageCode",
  "Extra:TriageDesc",
];

const transfer = [
  "PatientNumber",
  "Extra:Hospital",
  "BedNumber",
  "EncounterNumber",
  "Ward",
  "StartDateTime",
  "Extra:RoomNumber",
  "Extra:WardType",
  "Leave",
  "Extra:LeaveType",
  "AttendingConsultant_Code",
  "Extra:AttendingConsultantName",
  "AttendingConsultant_SpecialtyCode",
  "Extra:LastUpdateDateTime",
  "Extra:Site",
];

const diagnosis = [
  "Extra:SourcePatientNumber",
  "Extra:Hospital",
  "EncounterNumber",
  "DiagnosisCode",
  "DiagnosisVersion",
  "Sequence",
  "Extra:DiagnosisType",
  "ConditionOnset",
  "Extra:SequenceService",
  "Extra:PrimaryTumour",
  "Extra:TumourCode",
  "Extra:Metastase",
  "Extra:Ganglion",
  "Extra:StageEvolution",
  "Extra:Morphology",
  "Extra:Screening",
  "Extra:DiagnosisDateTime",
  "Extra:CodeCharacteristic",
  "Extra:CodeCharacteristicDesc",
  "Extra:LocalDiagCode",
  "DiagnosisDescription",
  "Extra:LastUpdateDateTime",
];

const procedure = [
  "Last Name",
  "First Name",
  "Extra:SourcePatientNumber",
  "Extra:Hospital",
  "EncounterNumber",
  "ProcedureDateTime",
  "ProcedureCode",
  "ProcedureVersion",
  "Sequence",
  "Extra:InterventionType",
  "Consultant",
  "Extra:ConsultantName",
  "ConsultantSpecialty",
  "ProcedureTheatre",
  "Extra:LocalProcTheatre",
  "Extra:LocalProcTheatreDesc",
  "Extra:NbrProcedures",
  "Extra:LastUpdateDateTime",
];
function Hero() {
  const [selected, setSelected] = useState(people[0]);
  const [columnNames, setColumnNames] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [selectededData, setSelectededData] = useState([]);
  const [modifiedNames, setModifiedNames] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedArray, setSelectedArray] = useState("");
  // const handleFile = async (e) => {
  //   const file = e.target.files[0];
  //   setFileName(file.name);
  //   const data = await file.arrayBuffer();
  //   const workbook = XLSX.read(data, { sheetRows: 1 });

  //   const workSheet = workbook.Sheets[workbook.SheetNames[0]];
  //   const jsonData = XLSX.utils.sheet_to_json(workSheet, {
  //     header: 1,
  //     defval: "",
  //   });
  //   setColumnNames(jsonData[0]);
  //   console.log(fileColumns);
  // };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { sheetRows: 1 });

    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(workSheet, {
      header: 1,
      defval: "",
    });
    setColumnNames(jsonData[0]);
  };
  const handleNameChange = (index, event) => {
    const modified = [...modifiedNames];
    modified[index] = event.target.value;
    setModifiedNames(modified);
  };
  const handleSave = () => {
    const workbook = new XLSX.WorkBook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.addRow(modifiedNames);
    const buffer = workbook.xlsx.writeBuffer().then((buffer) => {
      const data = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "new_file.xlsx";
      link.click();
    });
  };
  const handleArrayChange = async (e) => {
    const selectedArrayName = e.target.value;

    // Reset SelectededData if no array is selected
    if (selectedArrayName === "None") {
      setSelectededData([]);
      setFilteredData([]);
    } else {
      let selectedArrayData;
      switch (selectedArrayName) {
        case "patient":
          selectedArrayData = patient;
          break;
        case "encounter":
          selectedArrayData = encounter;
          break;
        case "transfer":
          selectedArrayData = transfer;
          break;
        case "diagnosis":
          selectedArrayData = diagnosis;
          break;
        case "procedure":
          selectedArrayData = procedure;
          break;
        default:
          selectedArrayData = [];
          break;
      }

      setSelectededData(selectedArrayData);
    }
    setSelectedArray(selectedArrayName);
    // console.log(selectededData);

    // const filtered = await new Promise((resolve) => {
    //   setTimeout(() => {
    //     const result = columnNames.filter((column) => {
    //       !selectededData.includes(column);
    //     });
    //     resolve(result);
    //   }, 1000);
    // });
    // // const filtered = columnNames.filter(
    // //   (column) => !selectededData.includes(column)
    // // );
    // setFilteredData(filtered);
  };
  useEffect(() => {
    if (selectededData.length > 0) {
      const filtered = columnNames.filter(
        (column) => !selectededData.includes(column)
      );
      setFilteredData(filtered);
    }
  }, [selectededData]);

  useEffect(() => {
    console.log(selectededData);
    console.log(filteredData);
  }, [selectededData, filteredData]);

  return (
    // <div className="grid grid-cols-3 px-7 h-20">
    <div className="flex items-start px-7  gap-3.5 flex-wrap mb-20 ml-10 mr-10 justify-between">
      <div className="flex items-end">
        <label className="block mb-2 text-sm font-medium text-dark w-28">
          Current File :
        </label>

        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
          onChange={handleFileUpload}
        />
      </div>
      <div className="relative max-w-xs  flex items-end	w-80 h-8">
        <label className="block  text-sm font-medium text-dark w-28">
          Current File :
        </label>
        <select value={selectedArray || "None"} onChange={handleArrayChange}>
          <option value="None" disabled>
            Select an array
          </option>
          <option value="patient">patient</option>
          <option value="encounter">encounter</option>
          <option value="transfer">transfer</option>
          <option value="diagnosis">diagnosis</option>
          <option value="procedure">procedure</option>
        </select>
      </div>
      <div className="border rounded-lg bg-violet-50 ">
        <p className="p-3 font-bold">Latest Files Uploaded</p>
        <div className="flex flex-col overflow-y-auto">
          <ul className="py-2 px-4 border-t">
            {fileName && <p>{fileName}</p>}
          </ul>
        </div>
      </div>
      <div className="border rounded-lg bg-violet-50 w-full">
        <p className="p-3 font-bold">
          {fileName && fileName} - File Columns Not in the List
        </p>
        <div className="flex flex-col overflow-y-auto">
          {filteredData &&
            filteredData.slice(1).map((col, index) => (
              <ul
                className="py-2 px-4 border-t flex justify-between "
                key={index}
              >
                {col}
                <select>
                  <option value="">Select an option</option>
                  {selectededData.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </ul>
            ))}
        </div>
      </div>
      {/* <div>
        <ul>
          {filteredData &&
            filteredNames.slice(1).map((col, index) => (
              <ul className="py-2 px-4 border-t" key={index}>
                {col}
              </ul>
            ))}
          {columnNames.map((name, index) => (
            <li key={index}>
              {name}{" "}
              {filteredNames.includes(name) && (
                <input
                  type="text"
                  onChange={(event) => handleNameChange(index, event)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSave}>Save</button> */}
    </div>
  );
}

export default Hero;
