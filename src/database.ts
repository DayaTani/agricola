import Database from './types/database'

/** The database of farmers used by the application to store and manage farmer information. */
const database: Database = {
  farmers: [
    { id: 10, name: 'Audrey Hepburn', idCardNumber: '0345678912', birthDate: '1929-05-04' },
    { id: 1, name: 'Buster Keaton', idCardNumber: '0123456789', birthDate: '1895-10-04' },
    { id: 13, name: 'Cary Grant', idCardNumber: '0234567890', birthDate: '1904-01-18' },
    { id: 5, name: 'Charlie Chaplin', idCardNumber: '0321098765', birthDate: '1889-04-16' },
    { id: 4, name: 'Clara Bow', idCardNumber: '0765432109', birthDate: '1905-07-29' },
    { id: 15, name: 'Clark Gable', idCardNumber: '0456789012', birthDate: '1901-02-01' },
    { id: 12, name: 'Elizabeth Taylor', idCardNumber: '0123456745', birthDate: '1932-02-27' },
    { id: 6, name: 'Greta Garbo', idCardNumber: '0234567891', birthDate: '1905-09-18' },
    { id: 11, name: 'Humphrey Bogart', idCardNumber: '0543210987', birthDate: '1899-12-25' },
    { id: 14, name: 'Ingrid Bergman', idCardNumber: '0345678901', birthDate: '1915-08-29' },
    { id: 9, name: 'James Dean', idCardNumber: '07654321048', birthDate: '1931-02-08' },
    { id: 2, name: 'Lillian Gish', idCardNumber: '9876543210', birthDate: '1893-10-14' },
    { id: 8, name: 'Marilyn Monroe', idCardNumber: '0987654321', birthDate: '1926-06-01' },
    { id: 7, name: 'Marlon Brando', idCardNumber: '0891234567', birthDate: '1924-04-03' },
    { id: 3, name: 'Rudolph Valentino', idCardNumber: '0456789123', birthDate: '1895-05-06' },
  ],
  nextFarmerId: 16,
}

export default database
