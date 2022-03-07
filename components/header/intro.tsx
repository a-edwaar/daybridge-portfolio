import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Dispatch, Fragment, SetStateAction } from "react";

interface IntroProps {
  contentHtml: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Intro({ contentHtml, isOpen, setIsOpen }: IntroProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto md:py-16"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white shadow-md w-full md:w-max md:rounded-xl md:mx-auto divide-y divide-slate-200">
              <div className="flex justify-end px-4 md:px-8 py-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 transition-all ease-in-out duration-150 hover:scale-105 hover:text-slate-900"
                >
                  <XIcon className="w-6 h-6 " />
                </button>
              </div>
              <div className="p-4 pt-8 md:px-8 pb-12">
                <article
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                  className="prose prose-slate"
                ></article>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="py-[6px] px-3 text-white bg-daybridge rounded-md transition-all ease-in-out duration-150 hover:bg-opacity-90"
                  >
                    <span className="text-sm font-medium">View experience</span>
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
