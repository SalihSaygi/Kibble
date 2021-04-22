import { Privileged } from '../models/privilegedModel'
import { sessionizePriviliged } from '../helpers/middlewares.helpers'


//Read METHODS

//Finding an priviliged with id
export const findOnePriviliged = (req, res) => {
    Privileged.findById(req.params.id)
        .then((priviliged) => {
            if (!priviliged) {
                return res.status(404).json({
                    message: "Couldn't find the priviliged with id: " + req.id,
                })
            }
            res.status(200).json(
                {
                    message: "Here is the priviliged with id: " + req.params.id
                },
                priviliged
            )
            console.log(priviliged)
        })
        .catch((err) => {
            return res.status(500).json({
                message: err + "\n| Found it but couldn't retrieve the priviliged with id: " + req.params.id + " |"
            })
        })
}

export const findAllPriviligeds = (req, res) => {
    Privileged.find({})
        .sort({ name: -1 })
        .limit(20)
        .then((priviligeds) => {
            res.status(200).json(
                {
                    message: "Here is all priviligeds"
                },
                priviligeds
            )
            console.log(priviligeds)
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Couldn't get Priviligeds for some reason ¯\\_(ツ)_/¯"
            })
        })

}

//Delete METHODS

export const deletePriviliged = (req, res) => {
    Privileged.findByIdAndRemove(req.params.id)
        .then((priviliged) => {
            if (!priviliged) {
                return res.status(404).json({
                    message: "Couldn't find the priviliged with id: " + req.params.id
                })
            }
            if(priviliged.username == "admin")
            res.status(200).json(
                {
                    message:
                        "Deleted the priviliged with id: " + req.params.id
                }
            )
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Couldn't delete priviliged"
            })
        })
}

export const updatePriviliged = (req, res) => {
    if (!req.body.password || !req.body.name) {
        return res.status(400).json({
            message: "Fill in the required fields"
        })
    }
    Privileged.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((priviliged) => {
            if (!priviliged) {
                return res.status(404).json({
                    message: "Couldn't find the priviliged with id: " + req.params.id,
                })
            }
            res.status(200).json(priviliged)
        })
        .catch((err) => {
            return res.status(200).json(
                { message: err + "\n| Found it but couldn't retrieve the priviliged with id: " + req.params.id + " |" }
            );
        });
};