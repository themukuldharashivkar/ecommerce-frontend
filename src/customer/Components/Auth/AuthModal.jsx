import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import RegisterUserForm from "./Register";
import LoginUserForm from "./Login";
import { categoryImages } from "../../../config/navigationMenu";

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <Transition.Root show={!!open} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative grid w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-lift md:grid-cols-5">
                <div className="relative hidden md:col-span-2 md:block">
                  <img
                    src={categoryImages.women_dress}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="text-2xl font-semibold leading-snug">
                      Your style,
                      <br />
                      <span className="font-display text-3xl font-normal italic">one account.</span>
                    </p>
                    <p className="mt-2 text-sm text-white/70">Track orders, save your bag and check out faster.</p>
                  </div>
                </div>

                <div className="p-6 sm:p-9 md:col-span-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-ink"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  <Dialog.Title className="text-2xl font-semibold tracking-tight text-ink">
                    {isLogin ? "Welcome back" : "Create your account"}
                  </Dialog.Title>
                  <p className="mb-7 mt-1.5 text-sm text-neutral-500">
                    {isLogin ? "Sign in to continue shopping." : "Join Bazaarly in under a minute."}
                  </p>
                  {isLogin ? <LoginUserForm /> : <RegisterUserForm />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
