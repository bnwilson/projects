import { r as removeSubscriptionFromDay, l as listCalendarEntries, a as assignSubscriptionToDay } from '../../chunks/db_D0FmsjUg.mjs';
export { renderers } from '../../renderers.mjs';

async function GET() {
  return new Response(JSON.stringify({ entries: listCalendarEntries() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function POST({ request }) {
  const body = await request.json();
  const day = Number(body.day);
  const subscriptionId = Number(body.subscriptionId);

  if (Number.isNaN(day) || day < 1 || day > 31 || Number.isNaN(subscriptionId)) {
    return new Response(JSON.stringify({ error: 'Valid day and subscriptionId required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const entries = assignSubscriptionToDay(day, subscriptionId);

  return new Response(JSON.stringify({ entries }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function DELETE({ request }) {
  const body = await request.json();
  const day = Number(body.day);
  const subscriptionId = Number(body.subscriptionId);

  if (Number.isNaN(day) || day < 1 || day > 31 || Number.isNaN(subscriptionId)) {
    return new Response(JSON.stringify({ error: 'Valid day and subscriptionId required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const entries = removeSubscriptionFromDay(day, subscriptionId);

  return new Response(JSON.stringify({ entries }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
