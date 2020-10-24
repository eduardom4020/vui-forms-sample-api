/**
 *  @swagger
 *  components:
 *      schemas:
 *          LargeForm:
 *              title: LargeForm
 *              x-title-i18n:
 *                  eng: Large Form
 *                  por: Formulário Extenso
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
 *                  
 */
export class LargeForm {
    
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
        city
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
    }
}