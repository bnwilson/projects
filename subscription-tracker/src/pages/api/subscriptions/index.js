import { listSubscriptions, createSubscription } from '../../../lib/db.js';

export async function GET() {
  return new Response(JSON.stringify({ subscriptions: listSubscriptions() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
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
