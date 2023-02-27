const { Date } = require('../model/date.model');

module.exports.createDate = async (req, res) => {
    try {
        const { dateProject,status, dueDate } = req.body;
        date = await Date.create({
            dateProject,
            status,
            dueDate
        });
        res.json(date);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

module.exports.findDate = (req, res) => {
    Date.find({}).sort({dueDate:1})
        .then(allDates=> res.json(allDates))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
}

module.exports.deleteDate = (request, response) => {
    Date.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
module.exports.updateDate = (req, res) => {
    Date.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedDate => res.json(updatedDate))
        .catch(err => res.json(err))
}