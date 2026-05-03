import { f as createComponent, j as renderHead, h as addAttribute, r as renderTemplate } from '../chunks/astro/server_BQt6qVPp.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Subscription Tracker</title><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">${renderHead()}</head> <body data-astro-cid-j7pv25f6> <div class="app" data-astro-cid-j7pv25f6> <aside data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Subscriptions</h2> <p class="muted" data-astro-cid-j7pv25f6>Drag a subscription onto a calendar day to assign it.</p> </div> <button class="button" id="open-create" data-astro-cid-j7pv25f6>Add New Sub +</button> <div class="status" id="selected-status" data-astro-cid-j7pv25f6>No subscription selected.</div> <div class="subscriptions" id="subscription-list" data-astro-cid-j7pv25f6></div> </aside> <main data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>31-Day Planner</h1> <p class="muted" data-astro-cid-j7pv25f6>Build a lightweight month view and map each subscription to any day.</p> </div> <div class="calendar" id="calendar" data-astro-cid-j7pv25f6> ${days.map((day) => renderTemplate`<div class="day"${addAttribute(day, "data-day")} data-astro-cid-j7pv25f6> <div class="day-number" data-astro-cid-j7pv25f6>Day ${day}</div> <div class="day-entries" data-astro-cid-j7pv25f6></div> </div>`)} </div> </main> </div> <dialog id="subscription-modal" data-astro-cid-j7pv25f6> <div class="modal" data-astro-cid-j7pv25f6> <header data-astro-cid-j7pv25f6> <h3 id="modal-title" data-astro-cid-j7pv25f6>New Subscription</h3> <button class="button secondary" id="close-modal" type="button" data-astro-cid-j7pv25f6>Close</button> </header> <form id="subscription-form" data-astro-cid-j7pv25f6> <input type="hidden" name="id" data-astro-cid-j7pv25f6> <label data-astro-cid-j7pv25f6>
Title
<input name="title" placeholder="e.g., Spotify" required data-astro-cid-j7pv25f6> </label> <label data-astro-cid-j7pv25f6>
Cost (monthly)
<input name="cost" type="number" step="0.01" placeholder="9.99" required data-astro-cid-j7pv25f6> </label> <label data-astro-cid-j7pv25f6>
Description
<input name="description" placeholder="Optional short description" data-astro-cid-j7pv25f6> </label> <label data-astro-cid-j7pv25f6>
Notes
<textarea name="notes" placeholder="Any reminders or account info" data-astro-cid-j7pv25f6></textarea> </label> <div style="display:flex; gap:10px; justify-content:flex-end;" data-astro-cid-j7pv25f6> <button class="button ghost" type="reset" data-astro-cid-j7pv25f6>Reset</button> <button class="button" type="submit" data-astro-cid-j7pv25f6>Save</button> </div> </form> </div> </dialog> <dialog id="day-modal" data-astro-cid-j7pv25f6> <div class="modal" data-astro-cid-j7pv25f6> <header data-astro-cid-j7pv25f6> <h3 id="day-modal-title" data-astro-cid-j7pv25f6>Day Details</h3> <button class="button secondary" id="close-day-modal" type="button" data-astro-cid-j7pv25f6>Close</button> </header> <ul class="day-subscriptions" id="day-subscriptions" data-astro-cid-j7pv25f6></ul> <p class="muted" id="no-day-subscriptions" hidden data-astro-cid-j7pv25f6>No subscriptions</p> <div class="day-total" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>Total</span> <strong id="day-total" data-astro-cid-j7pv25f6>$0.00</strong> </div> </div> </dialog>  </body> </html>`;
}, "/Users/bradwilson/Development/codex-projects/projects/subscription-tracker/src/pages/index.astro", void 0);

const $$file = "/Users/bradwilson/Development/codex-projects/projects/subscription-tracker/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
