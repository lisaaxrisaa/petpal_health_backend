# PetPal Health API

## This document describes the available API endpoints for the PetPal Health backend.

## Pets

### GET `/pets`

Get all pets for the authenticated user.
Auth required: Bearer token
Response: `200 OK` + array of pets

---

### POST `/pets`

Create a new pet.
Auth required: Bearer token
Body:
{
"name": "Emma",
"species": "Dog",
"breed": "Mini Schnauzer",
"age": 5
}
Response: `201 Created` + pet object

---

### PUT `/pets/:id`

Update a pet.
Auth required: Bearer token
Body: (any subset of pet fields)
Response: `200 OK` + updated pet

---

### DELETE `/pets/:id`

Delete a pet.
Auth required: Bearer token
Response: `200 OK`

---

## Health Logs

### GET `/healthlogs/:petId`

Get health logs for a pet.
Auth required: Bearer token
Response: `200 OK` + array of health logs

---

### POST `/healthlogs`

Create a health log.
Auth required: Bearer token
Body:
{
"date": "2025-06-19",
"notes": "Vomiting and lethargic",
"condition": "Mild illness",
"medicationsGiven": "Pepto for dogs",
"vetVisit": true,
"petId": 5
}
Response: `201 Created` + health log object

---

### PATCH `/healthlogs/:id`

Update a health log.
Auth required: Bearer token
Body: (any subset of log fields)
Response: `200 OK` + updated log

---

### DELETE `/healthlogs/:id`

Delete a health log.
Auth required: Bearer token
Response: `200 OK`

---

## Auth

## All routes require a valid Authorization: Bearer <token> header.

## Notes

- Dates should be in ISO format (`YYYY-MM-DD`) or `DateTime` strings.
- All data is scoped to the authenticated user.
