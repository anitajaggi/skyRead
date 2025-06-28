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
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
        <Dialog.Title className="text-lg font-medium text-gray-800">
          {title}
        </Dialog.Title>
        <Dialog.Description className="mt-2 text-sm text-gray-600">
          {description}
        </Dialog.Description>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 cursor-pointer  bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 cursor-pointer  bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
