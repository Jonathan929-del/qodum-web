## Client-side tab/page state replaced with route-based tabs

**Found:** Every "page" in every module was a client-side string match
against `openedPages`/`currentPage` in `context/GlobalStateContext.js`.
Sidebar clicks never navigated — no `router.push`, no `<Link>` — they only
wrote a label into context. Each module component (`Fees.tsx`,
`Admission.tsx`, etc.) imported every one of its sub-pages up front and
conditionally rendered them via a long `if (openedPages.includes(...))`
chain, matched by string label independently across three places: the
sidebar tree (`constants/modules.ts`), each module's if-chain, and the tab
strip. Nothing enforced these three stayed in sync. Deep-linking, browser
refresh, and back/forward navigation did not work — the URL never
reflected which page was open.

**Root cause:** Tab/page state was built entirely client-side before the
app had any real routing model. `pagesComps/` already had folder paths
shaped like real Next.js routes, but they were unused — just components
imported directly and matched by label.

**Fix:** Piloted on the Users module (see "Users module pilot" below),
then generalized:
- Every leaf page converted to a real `app/(root)/(modules)/<module>/<page>/page.tsx`
  route. Sidebar clicks now call `router.push` instead of writing to context.
- `store/tabsStore.ts` — a Zustand store (persisted to `localStorage`)
  holding the list of open tabs, keyed by path. Replaces `openedPages`.
- `components/Layout/Pages/TabSync.tsx` — a route listener that registers
  a tab from the current URL. Tab identity is truncated to the first two
  URL segments (module + leaf) via `getTabPath`, so extra sub-routes under
  a page (see Form/View split below) don't create duplicate tabs.
- `components/Layout/Pages/PageBreadcrumb.tsx` + `lib/utils/breadcrumb.ts`
  — derives a full breadcrumb trail (module → sidebar group → leaf) from
  `constants/modules.ts` by matching slugified labels against the URL,
  since sidebar groupings (e.g. "Manage Users") are not URL segments and
  don't otherwise exist anywhere in the route structure.
- `store/pageStateStore.ts` — a separate, non-persisted Zustand store
  holding per-tab UI state (form drafts, selections), keyed by path, so
  navigating away from a page and back doesn't lose in-progress input.
  Deliberately not persisted to `localStorage`: unlike open tabs, losing
  an in-progress draft on a hard refresh is acceptable, and some values
  stored here (e.g. a selected `File` object) aren't serializable anyway.
- `context/GlobalStateContext.js` left in place, unused by migrated
  modules — not deleted yet (see "Still open").

**Verification:** Manually tested per module page: deep link directly to
a leaf URL, refresh mid-form, use browser back/forward, open multiple
tabs and switch between them confirming preserved state, close a tab and
confirm redirect to the module root, close-all and confirm redirect.

**Impact:** Fixes deep-linking, refresh, and back/forward for every
migrated page. Removes the three-way string-matching fragility between
sidebar data, module if-chains, and tab state — a typo in any one no
longer silently fails to render.

---

## Users module pilot: Create User Form/View split, and a state-loss bug found mid-implementation

**Found:** `Create User`'s existing `index.tsx` wrapper owned three
different concerns at once: a `isViewOpened` boolean toggling between
`FormCom`/`ViewCom`, fetched lists (`users`/`staff`/`schools`, refetched
on every toggle), and `updateUser` (the record being edited, handed from
`ViewCom`'s row-select directly into `FormCom` via props). Splitting Form
and View into two real routes broke this hand-off, since a real route
change unmounts the shared parent that carried `updateUser` between them.

**Root cause:** The initial migration moved only `updateUser` (renamed
`editingUser`) into `pageStateStore`, keyed to the tab's base path so
both routes could read/write it. `selectedSchools`, `file`, and `imgSrc`
were left as plain `useState`, and nothing synced `react-hook-form`'s
live field values out to the store at all — `editingUser` only ever
seeded `defaultValues` once at mount. Result: switching tabs mid-edit, or
navigating Form → View → Form, lost any in-progress typing, file
selection, or school selection.

**Fix:**
- Migrated `selectedSchools`, `file`, `imgSrc` to `useFieldState` (the
  same mechanism already used for `editingUser`).
- Added a `form.watch()` subscription that writes every change to a
  `formDraft` field in the store; `useForm`'s `defaultValues` now reads
  `formDraft` first, falling back to values derived from `editingUser`.
- `pageStateStore`'s `clearPage(path)` wipes every field under a tab's
  key in one call, used on submit, cancel, and when `ViewCom`'s
  `selectHandler` loads a newly picked record (preventing a stale draft
  from one edit target leaking into the next).
- Fixed a related tab-duplication bug: `TabSync` and `PagesList` were
  matching tab identity against the full pathname, so `/create-user` and
  `/create-user/view` registered as two separate tabs. Both now use
  `getTabPath` to truncate to the shared 2-segment base.

**Verification:** Typed into the form, switched tabs, switched back —
input preserved. Selected a user in View, landed on Form pre-filled.
Picked a different user without submitting — no stale draft carried
over. Closed the tab from either the form or view sub-route — redirected
correctly either way.

**Impact:** Establishes the reusable pattern (route split + shared
`tabPath`-keyed store fields + `formDraft` sync) for any future page that
needs a form/list split — the same shape applies to any other page
without further changes to the tab/breadcrumb infrastructure.