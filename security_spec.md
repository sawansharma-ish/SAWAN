# Firestore Security Specification (TDD)

## 1. Data Invariants
* **Inquiries**: Anyone can create an inquiry (guest access), but they must be a valid ID structure. Nobody except admins or the owner of that email (if registered) can read/list/delete.
* **Leads**: Anyone can submit a lead (guest/client). Only authenticated admins can read, list, update, or delete leads.
* **Users**: A user can only write/read their own profile. Roles (e.g. `role: "Admin"`) cannot be self-assigned; they require existing admin verification.

---

## 2. The "Dirty Dozen" Payloads
These payloads attempt to break authentication, identity, and system state laws:

1. **Self-Appointed Admin**: Anonymous/guest creating profile with `"role": "Admin"`.
2. **PII Harvesting**: Client trying to list/read other users' profile details.
3. **Ghost Fields Injection**: Adding unmodeled properties like `"isSuperAdmin": true` in a lead.
4. **Spoofed Ownership**: Write a profile where the document ID is user A, but `id` property is set to user B.
5. **No-Name Inquiry**: Submitting an inquiry without a `name`.
6. **Huge ID Poisoning**: Creating a lead with a 1MB dummy string as the key.
7. **Negative/Null Timestamp**: Inserting a manually crafted past timestamp for `timestamp` or `registerDate`.
8. **Bypassing Format Constraints**: Sending email field containing arbitrary script injections.
9. **Lead Status Hijack**: Client updating a lead's status to `"closed"` directly from the client.
10. **Direct Replies by Non-Admins**: Non-admin user updating `"replyText"` or setting `"replied": true`.
11. **Client-side Modifying Immutable Fields**: Changing a user profile's `registerDate`.
12. **Blanket Query Scraping**: Querying the entire `/users` collection without filtering by specific authenticated uid.

---

## 3. Test Runner Concept (firestore.rules.test.ts)

Below is the conceptual TypeScript test code that validates these security assertions:

```typescript
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment
} from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'ai-studio-applet-webapp-ef343',
    firestore: {
      rules: require('fs').readFileSync('firestore.rules', 'utf8')
    }
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

test('Self-Appointed Admin fails', async () => {
  const aliceContext = testEnv.authenticatedContext('alice');
  const aliceDb = aliceContext.firestore();
  await assertFails(
    setDoc(doc(aliceDb, 'users', 'alice'), {
      id: 'alice',
      name: 'Alice',
      email: 'alice@example.com',
      role: 'Admin',
      registerDate: new Date().toISOString()
    })
  );
});

test('PII Harvesting fails', async () => {
  const bobContext = testEnv.authenticatedContext('bob');
  const bobDb = bobContext.firestore();
  await assertFails(getDoc(doc(bobDb, 'users', 'alice')));
});
```
