import {
  listCalendarEntries,
  assignSubscriptionToDay,
  removeSubscriptionFromDay
} from '../../../lib/db.js';

export async function GET() {
  return new Response(JSON.stringify({ entries: listCalendarEntries() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
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

export async function DELETE({ request }) {
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
