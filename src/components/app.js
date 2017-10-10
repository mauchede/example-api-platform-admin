import { HydraAdmin } from '@api-platform/admin';
import React from 'react';
import apiDocumentationParser from '../services/api-documentation-parser';
import authClient from '../services/auth-client';
import { API_ENTRYPOINT } from '../services/constants';
import restClient from '../services/rest-client';

export default () => (
    <HydraAdmin
        apiDocumentationParser={apiDocumentationParser}
        authClient={authClient}
        entrypoint={API_ENTRYPOINT}
        restClient={restClient}
    />
);
