import React, { useState } from 'react';
import { Calendar, List } from 'react-feather';
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';

export default function ListFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCalendarClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex shadow-sm rounded-lg border border-neutral-200 text-neutral-700">
        <button className="px-3.5 py-1 flex items-center gap-2.5 border-r border-neutral-200 bg-indigo-50 rounded-l-md">
          <List size={16} className="text-indigo-600" />
          <span className="mt-0.5 text-black">List</span>
        </button>
        <button onClick={handleCalendarClick} className="px-3.5 py-1 flex items-center gap-2.5 hover:bg-indigo-50 hover:text-black transition-all group rounded-r-md">
          <Calendar size={16} className="group-hover:text-indigo-600 transition-all" />
          <span className="mt-0.5">Calendar</span>
        </button>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsModalOpen(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-xl">
              <DialogTitle as="h3" className="text-base/7 font-semibold">
                Feature in Progress
              </DialogTitle>
              <p className="mt-2 text-sm/6"> The Calendar view feature is currently under development and will be available soon. Thank you for your patience.</p>
              <img src="/calendar-feat.png" alt="In Progress" className="w-full h-full my-4" />
              <div className="mt-4">
                <Button
                  className="w-full gap-2 rounded-md transition-all bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-indigo-700"
                  onClick={() => setIsModalOpen(false)}>
                  OK!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
