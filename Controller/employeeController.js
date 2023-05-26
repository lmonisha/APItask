const models = require('../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phno } = req.body
        if (!(firstName && lastName && email && password)) {
            res.status(400).send('all input required')
        }
        let filter = {}
        filter.where = {}
        filter.where.email = email
        console.log('filter---->', filter);
        models.UserDetails.findOne(filter).then(oldUser => {
            if (oldUser) {
                res.status(400).send('user already exist please use some other login')
            } else {
                (async () => {
                    let encryptedPasswrd = await bcrypt.hash(password, 10)
                    console.log('encryptedPasswrd---->', encryptedPasswrd)
                    let obj = {
                        firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phno: req.body.phno, password: encryptedPasswrd
                    }
                    console.log('obj--->', obj);
                    models.UserDetails.create(obj).then(entry => {
                        console.log('entry.id--->',entry.id)
                        const token = jwt.sign(
                            { user_id: entry.id, email },
                            process.env.TOKEN_KEY, { expiresIn: "2h" }
                        )
                        console.log('token----->',token)
                        let obj1 = { 'message':'Registered successfully!!!',token }
                        console.log('obj1');
                        res.status(201).send(obj1)
                    }).catch(err => {
                        console.log('err--->', err);
                    })
                })()
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send('All input is requires');
        }
        let filter = {}
        filter.where = {}
        filter.where.email = email;
        models.UserDetails.findOne(filter).then(oldUser => {
            if (oldUser) {
                let passwordCheck = bcrypt.compare(password, oldUser.password)
                if (passwordCheck) {
                    const token = jwt.sign({ user_id: oldUser.id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" })
                  let obj1={'message':'Login successfully!!!',token}
                    res.status(200).send(obj1)
                }else{
                res.status(400).send("Invalid Credentials")

                }
            }else{
                res.status(400).send("Please register")

            }
        }).catch(err => {
            console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
}