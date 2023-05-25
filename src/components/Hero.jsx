/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import * as XLSX from "xlsx";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];
function Hero() {
  const [selected, setSelected] = useState(people[0]);
  const [fileColumns, setFileColumns] = useState([]);
  const [fileName, setFileName] = useState(null);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { sheetRows: 1 });

    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(workSheet, {
      header: 1,
      defval: "",
    });
    setFileColumns(jsonData[0]);
    console.log(fileColumns);
  };

  return (
    // <div className="grid grid-cols-3 px-7 h-20">
    <div className="flex items-start px-7 justify-center gap-2.5 flex-wrap">
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
          onChange={(e) => handleFile(e)}
        />
      </div>
      <div className="relative max-w-xs  flex items-end	w-80">
        <label className="block mb-2 text-sm font-medium text-dark w-28">
          Current File :
        </label>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative ">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-50 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-violet-50 bg-violet-50" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-violet-50">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="border rounded-lg bg-violet-50">
        <p className="p-2">Latest Files Uploaded</p>
        <div className="flex flex-col overflow-y-auto">
          <ul className="py-2 px-4 border-t">
            {fileName && <p>{fileName}</p>}
          </ul>
        </div>
      </div>
      <div className="border rounded-lg bg-violet-50">
        <p className="p-2">{fileName && fileName} - File Columns</p>
        <div className="flex flex-col overflow-y-auto">
          {fileColumns &&
            fileColumns.slice(1).map((col, index) => (
              <ul className="py-2 px-4 border-t" key={index}>
                {col}
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
