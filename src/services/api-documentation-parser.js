import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
import manageResourceGallery from '../api/manage-resource-gallery';

export default entrypoint =>
    parseHydraDocumentation(entrypoint).then(response => {
        const { api } = response;
        manageResourceGallery(api);

        return response;
    });
