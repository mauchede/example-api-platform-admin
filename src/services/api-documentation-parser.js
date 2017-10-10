import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
import React from 'react';
import { Redirect } from 'react-router-dom';
import manageResourceGallery from '../api/manage-resource-gallery';
import { headers } from './rest-client';

export default entrypoint =>
    parseHydraDocumentation(entrypoint, { headers: new Headers(headers) }).then(
        response => {
            const { api } = response;
            manageResourceGallery(api);

            return response;
        },
        response => {
            switch (response.status) {
                case 401:
                    return Promise.resolve({
                        api: response.api,
                        customRoutes: [
                            {
                                props: {
                                    path: '/',
                                    render: () => <Redirect to={`/login`} />,
                                },
                            },
                        ],
                    });

                default:
                    return Promise.reject(response);
            }
        },
    );
