const Sauce = require('../models/Sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : {...req.body}
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];            
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.rateSauce = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let sauceId = req.params.id

    if (like === 1) { 
        Sauce.updateOne(    
            { _id: sauceId }, // On récupère la sauce correspondante
            { 
                $inc: {likes: +1}, // On incrémente les likes de +1
                $push: {usersLiked: userId} // On ajoute le user dans le tableau
            })
                .then(() => res.status(201).json({ message: 'Vous avez aimé cette sauce !' }))
                .catch((error) => res.status(400).json({ error }));
    }
    if (like === -1) { 
        Sauce.updateOne(
            { _id: sauceId }, 
            { 
                $inc: {dislikes: +1}, // On incrémente les likes de +1
                $push: {usersDisliked: userId} // On ajoute le user dans le tableau
            })
                .then(() => res.status(201).json({ message: 'Vous n\'avez aimé cette sauce !' }))
                .catch((error) => res.status(400).json({ error }));
    }
    if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                if (sauce.usersLiked.includes(userId)) { // Si l'utilisateur est dans le tableau des likes(il a déjà noté la sauce)
                    Sauce.updateOne(
                        { _id: sauceId }, 
                        { 
                            $inc: {likes: -1}, // On incrémente les likes de -1
                            $pull: {usersLiked: userId} // On retire le user du tableau
                        })
                            .then(() => res.status(201).json({ message: 'Votre mention \'j\'aime\' a été retirée !' }))
                            .catch((error) => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(userId)) { // Si l'utilisateur est dans le tableau des dislikes(il a déjà noté la sauce)
                    Sauce.updateOne(
                        { _id: sauceId }, 
                        { 
                            $inc: {dislikes: -1},  // On incrémente les likes de -1
                            $pull: {usersDisliked: userId} // On retire le user du tableau
                        })
                            .then(() => res.status(201).json({ message: 'Votre mention \'je n\'aime pas\' a été retirée !' }))
                            .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(404).json({ error }));
    }
}
