const Intl = require('intl')
const { age, date } = require('../../lib/utils')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset =  limit * (page - 1)

        const params = {
            page,
            limit,
            filter,
            offset,
            callback(instructors){
                return res.render('instructors/index', { instructors, filter })

            }
        }

        Instructor.paginate(params)

        // if(filter) {
        //     Instructor.findBy(filter, function(instructors){
        //         return res.render('instructors/index', { instructors, filter })
        //     })
        // } else {
        //     Instructor.all(function(instructors) {
        //         return res.render('instructors/index', { instructors })
        //     })
        // }

    },
    create(req, res){
        return res.render('instructors/create')

    },
    post(req, res){
        //validando dados    
        const keys = Object.keys(req.body)
            
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send("Por favor preencha todos os campos")
            }
        }

        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructors/${instructor.id}`)
        })

    },
    show(req, res){

        Instructor.find(req.params.id, function(instructor) {
            if(!instructor) return res.send("Instrutor não encontrado!")
        
            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render('instructors/show', { instructor })
        })

    },
    edit(req, res){
        
        Instructor.find(req.params.id, function(instructor) {
            if(!instructor) return res.send("Instrutor não encontrado!")
        
            instructor.birth = date(instructor.birth).iso
            
            return res.render('instructors/edit', { instructor })
        })

    },
    put(req, res){
        //validando dados    
        const keys = Object.keys(req.body)
            
        for(key of keys) {
            if(req.body[key] == ""){
                return res.send("Por favor preencha todos os campos")
            }
        }

        Instructor.update(req.body, function(){
            return res.redirect(`/instructors/${req.body.id}`)
        })

    },
    delete(req, res){
        Instructor.delete(req.body.id, function(){
            return res.redirect('/instructors')
        })

    },
}
