const DUPLICATE_EMAIL_ERROR_MATCH = '^SQLITE_CONSTRAINT: UNIQUE';

const DUPLICATE_EMAIL_ERROR_RESPONSE = 'Este email já está cadastrado. Por favor utilize outro.';

module.exports = {
    DUPLICATE_EMAIL_ERROR_MATCH,
    DUPLICATE_EMAIL_ERROR_RESPONSE
};