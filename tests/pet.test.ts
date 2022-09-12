import got from 'got';
import {strict as assert} from 'assert'
import {URLSearchParams} from 'url'

describe('Pet', function() {
    it('receive pet by id', async function () {
        const response = await got('https://petstore.swagger.io/v2/pet/2')
        const body = JSON.parse(response.body);

        assert(body.id == 2, 'expect id pet')
    })
    it('can be received by status', async function () {
        let response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: { status : 'avaliable'}
        });
        let body = JSON.parse(response.body);
        assert(body.length > 0)

        response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: { status : 'pending'}
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)

        response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: { status : 'sold'}
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)

        response = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: new URLSearchParams({ status : ['sold', 'available']})
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)
    })

})