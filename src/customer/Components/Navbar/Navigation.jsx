import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navigation } from "../../../config/navigationMenu";
import AuthModal from "../Auth/AuthModal";
import SearchDialog from "./SearchDialog";
import { getUser, logout } from "../../../Redux/Auth/Action";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import { initials } from "../ui/format";
import Wordmark from "../ui/Wordmark";
import { BRAND } from "../../../config/brand";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // /login and /register deep links open the auth modal
  useEffect(() => {
    if (!auth.user && (location.pathname === "/login" || location.pathname === "/register")) {
      setOpenAuthModal(true);
    }
  }, [location.pathname, auth.user]);

  useEffect(() => {
    if (auth.user) {
      setOpenAuthModal(false);
      if (location.pathname === "/login" || location.pathname === "/register") navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleCloseAuth = () => {
    setOpenAuthModal(false);
    if (location.pathname === "/login" || location.pathname === "/register") navigate("/", { replace: true });
  };

  const openSignIn = () => {
    if (location.pathname !== "/login" && location.pathname !== "/register") navigate("/login");
    setOpenAuthModal(true);
  };

  const cartCount = auth.user ? cart.cartItems?.length || 0 : 0;

  const iconBtn =
    "relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

  return (
    <>
      <div className="bg-ink text-center text-xs font-medium text-white/90">
        <p className="container-x py-2.5">
          Free delivery on orders over <span className="font-semibold text-white">₹500</span> · 7-day easy returns
        </p>
      </div>

      <header
        className={cx(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-neutral-200 bg-paper/85 shadow-[0_8px_24px_-16px_rgba(14,14,16,.25)] backdrop-blur-xl"
            : "border-transparent bg-paper"
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center gap-2 lg:h-[4.5rem]">
          <button
            type="button"
            className={cx(iconBtn, "-ml-2 lg:hidden")}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <Link to="/" className="mr-6 flex items-center gap-2 text-xl font-semibold tracking-tight text-ink" aria-label={`${BRAND.name} home`}>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink text-white">
              <ShoppingBagIcon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
            </span>
            <Wordmark />
          </Link>

          {/* desktop nav */}
          <Popover.Group className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.categories.map((category) => (
              <Popover key={category.id}>
                {({ open, close }) => (
                  <>
                    <Popover.Button
                      className={cx(
                        "inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-brand-500",
                        open ? "bg-neutral-100 text-ink" : "text-neutral-700 hover:bg-neutral-100 hover:text-ink"
                      )}
                    >
                      {category.name}
                      <ChevronDownIcon className={cx("h-4 w-4 transition-transform", open && "rotate-180")} />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition duration-200 ease-out"
                      enterFrom="opacity-0 -translate-y-2"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition duration-150 ease-in"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <Popover.Panel className="absolute inset-x-0 top-full border-b border-neutral-200 bg-white shadow-lift">
                        <div className="container-x grid grid-cols-12 gap-10 py-10">
                          <div className="col-span-6 grid grid-cols-2 gap-8">
                            {category.sections.map((section) => (
                              <div key={section.id}>
                                <p className="eyebrow mb-4">{section.name}</p>
                                <ul className="space-y-1">
                                  {section.items.map((item) => (
                                    <li key={item.id}>
                                      <Link
                                        to={`/${category.id}/${section.id}/${item.id}`}
                                        onClick={() => close()}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-ink"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="col-span-6 grid grid-cols-2 gap-5">
                            {category.featured.map((f) => (
                              <Link
                                key={f.name}
                                to={f.path}
                                onClick={() => close()}
                                className="group relative block aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-100"
                              >
                                <img
                                  src={f.image}
                                  alt=""
                                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 p-4">
                                  <p className="text-xs text-white/70">Featured</p>
                                  <p className="font-semibold text-white">{f.name}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            ))}

            {navigation.pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                className={({ isActive }) =>
                  cx(
                    "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition hover:bg-neutral-100 hover:text-ink",
                    isActive ? "text-ink" : "text-neutral-700"
                  )
                }
              >
                {page.name}
              </NavLink>
            ))}
          </Popover.Group>

          {/* actions */}
          <div className="ml-auto flex items-center gap-1">
            <button type="button" onClick={() => setSearchOpen(true)} className={iconBtn} aria-label="Search">
              <MagnifyingGlassIcon className="h-[22px] w-[22px]" />
            </button>

            {auth.user ? (
              <Menu as="div" className="relative">
                <Menu.Button
                  className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white outline-none transition hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  aria-label="Account menu"
                >
                  {initials(auth.user)}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-lift focus:outline-none">
                    <div className="px-3 py-3">
                      <p className="truncate text-sm font-semibold text-ink">
                        {auth.user.firstName} {auth.user.lastName}
                      </p>
                      <p className="truncate text-xs text-neutral-500">{auth.user.email}</p>
                    </div>
                    <div className="my-1 h-px bg-neutral-100" />
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => navigate("/account/order")}
                          className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink", active && "bg-neutral-100")}
                        >
                          <ClipboardDocumentListIcon className="h-5 w-5 text-neutral-500" /> My orders
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => dispatch(logout())}
                          className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink", active && "bg-neutral-100")}
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5 text-neutral-500" /> Log out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <button type="button" onClick={openSignIn} className="btn-ghost hidden lg:inline-flex">
                  Sign in
                </button>
                <button type="button" onClick={openSignIn} className={cx(iconBtn, "lg:hidden")} aria-label="Sign in">
                  <UserIcon className="h-[22px] w-[22px]" />
                </button>
              </>
            )}

            <Link to="/cart" className={iconBtn} aria-label={`Shopping bag, ${cartCount} items`}>
              <ShoppingBagIcon className="h-[22px] w-[22px]" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white ring-2 ring-paper">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <Transition.Root show={mobileOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition duration-300 ease-out"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition duration-200 ease-in"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="flex w-full max-w-sm flex-col overflow-y-auto bg-paper shadow-lift">
                <div className="flex items-center justify-between px-5 py-4">
                  <Wordmark className="text-xl font-semibold tracking-tight" />
                  <button type="button" onClick={() => setMobileOpen(false)} className={iconBtn} aria-label="Close menu">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 px-3 pb-6">
                  {navigation.categories.map((category) => (
                    <Disclosure key={category.id} as="div" className="border-b border-neutral-200">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between px-2 py-4 text-left text-lg font-semibold text-ink">
                            {category.name}
                            <ChevronDownIcon className={cx("h-5 w-5 text-neutral-500 transition-transform", open && "rotate-180")} />
                          </Disclosure.Button>
                          <Disclosure.Panel className="pb-4">
                            {category.sections.map((section) => (
                              <div key={section.id} className="mb-3">
                                <p className="eyebrow px-2 pb-2">{section.name}</p>
                                {section.items.map((item) => (
                                  <Link
                                    key={item.id}
                                    to={`/${category.id}/${section.id}/${item.id}`}
                                    className="block rounded-xl px-2 py-2.5 text-[15px] text-neutral-700 hover:bg-neutral-100"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {navigation.pages.map((page) => (
                    <Link key={page.name} to={page.path} className="block border-b border-neutral-200 px-2 py-4 text-lg font-semibold text-ink">
                      {page.name}
                    </Link>
                  ))}
                  <Link to="/cart" className="block border-b border-neutral-200 px-2 py-4 text-lg font-semibold text-ink">
                    Shopping bag {cartCount > 0 && <span className="text-neutral-500">({cartCount})</span>}
                  </Link>
                </div>

                <div className="border-t border-neutral-200 p-5">
                  {auth.user ? (
                    <div className="space-y-3">
                      <p className="text-sm text-neutral-600">
                        Signed in as <span className="font-semibold text-ink">{auth.user.firstName}</span>
                      </p>
                      <button type="button" onClick={() => navigate("/account/order")} className="btn-secondary w-full">
                        My orders
                      </button>
                      <button type="button" onClick={() => dispatch(logout())} className="btn-ghost w-full">
                        Log out
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openSignIn();
                      }}
                      className="btn-primary w-full"
                    >
                      Sign in / Register
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal handleClose={handleCloseAuth} open={openAuthModal} />
    </>
  );
}
