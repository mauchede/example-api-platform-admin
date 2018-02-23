import { HydraAdmin } from '@api-platform/admin';
import React from 'react';
import apiDocumentationParser from '../services/api-documentation-parser';
import { API_ENTRYPOINT } from '../services/constants';

export default () => (
    <HydraAdmin apiDocumentationParser={apiDocumentationParser} entrypoint={API_ENTRYPOINT} />
);
