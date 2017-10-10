import { ImageField, ImageInput } from 'admin-on-rest/lib/mui';
import React from 'react';
import { headers } from '../services/rest-client';

export default ({ entrypoint, resources }) => {
    const manageFieldImages = field => {
        field.denormalizeData = values => {
            return Promise.all(
                values.map(value =>
                    fetch(`${entrypoint}${value}`).then(response => response.json()),
                ),
            );
        };

        field.normalizeData = values => {
            return Promise.all(
                values.map(value => {
                    if ('@id' in value) {
                        return value['@id'];
                    }

                    const body = new FormData();
                    body.append('file', value.rawFile);

                    return fetch(`${entrypoint}/images`, {
                        body,
                        headers: new Headers(headers),
                        method: 'POST',
                    })
                        .then(response => response.json())
                        .then(response => response['@id']);
                }),
            );
        };

        field.field = ImageField;
        field.fieldProps = {
            addLabel: true,
            src: 'contentUrl',
        };

        field.input = props => (
            <ImageInput {...props} accept="image/*">
                <ImageField source="contentUrl" />
            </ImageInput>
        );
        field.inputProps = {
            addField: true,
            addLabel: true,
            multiple: true,
        };
    };

    const manageFieldMainImage = field => {
        field.denormalizeData = value => {
            if (null === value) {
                return {};
            }

            return fetch(`${entrypoint}${value}`).then(response => response.json());
        };

        field.normalizeData = value => {
            if (0 === value.length || 0 === Object.keys(value).length) {
                return null;
            }

            if ('@id' in value) {
                return value['@id'];
            }

            const body = new FormData();
            body.append('file', value[0].rawFile);

            return fetch(`${entrypoint}/images`, {
                body,
                headers: new Headers(headers),
                method: 'POST',
            })
                .then(response => response.json())
                .then(response => response['@id']);
        };

        field.field = ImageField;
        field.fieldProps = {
            addLabel: true,
            label: field.name,
            source: `${field.name}.contentUrl`,
        };

        field.input = props => (
            <ImageInput {...props} accept="image/*">
                <ImageField source="contentUrl" />
            </ImageInput>
        );
        field.inputProps = {
            addField: true,
            addLabel: true,
            multiple: false,
        };
    };

    const { fields } = resources.find(({ name }) => 'galleries' === name);
    manageFieldImages(fields.find(({ name }) => 'images' === name));
    manageFieldMainImage(fields.find(({ name }) => 'mainImage' === name));
};
