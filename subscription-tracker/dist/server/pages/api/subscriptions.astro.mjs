import { b as listSubscriptions, c as createSubscription } from '../../chunks/db_D0FmsjUg.mjs';
export { renderers } from '../../renderers.mjs';

async function GET() {
  return new Response(JSON.stringify({ subscriptions: listSubscriptions() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function POST({ request }) {
  const body = await request.json();
  const title = (body.title || '').trim();
  const cost = Number(body.cost);

  if (!title || Number.isNaN(cost)) {
    return new Response(JSON.stringify({ error: 'Title and cost are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const subscription = createSubscription({
    title,
    cost,
    description: body.description || '',
    notes: body.notes || ''
  });

  return new Response(JSON.stringify({ subscription }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
