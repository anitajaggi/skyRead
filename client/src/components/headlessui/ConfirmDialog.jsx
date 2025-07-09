import { Dialog } from "@headlessui/react";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      <Dialog.Panel className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 transition-all">
        <Dialog.Title className="text-xl font-semibold text-indigo-700">
          {title}
        </Dialog.Title>
        <Dialog.Description className="mt-2 text-sm text-gray-600">
          {description}
        </Dialog.Description>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
