import bcrypt from 'bcryptjs'

import moment from 'moment'

class PasswordHelpers{

    getSalt(){
        return bcrypt.genSaltSync(12)
    }

    hashPassword(password){
        const salt = this.getSalt()
        return bcrypt.hashSync(password,salt)
    }

    comparePassword(password,hashPassword){
        return bcrypt.compareSync(password,hashPassword)
    }

}

export default new PasswordHelpers()