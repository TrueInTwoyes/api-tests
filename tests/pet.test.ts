import {strict as assert} from 'assert'
import {PetController} from '../api/controller/pet.controller'

const pet = new PetController()

describe('Pet', function() {
    
    it('receive pet by id', async function () {
        const body = await pet.getById(1)
        assert(body.id == 1, 'expect id pet ${body.id}, but got ${id}')
    })
    
    it('can be received by status', async function () {
        let body = await pet.findByStatus('available')
        assert(body.length > 0)

        body = await pet.findByStatus('pending')
        assert(body.length > 0)

        body = await pet.findByStatus('sold')
        assert(body.length > 0)

        body = await pet.findByStatus(['available', 'pending'])
        assert(body.length > 0)
        assert(body.every((pet:any) => pet.status == 'available'))
        assert(!body.every((pet:any) => pet.status == 'pending'))
        assert(!body.every((pet:any) => pet.status == 'sold'))
    })

    
})