function _listQuery() {
    var query = `
        SELECT
            name,
            phone,
            last_name AS lastName,
            email,
            zip_code,
            instagram,
            github,
            identity_number AS identityNumber,
            tax_id AS taxId,
            gender,
            age,
            job,
            company,
            state,
            city,
            address,
            number,
            neighborhood,
            complement
        FROM large_form
    `;

    return query;
}

function largeFormListCommand() {
    var query = _listQuery();
    var values = [];

    return [query, values];
}

/**
 *  @swagger
 *  components:
 *      schemas:
 *          LargeForm:
 *              title: LargeForm
 *              type: object
 *              properties:
 *                  name:
 *                     type: string
 *                     description: Name
 *                     x-description-i18n:
 *                          eng: Name
 *                          por: Nome
 *                  lastName:
 *                     type: string
 *                     description: Last Name
 *                     x-description-i18n:
 *                          eng: Last Name
 *                          por: Sobrenome
 *                  phone:
 *                     type: string
 *                     description: Telephone
 *                     x-description-i18n:
 *                          eng: Telephone Number
 *                          por: Número de Telefone
 *                  email:
 *                     type: string
 *                     description: E-Mail
 *                  zipCode:
 *                     type: string
 *                     description: Zip Code
 *                     x-description-i18n:
 *                          eng: Zip Code
 *                          por: CEP
 *                  instagram:
 *                     type: string
 *                     description: Instagram Account
 *                     x-description-i18n:
 *                          eng: Instagram Account
 *                          por: Conta do Instagram
 *                  github:
 *                     type: string
 *                     description: Github Account
 *                     x-description-i18n:
 *                          eng: Github Account
 *                          por: Conta do Github
 *                  identityNumber:
 *                     type: string
 *                     description: Identity Number
 *                     x-description-i18n:
 *                          eng: Identity Number
 *                          por: Número de Identidade
 *                  taxId:
 *                     type: string
 *                     description: Tax Identifier
 *                     x-description-i18n:
 *                          eng: Tax Identifier
 *                          por: CPF
 *                  gender:
 *                     type: string
 *                     description: Gender
 *                     x-description-i18n:
 *                          eng: Gender
 *                          por: Gênero
 *                  age:
 *                     type: string
 *                     description: Age
 *                     x-description-i18n:
 *                          eng: Age
 *                          por: Idade
 *                  job:
 *                     type: string
 *                     description: Job
 *                     x-description-i18n:
 *                          eng: Job
 *                          por: Profissão
 *                  company:
 *                     type: string
 *                     description: Company
 *                     x-description-i18n:
 *                          eng: Company
 *                          por: Empresa
 *                  state:
 *                     type: string
 *                     description: State
 *                     x-description-i18n:
 *                          eng: State
 *                          por: Estado
 *                  city:
 *                     type: string
 *                     description: City
 *                     x-description-i18n:
 *                          eng: City
 *                          por: Cidade
 *                  address:
 *                     type: string
 *                     description: Address
 *                     x-description-i18n:
 *                          eng: Address
 *                          por: Logradouro
 *                  number:
 *                     type: string
 *                     description: Number
 *                     x-description-i18n:
 *                          eng: Number
 *                          por: Número
 *                  neighborhood:
 *                     type: string
 *                     description: Neighborhood
 *                     x-description-i18n:
 *                          eng: Neighborhood
 *                          por: Bairro
 *                  complement:
 *                     type: string
 *                     description: Complement
 *                     x-description-i18n:
 *                          eng: Complement
 *                          por: Complemento
 *                  
 */
class LargeForm {
    
    constructor(
        name,
        phone,
        lastName,
        email,
        zipCode,
        instagram,
        github,
        identityNumber,
        taxId,
        gender,
        age,
        job,
        company,
        state,
        city,
        address,
        number,
        neighborhood,
        complement
    ) {
        this.name = name;
        this.phone = phone;
        this.lastName = lastName;
        this.email = email;
        this.zipCode = zipCode;
        this.instagram = instagram;
        this.github = github;
        this.identityNumber = identityNumber;
        this.taxId = taxId;
        this.gender = gender;
        this.age = age;
        this.job = job;
        this.company = company;
        this.state = state;
        this.city = city;
        this.address = address;
        this.number = number;
        this.neighborhood = neighborhood;
        this.complement = complement;
    }

    createCommand() {
        var query = `
            INSERT INTO large_form (
                name,
                phone,
                last_name,
                email,
                zip_code,
                instagram,
                github,
                identity_number,
                tax_id,
                gender,
                age,
                job,
                company,
                state,
                city,
                address,
                number,
                neighborhood,
                complement
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        var values = [
            this.name,
            this.phone,
            this.lastName,
            this.email,
            this.zipCode,
            this.instagram,
            this.github,
            this.identityNumber,
            this.taxId,
            this.gender,
            this.age,
            this.job,
            this.company,
            this.state,
            this.city,
            this.address,
            this.number,
            this.neighborhood,
            this.complement
        ];

        return [query, values];
    }

    retireveCommand() {
        var listQuery = _listQuery();
        var query = `
            ${listQuery}\n
            WHERE email = ?
        `;

        var values = [this.email];

        return [query, values];
    }

    deleteCommand() {
        var query = `
            DELETE FROM large_form
            WHERE email = ?
        `;

        var values = [this.email];

        return [query, values];
    }

    updateCommand() {
        var query = `
            UPDATE large_form
            SET name = ?,
                phone = ?,
                last_name = ?,
                zip_code = ?,
                instagram = ?,
                github = ?,
                identity_number = ?,
                tax_id = ?,
                gender = ?,
                age = ?,
                job = ?,
                company = ?,
                state = ?,
                city = ?,
                address = ?,
                number = ?,
                neighborhood = ?,
                complement = ?
            WHERE email = ?
        `;

        var values = [
            this.name,
            this.phone,
            this.lastName,
            this.zipCode,
            this.instagram,
            this.github,
            this.identityNumber,
            this.taxId,
            this.gender,
            this.age,
            this.job,
            this.company,
            this.state,
            this.city,
            this.address,
            this.number,
            this.neighborhood,
            this.complement,
            this.email
        ];

        return [query, values];
    }
}

function CreateLargeForm(obj) {
    return new LargeForm(
        obj.name,
        obj.phone,
        obj.lastName,
        obj.email,
        obj.zipCode,
        obj.instagram,
        obj.github,
        obj.identityNumber,
        obj.taxId,
        obj.gender,
        obj.age,
        obj.job,
        obj.company,
        obj.state,
        obj.city,
        obj.address,
        obj.number,
        obj.neighborhood,
        obj.complement
    );
}

module.exports = { CreateLargeForm, largeFormListCommand };