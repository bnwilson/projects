import { d as deleteSubscription, u as updateSubscription } from '../../../chunks/db_D0FmsjUg.mjs';
export { renderers } from '../../../renderers.mjs';

async function PUT({ params, request }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid subscription id.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json();
  const title = (body.title || '').trim();
  const cost = Number(body.cost);

  if (!title || Number.isNaN(cost)) {
    return new Response(JSON.stringify({ error: 'Title and cost are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const subscription = updateSubscription(id, {
    title,
    cost,
    description: body.description || '',
    notes: body.notes || ''
  });

  return new Response(JSON.stringify({ subscription }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function DELETE({ params }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid subscription id.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteSubscription(id);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
