const BASE = '/api';

export const getMandals = () => fetch(`${BASE}/mandals`).then(r => r.json());

export const getCropAdvisory = (mandal_id, language) =>
  fetch(`${BASE}/crop-advisory`, {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ mandal_id, language })
  }).then(r => r.json());

export const getDrySpell = (mandal_id, language) =>
  fetch(`${BASE}/dryspell`, {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ mandal_id, language })
  }).then(r => r.json());

export const getAllMandalRisks = () =>
  fetch(`${BASE}/dryspell/all-mandals`).then(r => r.json());

export const detectDisease = (file, mandal_id, language) => {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('mandal_id', mandal_id);
  fd.append('language', language);
  return fetch(`${BASE}/disease`, { method: 'POST', body: fd }).then(r => r.json());
};

export const getTickets = () => fetch(`${BASE}/tickets`).then(r => r.json());

export const updateTicket = (id, update) =>
  fetch(`${BASE}/tickets/${id}`, {
    method: 'PATCH', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(update)
  }).then(r => r.json());
