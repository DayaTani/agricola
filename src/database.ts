import Database from './types/database'

/** The database of farmers used by the application to store and manage farmer information. */
const database: Database = {
  farmers: [
    { id: 1, name: 'Buster Keaton', idCardNumber: '0123456789', birthDate: '1895-10-04' },
    { id: 5, name: 'Charlie Chaplin', idCardNumber: '0321098765', birthDate: '1889-04-16' },
    { id: 4, name: 'Clara Bow', idCardNumber: '0765432109', birthDate: '1905-07-29' },
    { id: 2, name: 'Lillian Gish', idCardNumber: '9876543210', birthDate: '1893-10-14' },
    { id: 3, name: 'Rudolph Valentino', idCardNumber: '0456789123', birthDate: '1895-05-06' },
  ],
  nextFarmerId: 6,
}

export default database
