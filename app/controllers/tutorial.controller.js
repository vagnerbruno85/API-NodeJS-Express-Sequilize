const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;


//Create and save a new Tutorial
exports.create = (req, res) => {
    //Validate request

    if(!req.body.title) {
        res.status(400).send({
            message:"Content can not be empty!"
        });
        return;
    }
    //create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //save tutorial in the database
    Tutorial.create(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocurred while creating the tutorial."
        });
    });
};

exports.findAll = (req,res) => {
    const title = req.query.title;
    let condition = title ? {title: { [Op.like]: `%${title}%`}} : null;

    Tutorial.findAll({ where: condition })
        .then(data => { 
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while creating the tutorial."
            });
        });
};

//Find a single tutorial with an id

exports.findOne = (rer,res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error ocurred while creating the tutorial."
        });
    });
    
};
exports.update = (req,res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message:"Tutorial was updated successfully."
            });
        }else {
            res.send({
                message: `Cannot update Tutorial with id = ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating Tutorial with id=" + id
        });
    });
};

//Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: {id:id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Tutorial was deleted success"
            });
        }else {
            res.send({
                message: `Cannot delete Tutorial`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Error delete Tutorial with id=" + id
        });
    });
};

exports.deleteAll = (req,res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message:`${nums} Tutorials were deleted successfully!`});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all tutorials."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    });

}
